import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getAllTags, getCardsByTag, getTagStats } from "../components/StatsUtils";
import FlashcardController from "../controllers/FlashcardController";
import "../styles/TagFilter.css";

const TagFilter = ({ onFilterChange }) => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagStats, setTagStats] = useState([]);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = () => {
    const flashcards = FlashcardController.getFlashcards();
    const availableTags = getAllTags(flashcards);
    const subjectId = FlashcardController.getCurrentSubject();
    const stats = getTagStats(flashcards, subjectId);

    setTags(availableTags);
    setTagStats(stats);
  };

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      // Deseleccionar
      setSelectedTag(null);
      onFilterChange(null);
    } else {
      // Seleccionar nuevo tag
      setSelectedTag(tag);
      const flashcards = FlashcardController.getFlashcards();
      const filtered = getCardsByTag(flashcards, tag);
      onFilterChange(filtered);
    }
  };

  const getTagStat = (tag) => {
    return tagStats.find((s) => s.tag === tag);
  };

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="tag-filter">
      <h3>📌 Filtrar por Unidad Formativa / Tema</h3>
      <div className="tag-list">
        <button
          className={`tag-button ${selectedTag === null ? "active" : ""}`}
          onClick={() => {
            setSelectedTag(null);
            onFilterChange(null);
          }}
        >
          Todas
        </button>
        {tags.map((tag) => {
          const stat = getTagStat(tag);
          return (
            <button
              key={tag}
              className={`tag-button ${selectedTag === tag ? "active" : ""}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
              {stat && (
                <span className="tag-badge">
                  {stat.remembered}/{stat.total}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {selectedTag && (
        <div className="tag-info">
          Mostrando flashcards de: <strong>{selectedTag}</strong>
        </div>
      )}
    </div>
  );
};

TagFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default TagFilter;
