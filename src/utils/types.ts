export interface Page {
    id: number;
    page_index: number;
    image: {
      id: number;
      file: string;
      width: number;
      height: number;
      created_at: string;
      updated_at: string;
    };
  }
  
  export interface Book {
    id: number;
    title: string;
    chapter_ids: number[];
  }
  
  export interface Chapter {
    id: number;
    title: string;
    book: Book;
    chapter_index: number;
    pages: Page[];
  }
  