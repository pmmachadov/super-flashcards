import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MemoryCounter = ({ flashcardId }) => {
  const [remembered, setRemembered] = useState(0);
  const [notRemembered, setNotRemembered] = useState(0);

  useEffect(() => {
    const loadStats = () => {
      const stats = JSON.parse(
        localStorage.getItem(`card-stats-${flashcardId}`)
      ) || {
        remembered: 0,
        notRemembered: 0,
      };
      setRemembered(stats.remembered);
      setNotRemembered(stats.notRemembered);
    };

    loadStats();
  }, [flashcardId]);

  useEffect(() => {
    const stats = { remembered, notRemembered };
    localStorage.setItem(`card-stats-${flashcardId}`, JSON.stringify(stats));
  }, [remembered, notRemembered, flashcardId]);

  const handleRemembered = () => {
    setRemembered((prev) => prev + 1);
  };

  const handleNotRemembered = () => {
    setNotRemembered((prev) => prev + 1);
  };

  const handleReset = () => {
    setRemembered(0);
    setNotRemembered(0);
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
      </div>
    </div>
  );
};

MemoryCounter.propTypes = {
  flashcardId: PropTypes.string.isRequired,
};

export default MemoryCounter;
