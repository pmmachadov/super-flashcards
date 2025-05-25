// FlashcardForm component for creating and editing flashcards
import { useState } from "react";
import PropTypes from "prop-types";
import FlashcardController from "../controllers/FlashcardController";
import "../styles/FlashcardForm.css";

const FlashcardForm = ({ editMode = false, flashcard = null, onClose }) => {
  const [formData, setFormData] = useState({
    question: flashcard ? flashcard.question : "",
    answer: flashcard ? flashcard.answer : "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.question.trim()) {
      newErrors.question = "Question is required";
    }
    if (!formData.answer.trim()) {
      newErrors.answer = "Answer is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (editMode && flashcard) {
        FlashcardController.updateFlashcard(flashcard.id, formData);
      } else {
        FlashcardController.createFlashcard(formData);
      }
      onClose();
    }
  };

  return (
    <div className="flashcard-form-container">
      <h2>{editMode ? "Edit Flashcard" : "Create New Flashcard"}</h2>
      <form onSubmit={handleSubmit} className="flashcard-form">
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter the question"
            className={errors.question ? "error" : ""}
            rows={4}
          />
          {errors.question && (
            <div className="error-message">{errors.question}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="answer">Answer:</label>
          <textarea
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="Enter the answer"
            className={errors.answer ? "error" : ""}
            rows={6}
          />
          {errors.answer && (
            <div className="error-message">{errors.answer}</div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {editMode ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

FlashcardForm.propTypes = {
  editMode: PropTypes.bool,
  flashcard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default FlashcardForm;
