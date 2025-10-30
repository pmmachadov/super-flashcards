import { useState } from "react";
import FlashcardList from "./views/FlashcardList";
import FlashcardManager from "./views/FlashcardManager";
import SubjectSelector from "./views/SubjectSelector";
import "./App.css";
import "./styles/app.css";

function App() {
  const [currentView, setCurrentView] = useState("study");
  const [currentSubject, setCurrentSubject] = useState(null);

  const handleSubjectChange = (subjectId) => {
    setCurrentSubject(subjectId);
  };

  return (
    <div className="app-container">
      <SubjectSelector onSubjectChange={handleSubjectChange} />

      <div className="view-toggle">
        <button
          className={`view-button ${currentView === "study" ? "active" : ""}`}
          onClick={() => setCurrentView("study")}
        >
          Flashcards
        </button>
        <button
          className={`view-button ${currentView === "manage" ? "active" : ""}`}
          onClick={() => setCurrentView("manage")}
        >
          Manage Cards
        </button>
      </div>

      <main className="main-content">
        {currentSubject && (
          currentView === "study" ? <FlashcardList /> : <FlashcardManager />
        )}
        {!currentSubject && (
          <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
            Selecciona una materia para comenzar
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
