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
const { defaultChats } = require("./data");

// TODO: persistir chats em banco de dados
const chats = defaultChats;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
dotenv.config();

const upload = multer({ dest: "uploads/" });

const optimizeMessage = (message) => {
  return message
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

const chatAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const chatAIModel = chatAi.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 1,
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
        Use the same language from the chat history.
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
      Answer the question or message in a natural and conversational manner. Use the provided context to inform your response when applicable, but feel free to engage in general conversation when the message is not a question or does not require specific context.
      You should always use the Context information as a base to answer questions related to work instructions providing as much information as possible, but for general conversation, respond appropriately.
      Use the same language of the question. and avoid talking about random topics.
      Never ask the user to contact the support because he is a support agent.

      Context: ${fileContext}
      
      Chat history: ${chatHistory}
      
      Question/Message: ${optimizedMessage}
      
      Answer in markdown format, using markdown formatting options to make the response more readable. NEVER use html tags such as code, pre, etc. And substitute space scape for three spaces to create a new line. 
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
      Predict up to 4 relevant questions that the user may ask you by reading the context and chat history.
      Only include questions relevant to the chat history and context.
      If you can't generate any suggestions, return an empty string. Keep it concise, no long sentences, use plain text. 
      All suggestions should start with the first word capitalized.
      Never include questions that was already asked or answered in the chat history.

      Context: ${fileContext}

      Chat history: ${chatHistoryWithResponse}

      Answer should match the chat history language and be comma-separated like this: "Question 1, Question 2, Question 3, Question 4"
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

// endpoint to pin a chat
app.patch("/chats/:chatId/pin", (req, res) => {
  const { chatId } = req.params;
  const chatIndex = chats.findIndex((chat) => chat.chatId === chatId);

  if (chatIndex !== -1) {
    chats[chatIndex].pinned = true;
    res.json({ message: "Conversa marcada como fixada com sucesso" });
  } else {
    res.status(404).json({ message: "Conversa não encontrada" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
