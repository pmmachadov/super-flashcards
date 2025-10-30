import subjectsData from "./subjects.json";

class FlashcardModel {
  constructor() {
    this.subjects = subjectsData.subjects;
    this.currentSubject = null;
    this.flashcards = [];
    this.loadedData = {};
  }

  async loadSubjectData(subjectId) {
    const subject = this.subjects.find(s => s.id === subjectId);
    if (!subject) {
      throw new Error(`Subject ${subjectId} not found`);
    }

    if (!this.loadedData[subjectId]) {
      const data = await import(`./${subject.file}`);
      this.loadedData[subjectId] = data.default.questions;
    }

    this.currentSubject = subjectId;
    this.flashcards = this.loadedData[subjectId];
    return this.flashcards;
  }

  getSubjects() {
    return this.subjects;
  }

  getCurrentSubject() {
    return this.currentSubject;
  }

  getAllFlashcards() {
    return this.flashcards;
  }

  getFlashcardById(id) {
    return this.flashcards.find((card) => card.id === id);
  }

  addFlashcard(flashcard) {
    const newId = this.flashcards.length > 0
      ? Math.max(...this.flashcards.map((card) => card.id)) + 1
      : 1;
    const newCard = {
      ...flashcard,
      id: newId,
      questionImage: flashcard.questionImage || null,
      answerImage: flashcard.answerImage || null,
    };
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
