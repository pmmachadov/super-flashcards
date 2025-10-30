import { useState, useEffect } from "react";
import FlashcardController from "../controllers/FlashcardController";
import FlashcardForm from "./FlashcardForm";
import {
  resetAllCardStats,
  getRememberedCards,
} from "../components/StatsUtils";
import "../styles/FlashcardManager.css";
import "../styles/Modal.css";

const FlashcardManager = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [rememberedCards, setRememberedCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const loadFlashcards = () => {
      const cards = FlashcardController.getFlashcards();
      const subjectId = FlashcardController.getCurrentSubject();
      setFlashcards(cards);

      const remembered = getRememberedCards(cards, subjectId);
      setRememberedCards(remembered);
    };

    loadFlashcards();

    FlashcardController.addChangeListener(loadFlashcards);

    const refreshInterval = setInterval(loadFlashcards, 5000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const cardsToDisplay = activeTab === "all" ? flashcards : rememberedCards;

  const filteredFlashcards = cardsToDisplay.filter((card) => {
    const answerText =
      typeof card.answer === "string"
        ? card.answer
        : JSON.stringify(card.answer);

    return (
      card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      answerText.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowModal(true);
  };
  const handleDeleteCard = (id) => {
    if (window.confirm("Are you sure you want to delete this flashcard?")) {
      if (window.confirm("This action cannot be undone. Confirm deletion?")) {
        FlashcardController.deleteFlashcard(id);
      }
    }
  };

  const closeModal = () => {
    setEditingCard(null);
    setShowModal(false);
  };
  const toggleNewCardForm = () => {
    setShowNewCardForm(!showNewCardForm);
  };

  const handleNewCardClose = () => {
    setShowNewCardForm(false);
  };

  const handleResetAllStats = () => {
    const subjectId = FlashcardController.getCurrentSubject();
    const count = resetAllCardStats(subjectId);
    alert(`Statistics reset for ${count} cards in this subject.`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flashcard-manager">
      <h2>Manage Flashcards</h2>{" "}
      <div className="manager-actions">
        <button className="new-card-button" onClick={toggleNewCardForm}>
          {showNewCardForm ? "Hide Form" : "New Card"}
        </button>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search flashcards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <button
          className="reset-stats-button"
          onClick={handleResetAllStats}
          title="Reset statistics for all flashcards"
        >
          Reset Stats
        </button>
      </div>
      {showNewCardForm && (
        <div className="new-card-form-container">
          <h3>Create New Flashcard</h3>
          <FlashcardForm onClose={handleNewCardClose} />
        </div>
      )}
      <div className="flashcard-tabs">
        <button
          className={`tab-button ${activeTab === "all" ? "active" : ""}`}
          onClick={() => handleTabChange("all")}
        >
          All Cards
        </button>
        <button
          className={`tab-button ${activeTab === "remembered" ? "active" : ""}`}
          onClick={() => handleTabChange("remembered")}
        >
          Remembered Cards
          {rememberedCards.length > 0 && (
            <span className="badge">{rememberedCards.length}</span>
          )}
        </button>
      </div>
      <div className="flashcards-table-container">
        {activeTab === "remembered" && rememberedCards.length === 0 ? (
          <div className="no-cards-message">
            <p>You don't have any remembered cards yet. Keep studying!</p>
          </div>
        ) : (
          <table className="flashcards-table">
            {" "}
            <thead>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>Answer (Preview)</th>
                {activeTab !== "remembered" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredFlashcards.map((card) => (
                <tr key={card.id}>
                  <td>{card.id}</td>
                  <td>{card.question}</td>
                  <td>
                    {typeof card.answer === "string"
                      ? card.answer.slice(0, 50)
                      : JSON.stringify(card.answer).slice(0, 50)}
                    ...
                  </td>{" "}
                  {activeTab !== "remembered" && (
                    <td className="actions">
                      <button
                        className="edit-button"
                        onClick={() => handleEditCard(card)}
                        aria-label="Edit flashcard"
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteCard(card.id)}
                        aria-label="Delete flashcard"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <FlashcardForm
              editMode={true}
              flashcard={editingCard}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardManager;
