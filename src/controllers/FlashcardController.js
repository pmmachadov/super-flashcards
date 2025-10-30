import FlashcardModel from "../models/FlashcardModel";

class FlashcardController {
  constructor() {
    this.model = FlashcardModel;
    this.listeners = [];
  }

  async loadSubject(subjectId) {
    await this.model.loadSubjectData(subjectId);
    this.notifyListeners();
  }

  getSubjects() {
    return this.model.getSubjects();
  }

  getCurrentSubject() {
    return this.model.getCurrentSubject();
  }

  getFlashcards() {
    return this.model.getAllFlashcards();
  }

  getFlashcard(id) {
    return this.model.getFlashcardById(id);
  }

  createFlashcard(flashcard) {
    const newCard = this.model.addFlashcard(flashcard);
    this.notifyListeners();
    return newCard;
  }

  updateFlashcard(id, flashcard) {
    const updatedCard = this.model.updateFlashcard(id, flashcard);
    this.notifyListeners();
    return updatedCard;
  }

  deleteFlashcard(id) {
    const deletedCard = this.model.deleteFlashcard(id);
    this.notifyListeners();
    return deletedCard;
  }

  addChangeListener(listener) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export default new FlashcardController();
