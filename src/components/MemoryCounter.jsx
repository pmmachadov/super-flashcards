import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FlashcardController from "../controllers/FlashcardController";

const MemoryCounter = ({ flashcardId }) => {
  const [remembered, setRemembered] = useState(0);
  const [notRemembered, setNotRemembered] = useState(0);
  const [isRemembered, setIsRemembered] = useState(false);

  useEffect(() => {
    const loadStats = () => {
      const subjectId = FlashcardController.getCurrentSubject();
      const storageKey = subjectId
        ? `card-stats-${subjectId}-${flashcardId}`
        : `card-stats-${flashcardId}`;

      const stats = JSON.parse(localStorage.getItem(storageKey)) || {
        remembered: 0,
        notRemembered: 0,
      };
      setRemembered(stats.remembered);
      setNotRemembered(stats.notRemembered);
      setIsRemembered(
        stats.remembered > stats.notRemembered && stats.remembered > 0
      );
    };

    loadStats();
  }, [flashcardId]);

  useEffect(() => {
    const subjectId = FlashcardController.getCurrentSubject();
    const storageKey = subjectId
      ? `card-stats-${subjectId}-${flashcardId}`
      : `card-stats-${flashcardId}`;

    const stats = { remembered, notRemembered };
    localStorage.setItem(storageKey, JSON.stringify(stats));
    setIsRemembered(remembered > notRemembered && remembered > 0);
  }, [remembered, notRemembered, flashcardId]);

  const handleRemembered = () => {
    setRemembered((prev) => prev + 1);
  };

  const handleNotRemembered = () => {
    setNotRemembered((prev) => prev + 1);
  };
  // Function to reset stats if needed in the future
  // const handleReset = () => {
  //   setRemembered(0);
  //   setNotRemembered(0);
  // };

  const handleDelete = () => {
    if (
      window.confirm("Are you sure you want to delete this remembered card?")
    ) {
      // Delete the card using the controller
      const cardId = parseInt(flashcardId);
      FlashcardController.deleteFlashcard(cardId);

      // Clear the card stats from localStorage
      const subjectId = FlashcardController.getCurrentSubject();
      const storageKey = subjectId
        ? `card-stats-${subjectId}-${flashcardId}`
        : `card-stats-${flashcardId}`;
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <div className="memory-counter">
      <div className="memory-stats">
        <div className="memory-stat">
          <span className="memory-label">Remembered:</span>
          <span className="memory-value">{remembered}</span>
        </div>
        <div className="memory-stat">
          <span className="memory-label">Not Remembered:</span>
          <span className="memory-value">{notRemembered}</span>
        </div>
        <div className="memory-total">
          <span className="memory-label">Total Attempts:</span>
          <span className="memory-value">{remembered + notRemembered}</span>
        </div>
      </div>{" "}
      <div className="memory-buttons">
        <button className="memory-button memory-yes" onClick={handleRemembered}>
          I Remember This
        </button>
        <button
          className="memory-button memory-no"
          onClick={handleNotRemembered}
        >
          Still Learning
        </button>
        {isRemembered && (
          <button
            className="memory-button memory-delete"
            onClick={handleDelete}
          >
            Delete Remembered Card
          </button>
        )}
      </div>
    </div>
  );
};

MemoryCounter.propTypes = {
  flashcardId: PropTypes.string.isRequired,
};

export default MemoryCounter;
