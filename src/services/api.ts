import axios from 'axios';
import { Book, Chapter } from '../utils/types';
import { API_BASE_URL } from '../utils/constants';


// list of books
export const fetchBooks = async (): Promise<Book[]> => {
    const response = await axios.get<Book[]>(`${API_BASE_URL}books/`);
    return response.data;
  };

//details of a specific book
export const fetchBookDetails = async (bookId: number): Promise<Book> => {
    const response = await axios.get<Book>(`${API_BASE_URL}books/${bookId}/`);
    return response.data;
  };

// details of a specific chapter
export const fetchChapterDetails = async (chapterId: number): Promise<Chapter> => {
    const response = await axios.get<Chapter>(`${API_BASE_URL}chapters/${chapterId}/`);
    return response.data;
  };
