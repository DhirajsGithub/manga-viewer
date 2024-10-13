import React, { useEffect, useState } from 'react';
import { fetchBookDetails } from '../services/api';
import './ChaptersNav.css';
import { Book } from '../utils/types';

interface ChaptersNavProps {
  bookId: number;
  selectedChapterId: number;  // Added this to keep track of the selected chapter
  onChapterSelect: (chapterId: number) => void;
}

const ChaptersNav: React.FC<ChaptersNavProps> = ({ bookId, selectedChapterId, onChapterSelect }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBookDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchBookDetails(bookId);
        setBook(data);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
      }
      setLoading(false);
    };
    loadBookDetails();
  }, [bookId]);

  if (loading) {
    return <div>Loading Chapters...</div>;
  }

  return (
    <div className="chapter-list">
      {book?.chapter_ids.map((chapterId, index) => (
        <button
          key={chapterId}
          className={chapterId === selectedChapterId ? 'active' : ''}  // Highlight selected chapter
          onClick={() => onChapterSelect(chapterId)}
        >
          Chapter {index + 1}
        </button>
      ))}
    </div>
  );
};

export default ChaptersNav;
