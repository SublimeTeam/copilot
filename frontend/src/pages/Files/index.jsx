import { Button } from "@/components/Button/index";
import { useEffect, useRef, useState } from "react";
import { Upload, File, AlertCircle, CheckCircle2, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const Files = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/files")
      .then((response) => response.json())
      .then((data) => setFiles(data));
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = file.name.split(".").pop()?.toLowerCase();
    if (fileType !== "csv" && fileType !== "docx") {
      setError("Apenas arquivos CSV e DOCX são permitidos.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError("");
    setSuccess("");

    try {
      // Implement upload logic for file localhost:3000/upload with percentage
      const formData = new FormData();
      formData.append("file", file, file.name);

      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const reader = response.body.getReader();
      const contentLength = +response.headers.get("Content-Length");
      let receivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        receivedLength += value.length;
        const percentage = Math.round((receivedLength / contentLength) * 100);
        setUploadProgress(percentage);
      }

      setSuccess("Arquivo enviado com sucesso");
      // fetch files from backend endpoint /files from localhost:3000
      fetch("http://localhost:3000/files")
        .then((response) => response.json())
        .then((data) => setFiles(data));
    } catch (err) {
      console.error("Erro ao enviar o arquivo:", err);
      setError("Ocorreu um erro ao enviar o arquivo.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4 flex-1">
      <h1 className="text-2xl font-bold mb-4">Base de conhecimento</h1>

      {uploading && (
        <div className="mb-4">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-sm text-gray-500 mt-2">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="mb-4">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Sucesso</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4">
        <input
          type="file"
          accept=".csv,.docx"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          disabled={uploading}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="mr-2 h-4 w-4" /> Enviar arquivo
        </Button>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 w-[65ch]">
        <h2 className="text-xl font-semibold mb-2">Arquivos enviados</h2>
        <div className="mb-4 relative">
          <Input
            type="text"
            placeholder="Pesquisar arquivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <ul className="space-y-2 list-none m-0 p-0 overflow-auto">
          {filteredFiles.map((file, index) => (
            <li key={index} className="list-none m-0 p-0">
              <a
                className="flex items-center space-x-2"
                href={`http://localhost:3000/files/${file.name}`}
                download
              >
                <File className="h-4 w-4" />
                <span>{file.name}</span>
                <span className="text-sm text-gray-500">
                  ({formatFileSize(file.size)})
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
