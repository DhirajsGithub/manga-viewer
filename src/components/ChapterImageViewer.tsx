import React, { useEffect, useState } from 'react';
import { fetchChapterDetails } from '../services/api';
import './ChapterImageViewer.css';
import { Chapter, Page } from '../utils/types';
import Seekbar from './Seekbar';

interface ChapterImageViewerProps {
  chapterId: number;
  chaptersLength: number;
  onChapterSelect: (chapterId: number) => void;
}

const ChapterImageViewer: React.FC<ChapterImageViewerProps> = ({ chapterId, chaptersLength, onChapterSelect }) => {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  useEffect(() => {
    const getChapterDetails = async () => {
      const data = await fetchChapterDetails(chapterId);
      setChapter(data);
      setCurrentPageIndex(0);  
    };
    getChapterDetails();
  }, [chapterId]);

  const goToNextPage = () => {
    if (chapter) {
      if (currentPageIndex < chapter.pages.length - 1) {
        setCurrentPageIndex(currentPageIndex + 1);
      } else if (chapterId < chaptersLength) {
        onChapterSelect(chapterId + 1);  
      }
    }
  };

  const goToPreviousPage = () => {
    if (chapter) {
      if (currentPageIndex > 0) {
        setCurrentPageIndex(currentPageIndex - 1);
      } else if (chapterId > 1) {
        onChapterSelect(chapterId - 1); 
      }
    }
  };

  const seekToSpecificPage = (pageNo: number) => {
    if (chapter) {
      const pageIndex = Math.min(Math.max(0, pageNo), chapter.pages.length - 1); 
      setCurrentPageIndex(pageIndex);
    }
  };

  const currentPage: Page | undefined = chapter?.pages[currentPageIndex];

  return (
    <div className="manga-viewer">
      <div className="screen-left" onClick={goToPreviousPage}></div>
      {currentPage && (
        <>
          <img src={currentPage.image.file} alt={`Page ${currentPage.page_index}`} />
          <div className="page-info">
            {currentPageIndex + 1} / {chapter?.pages.length}
            <Seekbar seekToSpecificPage={seekToSpecificPage} chaptersLength={chapter.pages.length} />
          </div>
        </>
      )}
      <div className="screen-right" onClick={goToNextPage}></div>
    </div>
  );
};

export default ChapterImageViewer;
