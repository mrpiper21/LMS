// File utility functions
export const getFileIcon = (file: File) => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return 'pdf';
    case 'doc':
    case 'docx':
      return 'docx';
    case 'txt':
    case 'text':
      return 'txt';
    default:
      return 'file';
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileType = (file: File): string => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return 'PDF Document';
    case 'doc':
      return 'Word Document';
    case 'docx':
      return 'Word Document';
    case 'txt':
    case 'text':
      return 'Text File';
    default:
      return 'Unknown File';
  }
};

export const isValidFileType = (file: File): boolean => {
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  return validTypes.includes(file.type);
};

export const getAcceptedFileTypes = (): string => {
  return '.pdf,.doc,.docx,.txt,.text';
}; 