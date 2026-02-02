"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QualificationModal from "./QualificationModal";

interface StartReadingButtonProps {
  firstPageId: string;
}

const StartReadingButton = ({ firstPageId }: StartReadingButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Check if user has already signed up
  const hasSignedUp = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('brand-attention-strategy-signed-up') === 'true';
  };

  const handleStartReading = () => {
    // If user has already signed up, redirect directly to book
    if (hasSignedUp()) {
      router.push(`/book/${firstPageId}`);
    } else {
      // Otherwise, show the qualification modal
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleStartReading}
        className="inline-block px-8 py-4 bg-thymine text-white rounded-lg hover:bg-thymine-light transition-colors font-medium text-button"
      >
        Start Reading
      </button>
      <QualificationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        redirectUrl={`/book/${firstPageId}`}
      />
    </>
  );
};

export default StartReadingButton;
