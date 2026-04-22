import { create } from 'zustand';

interface ChatStore {
  initialMessage: string;
  initialImage: string | null;
  setInitialMessage: (msg: string) => void;
  setInitialImage: (base64: string | null) => void;
  clearInitialData: () => void; 
}

export const useChatStore = create<ChatStore>((set) => ({
  initialMessage: '',
  initialImage: null,
  setInitialMessage: (msg) => set({ initialMessage: msg }),
  setInitialImage: (base64) => set({ initialImage: base64 }),
  // Implementação que limpa texto e imagem
  clearInitialData: () => set({ initialMessage: '', initialImage: null }),
}));

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};