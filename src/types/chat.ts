export interface Author {
  name: string;
  color: string;
}

export interface ChatMessage {
  author: Author;
  message: string;
}
