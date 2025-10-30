import { useState, useEffect } from "react";
import FlashcardController from "../controllers/FlashcardController";
import Flashcard from "./Flashcard";
import MemoryCounter from "../components/MemoryCounter";
import "../styles/FlashcardList.css";
import "../styles/MemoryCounter.css";

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadFlashcards = () => {
      const cards = FlashcardController.getFlashcards();
      setFlashcards(cards);
    };

    loadFlashcards();

    FlashcardController.addChangeListener(loadFlashcards);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < flashcards.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentIndex(randomIndex);
  };

  if (flashcards.length === 0) {
    return (
      <div className="flashcard-list-container">
        <div className="flashcard-loading">
          No hay flashcards disponibles.
        </div>
      </div>
    );
  }
  return (
    <div className="flashcard-list-container">
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${((currentIndex + 1) / flashcards.length) * 100}%`,
          }}
        ></div>
      </div>
      <div className="counter">
        {currentIndex + 1} / {flashcards.length}
      </div>
      <div className="card-and-counter-wrapper">
        <div className="flashcard-container">
          <button
            className="nav-button-prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous card"
          >
            &#10094;
          </button>

          <Flashcard flashcard={flashcards[currentIndex]} />

          <button
            className="nav-button-next"
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            aria-label="Next card"
          >
            &#10095;
          </button>
        </div>

        <div className="memory-counter-container">
          <MemoryCounter flashcardId={flashcards[currentIndex].id.toString()} />
        </div>
      </div>
      <div className="button-group">
        <button className="random-button" onClick={handleRandom}>
          Random Card
        </button>
      </div>
    </div>
  );
};

export default FlashcardList;
