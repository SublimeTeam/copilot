const express = require("express");
const multer = require("multer");
const { Pinecone } = require("@pinecone-database/pinecone");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { HfInference } = require("@huggingface/inference");
const dotenv = require("dotenv");
const mammoth = require("mammoth");
const cors = require("cors"); // Import the cors package

dotenv.config();

const chats = [];

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors()); // Enable CORS for all routes
const upload = multer({ dest: "uploads/" });

// Initialize clients
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Get Pinecone index
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 1,
    maxOutputTokens: 5000,
  },
});

// Função para criar embeddings usando Hugging Face
async function createEmbedding(text) {
  try {
    const response = await hf.featureExtraction({
      model: "intfloat/multilingual-e5-large",
      inputs: text,
    });

    console.log("Raw response from Hugging Face:", response);

    let embedding;
    if (Array.isArray(response)) {
      embedding = response;
    } else if (typeof response === "object" && response !== null) {
      const values = Object.values(response)[0];
      if (Array.isArray(values)) {
        embedding = values;
      }
    }

    if (!embedding) {
      throw new Error("Invalid embedding format");
    }

    // Adjust the embedding dimension
    return embedding;
  } catch (error) {
    console.error("Error creating embedding:", error);
    throw error;
  }
}

// Endpoint para upload de arquivos
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("Request received:", req.body);
  console.log("File object:", req.file);

  if (!req.file) {
    console.error("No file uploaded :C");
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    console.log("File path:", req.file.path);
    const result = await mammoth.extractRawText({ path: req.file.path });

    const textContent = result.value;
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

    const messageEmbedding = await createEmbedding(message);

    console.log("messageEmbedding", messageEmbedding);

    const queryResponse = await index.query({
      vector: messageEmbedding,
      topK: 3,
      includeMetadata: true,
    });

    const fileContext = queryResponse.matches
      .map((match) => match.metadata.content)
      .join(" ");

    // adiciona a conversa ao array de conversas ou atualiza a existente
    let chat = chats.find((chat) => chat.chatId === chatId);

    if (chat) {
      chat.messages.push({ role: "user", content: message });
    } else {
      chat = { chatId, messages: [{ role: "user", content: message }] };
      chats.push(chat);
    }

    // Combine file context with chat history
    const chatHistory = chat.messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const combinedContext = `
      Answer the question or message in a natural and conversational manner. Use the provided context to inform your response when applicable, but feel free to engage in general conversation when the message is not a question or does not require specific context.
      You should always use INSTRUÇÃO DE TRABALHO (IT) as a base to answer questions related to work instructions providing as much information as possible, but for general conversation, respond appropriately.
      Always answer in the same language of the question. and avoid talking about random topics.

      Context: ${fileContext}
      
      Chat history: ${chatHistory}
      
      Question/Message: ${message}
      
      Answer in markdown format, using bold, italic, and other markdown formatting options when needed.Make sure to use a valid markdown formatting for the response. and substitute space scape for three spaces to create a new line.
      Answer:
    `;

    let result;
    if (chat.geminiChat) {
      result = await chat.geminiChat.generateContent(combinedContext);
    } else {
      result = await model.generateContent(combinedContext);
    }

    const response = await result.response;

    // adicione a resposta da IA ao array de mensagens do chat
    chat.messages.push({ role: "assistant", content: response.text() });
    res.json({ response: response.text(), chatId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function adjustEmbeddingDimension(embedding, targetDimension) {
  if (embedding.length === targetDimension) {
    return embedding;
  } else if (embedding.length < targetDimension) {
    // Pad with zeros
    return [
      ...embedding,
      ...new Array(targetDimension - embedding.length).fill(0),
    ];
  } else {
    throw new Error("Embedding is larger than the target dimension");
  }
}

// Endpoint para listar todas as conversas
app.get("/chats", (req, res) => {
  res.json(chats);
});

// Endpoint para criar uma nova conversa
app.post("/chats", (req, res) => {
  const newChat = { chatId: Date.now().toString(), messages: [] };
  chats.push(newChat);
  res.status(201).json(newChat);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
