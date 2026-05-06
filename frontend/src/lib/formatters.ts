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

export const parseDateBrToTime = (dateString: string): number => {
  if (!dateString) return 0;
  
  if (dateString.includes('-')) {
    const time = new Date(dateString).getTime();
    return isNaN(time) ? 0 : time;
  }

  const partes = dateString.split(/[\/\s:]+/); 
  
  if (partes.length >= 3) {
    const dia = Number(partes[0]);
    const mes = Number(partes[1]) - 1; 
    const ano = Number(partes[2]);
    return new Date(ano, mes, dia).getTime();
  }

  return 0; 
};