import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBooks } from "../services/api";
import { Book } from "../utils/types";
import "../App.css";
import BookLibraryNav from "../components/BookLibraryNav";
import ChaptersNav from "../components/ChaptersNav";
import ChapterImageViewer from "../components/ChapterImageViewer";

interface Params {
  bookId: string;
}

const Home: React.FC = () => {
  const { bookId } = useParams<Params>();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(
    null
  );
  const [loadingBooks, setLoadingBooks] = useState<boolean>(true);
  const [loadingChapter, setLoadingChapter] = useState<boolean>(false);

  useEffect(() => {
    const loadBooks = async () => {
      setLoadingBooks(true);
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoadingBooks(false);
      }
    };

    loadBooks();
  }, []);

  const handleChapterSelect = async (chapterId: number) => {
    setLoadingChapter(true);
    try {
      setSelectedChapterId(chapterId);
    } catch (error) {
      console.error("Failed to fetch chapter:", error);
    } finally {
      setLoadingChapter(false);
    }
  };

  useEffect(() => {
    const fetchFirstChapter = async () => {
      if (books.length > 0) {
        const firstChapterId =
          books[parseInt(bookId ?? "1") - 1].chapter_ids[0];
        setSelectedChapterId(firstChapterId);
        await handleChapterSelect(firstChapterId); // Load the first chapter
      }
    };
    fetchFirstChapter();
  }, [bookId, books]);

  return (
    <div className="home">
      {loadingBooks ? (
        <div className="loading-text">Loading Books...</div>
      ) : (
        <BookLibraryNav books={books} currentBookId={parseInt(bookId ?? "0")} />
      )}

     {!loadingChapter  && <ChaptersNav
        bookId={parseInt(bookId ?? "0")}
        selectedChapterId={selectedChapterId ?? 0}
        onChapterSelect={handleChapterSelect}
      />}

      {loadingChapter ? (
        <div style={{width: "100%", textAlign: "center"}}>Loading Chapter...</div>
      ) : (
        !loadingChapter &&
        !loadingBooks &&
        selectedChapterId && (
          <ChapterImageViewer
            onChapterSelect={handleChapterSelect}
            chaptersLength={
              books[parseInt(bookId ?? "1") - 1].chapter_ids[
                books[parseInt(bookId ?? "1") - 1].chapter_ids.length - 1
              ]
            }
            chapterId={selectedChapterId}
          />
        )
      )}
    </div>
  );
};

export default Home;
