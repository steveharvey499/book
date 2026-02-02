"use client";

interface ReadingProgressProps {
  progress: number;
}

const ReadingProgress = ({ progress }: ReadingProgressProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-small text-text-secondary">Reading Progress</span>
        <span className="text-small text-text-secondary">{progress}%</span>
      </div>
      <div className="w-full bg-bg-tertiary rounded-full h-2 overflow-hidden">
        <div
          className="bg-thymine h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ReadingProgress;
