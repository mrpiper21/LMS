import { useRef } from "react";
import { FileText, File, Loader2, AlertCircle } from "lucide-react";
import { getFileIcon, formatFileSize, getAcceptedFileTypes } from "../../utils/fileUtils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileProcess: (content: string) => Promise<void>;
  onError: (error: string) => void;
  isProcessing?: boolean;
  error?: string | null;
  uploadedFile?: File | null;
}

export const FileUpload = ({ 
  onFileSelect, 
  onFileProcess, 
  onError,
  isProcessing = false, 
  error = null, 
  uploadedFile = null 
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    onFileSelect(file);

    try {
      let content: string;

      // if (file.type === "application/pdf") {
      //   onError("PDF files are not supported for plagiarism checking. Please convert your PDF to text format using online converters or copy the text content into a .txt file.");
      //   return;
      // } else if (
      //   file.type === "application/msword" ||
      //   file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      // ) {
      //   onError("Word documents are not supported for plagiarism checking. Please save your document as a .txt file or copy the text content into a text file.");
      //   return;
      // } else {
      //   // For text files
      //   content = await new Promise<string>((resolve, reject) => {
      //     const reader = new FileReader();
      //     reader.onload = (e) => {
      //       const text = e.target?.result as string;
      //       if (text) {
      //         resolve(text);
      //       } else {
      //         reject(new Error("Failed to read file content"));
      //       }
      //     };
      //     reader.onerror = () => reject(new Error("Failed to read file"));
      //     reader.readAsText(file);
      //   });
      // }

      if (file) {
        console.log("file format ------- ", file)
        await onFileProcess(file as any);
      }
    } catch (error) {
      console.error("File processing failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to process file";
      onError(errorMessage);
    }
  };

  const renderFileIcon = (file: File) => {
    const iconType = getFileIcon(file);
    switch (iconType) {
      case 'pdf':
        return <FileText size={16} className="text-red-500" />;
      case 'docx':
        return <FileText size={16} className="text-blue-500" />;
      case 'txt':
        return <FileText size={16} className="text-green-500" />;
      default:
        return <File size={16} className="text-gray-500" />;
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">File:</span>
        {uploadedFile ? (
          <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded border">
            {renderFileIcon(uploadedFile)}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {uploadedFile.name}
              </span>
              <span className="text-xs text-gray-500">
                {formatFileSize(uploadedFile.size)}
              </span>
              {error && (
                <span className="text-xs text-red-500 mt-1">{error}</span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept={getAcceptedFileTypes()}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        )}
      </div>
      
      {/* File type information */}
      <div className="mt-2 text-xs text-gray-500">
        <p>Supported formats: .txt, .text (PDF and Word documents need to be converted to text format)</p>
      </div>
      
      <div className="flex items-center space-x-2 mt-1">
        <span className="text-gray-600">+</span>
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <Loader2 size={16} className="animate-spin text-blue-600" />
            <span className="text-sm text-blue-600">
              Checking for plagiarism...
            </span>
          </div>
        ) : error ? (
          <div className="flex items-center space-x-2">
            <AlertCircle size={16} className="text-red-500" />
            <span className="text-sm text-red-600">{error}</span>
          </div>
        ) : (
          <span className="text-sm text-gray-500">Not checked</span>
        )}
      </div>
    </div>
  );
}; 