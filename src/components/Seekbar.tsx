import React, { useEffect, useState, useRef } from "react";
import "./ChapterImageViewer.css";

interface SeekbarProps {
  chaptersLength: number;
  seekToSpecificPage: (pageNo: number) => void;
}

const Seekbar: React.FC<SeekbarProps> = ({ chaptersLength, seekToSpecificPage }) => {
  const [position, setPosition] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const seekbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosition(0);
  }, [chaptersLength]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (seekbarRef.current) {
      const rect = seekbarRef.current.getBoundingClientRect();
      setStartX(e.clientX - rect.left);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !seekbarRef.current) return;

    const rect = seekbarRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const newPosition = Math.round(percentage * (chaptersLength - 1));

    if (newPosition !== position) {
      setPosition(newPosition);
      seekToSpecificPage(newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  const handleSeekClick = (index: number) => {
    setPosition(index);
    seekToSpecificPage(index);
  };

  return (
    <div className="seekbar-container" ref={seekbarRef}>
      <div className="seekbar-points">
        {Array.from({ length: chaptersLength }, (_, i) => (
          <div
            key={i}
            className={`seekbar-point ${position === i ? "active" : ""}`}
            style={{ left: `${(i / (chaptersLength - 1)) * 100}%` }}
            onClick={() => handleSeekClick(i)}
          />
        ))}
      </div>
      <div
        className="draggable-div"
        style={{ 
          left: `${(position / (chaptersLength - 1)) * 100}%`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default Seekbar;