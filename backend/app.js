const express = require("express");
const multer = require("multer");
const { Pinecone } = require("@pinecone-database/pinecone");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { HfInference } = require("@huggingface/inference");
const dotenv = require("dotenv");
const mammoth = require("mammoth");
const cors = require("cors"); // Import the cors package
const csv = require("csv-parser"); // Add this line to import the csv-parser package
const fs = require("fs"); // Add this line to handle file system operations
const { defaultChats, tickets } = require("./data");

// TODO: persistir chats em banco de dados
const chats = defaultChats;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
dotenv.config();

const optimizeMessage = (message) => {
  return message.normalize("NFD").toLowerCase().trim();
};

const chatAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const chatAIModel = chatAi.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.5,
    maxOutputTokens: 5000,
  },
});

const flashAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const flashAIModel = flashAi.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 1,
    maxOutputTokens: 2000,
  },
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
// Get Pinecone index
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Função para criar embeddings usando Hugging Face
async function createEmbedding(text) {
  const prompt = `
    You are an assistant tasked with summarizing tables, text or JSON for retrieval.
    These summaries will be embedded and used for retrieve the raw text or table elements.
    Give a concise summary of the table or text that is well optimized for retrieval.
    Use the same language as the text.
    Table, text or JSON: ${text}
  `;

  const result = await flashAIModel.generateContent(prompt);
  const optimizedInput = result.response.text();

  try {
    const response = await hf.featureExtraction({
      model: "intfloat/multilingual-e5-large",
      inputs: optimizedInput,
    });

    console.log("Raw response from Hugging Face:", response);

    // let embedding;
    // if (Array.isArray(response)) {
    //   embedding = response;
    // } else if (typeof response === "object" && response !== null) {
    //   const values = Object.values(response)[0];
    //   if (Array.isArray(values)) {
    //     embedding = values;
    //   }
    // }

    if (!response) {
      throw new Error("Invalid embedding format");
    }

    // Adjust the embedding dimension
    return response;
  } catch (error) {
    console.error("Error creating embedding:", error);
    throw error;
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Ensure the file name is in UTF-8
    const utf8FileName = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );

    cb(null, utf8FileName);
  },
});

const upload = multer({ storage: storage });

// Endpoint para upload de arquivos
// add support for csv files
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("Request received:", req.body);
  console.log("File object:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    console.log("File path:", req.file.path);
    // Check if the file is a docx or a csv
    const fileExtension = req.file.originalname.split(".").pop();
    let textContent;
    if (fileExtension === "docx") {
      const result = await mammoth.extractRawText({ path: req.file.path });
      textContent = result.value;
    } else if (fileExtension === "csv") {
      textContent = await new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(req.file.path)
          .pipe(csv())
          .on("data", (data) => results.push(data))
          .on("end", () => {
            resolve(JSON.stringify(results)); // Convert CSV rows to JSON string
          })
          .on("error", (error) => reject(error));
      });

      console.log("CSV content:", textContent);
    }

    console.log("Extracted text content length:", textContent.length);

    const embedding = await createEmbedding(textContent);
    console.log("Embedding created, length:", embedding.length);

    if (!Array.isArray(embedding) || embedding.length === 0) {
      throw new Error("Invalid embedding generated");
    }

    const upserts = [
      {
        id: `${Date.now()}`,
        values: embedding,
        metadata: { content: textContent },
      },
    ];

    await index.upsert(upserts);
    console.log("Vector upserted to Pinecone");

    res.json({ message: "Arquivo processado e salvo com sucesso" });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para enviar mensagens
