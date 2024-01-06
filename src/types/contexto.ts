import { Author } from './chat';

export interface Guess {
  guess: string;
  distance: number;
  author: Author;
}
