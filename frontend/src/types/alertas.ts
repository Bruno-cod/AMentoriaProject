export interface AlertItem {
  chatId: string | number;
  topic: string;
  studentEmail: string;
  iaResponse: string;
  studentFeedback?: string;
  date: string | Date;
}