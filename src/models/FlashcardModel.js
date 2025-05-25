// Model for handling flashcard data
import flashcardsData from "./db.json";

class FlashcardModel {
  constructor() {
    // The data in db.json uses 'questions' array, not 'flashcards'
    this.flashcards = flashcardsData.questions;
  }

  getAllFlashcards() {
    return this.flashcards;
  }

  getFlashcardById(id) {
    return this.flashcards.find((card) => card.id === id);
  }

  addFlashcard(flashcard) {
    const newId = Math.max(...this.flashcards.map((card) => card.id)) + 1;
    const newCard = { ...flashcard, id: newId };
    this.flashcards.push(newCard);
    return newCard;
  }

  updateFlashcard(id, updatedCard) {
    const index = this.flashcards.findIndex((card) => card.id === id);
    if (index !== -1) {
      this.flashcards[index] = {
        ...this.flashcards[index],
        ...updatedCard,
        id,
      };
      return this.flashcards[index];
    }
    return null;
  }

  deleteFlashcard(id) {
    const index = this.flashcards.findIndex((card) => card.id === id);
    if (index !== -1) {
      const deletedCard = this.flashcards[index];
      this.flashcards.splice(index, 1);
      return deletedCard;
    }
    return null;
  }
}

export default new FlashcardModel();
