const express = require("express");
const multer = require("multer");
const { Pinecone } = require("@pinecone-database/pinecone");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { HfInference } = require("@huggingface/inference");
const dotenv = require("dotenv");
const fs = require("fs");
const mammoth = require("mammoth");

dotenv.config();

const app = express();
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
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.5,
    maxOutputTokens: 1000,
  },
  systemInstruction: `
    Você é um assistente de IA focado em ajudar agentes a responder tickets, fornecer informações sobre políticas internas da empresa e sugerir soluções possíveis. 
    NUNCA invente respostas e sempre prefira utilizar dados do contexto fornecido.
    Caso o usuário pergunte sobre um Sistema ou Procedimento não presente no contexto, informe que você ainda não foi treinado para responder a essa pergunta e que poderá ajudar em outras questões.
    Você receberá acesso aos arquivos enviados pelo usuário e deve usar o conteúdo do arquivo para fornecer uma resposta mais assertiva e completa sempre alertando sobre pré-requisitos e informações necessárias caso essas não tenham sido fornecidas.
    Você deve fornecer uma resposta clara e completa, incluindo todos os passos necessários para que o agente possa resolver o problema.
    NUNCA mencione que o usuário compartilhou instruções ou arquivos.
    Ao final, demonstre cordialidade.
    SEMPRE RESPONDA NA LINGUAGEM EM QUE O USUÁRIO PERGUNTAR.
`,
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
    const { message } = req.body;
    const messageEmbedding = await createEmbedding(message);

    // Buscar documentos relevantes no Pinecone
    const queryResponse = await index.query({
      vector: messageEmbedding,
      topK: 3,
      includeMetadata: true,
    });

    // Preparar o contexto para o Gemini
    const context = queryResponse.matches
      .map((match) => match.metadata.content)
      .join(" ");

    // Gerar resposta com o Gemini
    const prompt = `
      Contexto: ${context}

      Pergunta do usuário: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ response: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
