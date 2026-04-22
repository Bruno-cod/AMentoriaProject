export const formatLongDate = (dateString: string) => {
  if (!dateString) return "Data indisponível";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long", 
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatShortDate = (dateString: string) => {
  if (!dateString) return "Sem interação";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString; 
  }

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};