import React from 'react';
import { Link } from 'react-router-dom';
import './BookLibraryNav.css';
import { Book } from '../utils/types';

interface BookLibraryNavProps {
  books: Book[];
  currentBookId: number;
}

const BookLibraryNav: React.FC<BookLibraryNavProps> = ({ books, currentBookId }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <Link key={book.id} to={`/books/${book.id}`}>
          <button className={book.id === currentBookId ? 'active' : ''}>{book.title}</button>
        </Link>
      ))}
    </div>
  );
};

export default BookLibraryNav;
