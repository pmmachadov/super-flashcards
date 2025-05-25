// Controller to handle actions between model and view
import FlashcardModel from "../models/FlashcardModel";

class FlashcardController {
  constructor() {
    this.model = FlashcardModel;
    this.listeners = [];
  }

  // Retrieve all flashcards
  getFlashcards() {
    return this.model.getAllFlashcards();
  }

  // Get a specific flashcard by ID
  getFlashcard(id) {
    return this.model.getFlashcardById(id);
  }

  // Create a new flashcard
  createFlashcard(flashcard) {
    const newCard = this.model.addFlashcard(flashcard);
    this.notifyListeners();
    return newCard;
  }

  // Update an existing flashcard
  updateFlashcard(id, flashcard) {
    const updatedCard = this.model.updateFlashcard(id, flashcard);
    this.notifyListeners();
    return updatedCard;
  }

  // Delete a flashcard
  deleteFlashcard(id) {
    const deletedCard = this.model.deleteFlashcard(id);
    this.notifyListeners();
    return deletedCard;
  }

  // Observer pattern implementation
  addChangeListener(listener) {
    this.listeners.push(listener);
  }

  // Notify all listeners when data changes
  notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export default new FlashcardController();