app.post("/message", express.json(), async (req, res) => {
  try {
    let { chatId, message } = req.body;

    if (!chatId) {
      chatId = Date.now().toString(); // Create a new chat ID if not provided
    }

    // remove all accents from the message. convert to lowercase. optimize for search.
    let optimizedMessage = optimizeMessage(message);

    const messageEmbedding = await createEmbedding(optimizedMessage);

    const queryResponse = await index.query({
      vector: messageEmbedding,
      topK: 1,
      includeMetadata: true,
    });

    const fileContext = queryResponse.matches
      .map((match) => match.metadata.content)
      .join(" ");

    let chat = chats.find((chat) => chat.chatId === chatId);

    if (chat) {
      chat.messages.push({ role: "user", content: message });
    } else {
      const prompt = `
        Create a title for the chat based on the user message provided.
        Answer in plain text without any markdown formatting or symbols.
        Use the same language as the user message.
        User message: ${optimizedMessage}
      `;

      const result = await flashAIModel.generateContent(prompt);
      const title = result.response.text().trim().replaceAll("\n", "");

      chat = {
        chatId,
        title,
        messages: [{ role: "user", content: message }],
      };
      chats.push(chat);
    }

    // Combine file context with chat history
    const chatHistory = chat.messages
      .map((msg) => `${msg.role}: ${optimizeMessage(msg.content)}`)
      .join("\n");

    const combinedContext = `
      You are an assistant that answers questions about work instructions for support agents.
      Answer the question or message in a natural and conversational manner. Use the provided context to inform your response when applicable, but feel free to engage in general conversation when the message is not a question or does not require specific context.
      You should always use the Context information as a base to answer questions related to work instructions providing as much information as possible, but for general conversation, respond appropriately.
      Use the same language of the question. and avoid talking about random topics.
      Never ask the user to contact the support because he is a support agent.
      If the user asks for a file, you may provide the link to download it formatted as a markdown link, they are located in the /chat/files url.

      Context: ${fileContext}
      
      Chat_history: ${chatHistory}
      
      Question/Message: ${optimizedMessage}
      
      Answer in markdown format, use markdown formatting options to make the response more readable.
      Answer:
    `;

    let result;
    if (chat.geminiChat) {
      result = await chat.geminiChat.generateContent(combinedContext);
    } else {
      result = await chatAIModel.generateContent(combinedContext);
    }

    const response = await result.response;
    // adicione a resposta da IA ao array de mensagens do chat
    chat.messages.push({ role: "assistant", content: response.text() });

    const chatHistoryWithResponse = `${chatHistory}\n${response.text()}`;

    const suggestionContext = `
      ALWAYS use the last user message language to communicate.
      Analyze the context and chat history to suggest up to 4 topics the user may want to ask about.
      Suggestions must be strictly based on the information available in the context and chat history.
      Do not include questions that have already been asked or answered.
      If there are no relevant or new topics, return an empty string.
      Be concise and use plain text, without long sentences. All suggestions should start with a capital letter and be comma-separated.
      Avoid hypothetical or speculative questions. Only suggest topics you can answer based on the context.

      Context: ${fileContext}

      Chat_history: ${chatHistoryWithResponse}

       Answer in comma-separated format like this: "Topico 1, Topico 2, Topico 3, Topico 4".
      Answer:
    `;

    try {
      const result = await flashAIModel.generateContent(suggestionContext);
      const suggestion = result.response.text();

      let suggestions = suggestion.replaceAll("\n", "").trim().split(", ");
      console.log("suggestion", suggestion);
      res.json({
        response: response.text(),
        chatId,
        title: chat.title,
        suggestions,
      });
    } catch (error) {
      console.error("error", error);
      res.json({
        response: response.text(),
        chatId,
        title: chat.title,
        suggestions: [],
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para listar todas as conversas
app.get("/chats", (req, res) => {
  res.json(chats);
});

// endpoint to soft delete a chat
app.delete("/chats/:chatId", (req, res) => {
  const { chatId } = req.params;
  const chatIndex = chats.findIndex((chat) => chat.chatId === chatId);

  if (chatIndex !== -1) {
    chats[chatIndex].deleted_at = new Date().toISOString();
    res.json({ message: "Conversa marcada como deletada com sucesso" });
  } else {
    res.status(404).json({ message: "Conversa não encontrada" });
  }
});

// endpoint to pin a chat add the ability to unpin
app.patch("/chats/:chatId/pin", (req, res) => {
  const { chatId } = req.params;
  const { pinned } = req.body;
  const chatIndex = chats.findIndex((chat) => chat.chatId === chatId);

  if (chatIndex !== -1) {
    chats[chatIndex].pinned = pinned;
    const message = pinned
      ? "Conversa marcada como fixada com sucesso"
      : "Conversa desmarcada como fixada com sucesso";
    res.json({ message });
  } else {
    res.status(404).json({ message: "Conversa não encontrada" });
  }
});

// endpoint to get all files in the uploads folder
app.get("/files", (req, res) => {
  fs.readdir("uploads/", (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error reading directory" });
    }

    const fileDetails = files.map((file) => {
      const stats = fs.statSync(`uploads/${file}`);
      return {
        name: file,
        size: stats.size,
      };
    });

    res.json(fileDetails);
  });
});

app.get("/tickets", (req, res) => {
  const priorityOrder = {
    "1 - Alto": 1,
    "2 - Médio": 2,
    "3 - Baixo": 3,
    "4 - Planejamento": 4,
  };

  // Aberto, Atribuido, Em Andamento, Em espera, Resolvido, Fechado

  const sortedTickets = tickets.sort((a, b) => {
    // First, sort by status (Aberto tickets first)
    if (a.status === "Em Andamento" && b.status !== "Em Andamento") return -1;
    if (a.status !== "Em Andamento" && b.status === "Em Andamento") return 1;

    // If both tickets have the same status, sort by priority
    if (a.status === b.status) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    // If statuses are different (and not "Aberto"), maintain their original order
    // if statuses are different, check if one is "Aberto" and the other is not
    if (a.status === "Aberto" && b.status !== "Aberto") return -1;
    if (a.status !== "Aberto" && b.status === "Aberto") return 1;

    return 0;
  });

  res.json(sortedTickets);
});

// endpoint to download a file from the uploads folder
app.get("/files/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = `uploads/${filename}`;

  // Set the correct headers for file download
  res.setHeader(
    "Content-Disposition",
    `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`
  );
  res.download(filePath);
});

// endpoint para abrir um chat usando o ticketId como chatId
app.post("/chat", express.json(), async (req, res) => {
  console.log("Request received:", req.body);
  const { ticketId } = req.body;
  const chatFound = chats.find((chat) => chat.chatId === ticketId);

  if (chatFound) {
    res.json(chatFound);
  }

  try {
    // get ticket by id
    const ticket = tickets.find((ticket) => ticket.id === ticketId);

    const ticketEmbedding = await createEmbedding(ticket.description);

    const queryResponse = await index.query({
      vector: ticketEmbedding,
      topK: 4,
      includeMetadata: true,
    });

    const fileContext = queryResponse.matches
      .map((match) => match.metadata.content)
      .join(" ");

    const chat = {
      chatId: ticketId,
      title: ticket.id,
      messages: [],
    };
    chats.push(chat);

    console.log("chat 1", chat);

    // Combine file context with chat history
    const chatHistory = chat.messages
      .map((msg) => `${msg?.role}: ${msg?.content}`)
      .join("\n");

    // concatenate ticket data using its properties and values
    const ticketData = Object.entries(ticket)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const combinedContext = `
      You are an assistant that answers questions about work instructions for support agents.
      Answer the question or message in a natural and conversational manner. Use the provided context to inform your response when applicable, but feel free to engage in general conversation when the message is not a question or does not require specific context.
      You should always use the Context information as a base to answer questions related to work instructions providing as much information as possible, but for general conversation, respond appropriately.
      Use the same language of the question. and avoid talking about random topics.
      Never ask the user to contact the support because he is a support agent.

      Context: ${fileContext}
      
      Ticket data: ${ticketData}
      
      Question/Message: Utilizando essas informações, quais sao as possiveis soluções para este ticket? Forneça uma Instrução de trabalho caso disponível.
      
      Answer in markdown format, use markdown formatting options to make the response more readable.
      Answer:
    `;

    let result;
    if (chat.geminiChat) {
      result = await chat.geminiChat.generateContent(combinedContext);
    } else {
      result = await chatAIModel.generateContent(combinedContext);
    }

    const response = await result.response;
    // adicione a resposta da IA ao array de mensagens do chat
    chat.messages.push({ role: "assistant", content: response.text() });

    const chatHistoryWithResponse = `${chatHistory}\n${response.text()}`;

    const suggestionContext = `
      ALWAYS use the last message language to communicate.
      Analyze the context and chat history to suggest up to 4 topics the user may want to ask about.
      Suggestions must be strictly based on the information available in the context and chat history.
      Do not include questions that have already been asked or answered.
      If there are no relevant or new topics, return an empty string.
      Be concise and use plain text, without long sentences. All suggestions should start with a capital letter and be comma-separated.
      Avoid hypothetical or speculative questions. Only suggest topics you can answer based on the context.

      Context: ${fileContext}

      Chat_history: ${chatHistoryWithResponse}

       Answer in comma-separated format like this: "Topic 1, Topic 2, Topic 3, Topic 4".
      Answer:
    `;

    try {
      const result = await flashAIModel.generateContent(suggestionContext);
      const suggestion = result.response.text();

      let suggestions = suggestion.replaceAll("\n", "").trim().split(", ");
      console.log("suggestion", suggestion);

      chat.messages.push({ role: "assistant", content: response.text() });

      res.json({
        response: response.text(),
        chatId: ticketId,
        title: ticket.id,
        suggestions,
      });
    } catch (error) {
      console.error("error", error);
      res.json({
        response: response.text(),
        chatId: ticketId,
        title: ticket.id,
        suggestions: [],
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// endpoint to get a ticket by id
app.get("/tickets/:ticketId", (req, res) => {
  const { ticketId } = req.params;
  const ticket = tickets.find((ticket) => ticket.id === ticketId);
  res.json(ticket);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
