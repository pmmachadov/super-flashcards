import { useState, useEffect } from "react";
import FlashcardList from "./views/FlashcardList";
import FlashcardManager from "./views/FlashcardManager";
import SubjectSelector from "./views/SubjectSelector";
import SubjectProgress from "./views/SubjectProgress";
import ExamMode from "./views/ExamMode";
import subjects from "./models/subjects.json";
import "./App.css";
import "./styles/app.css";

function App() {
  const [currentView, setCurrentView] = useState("study");
  const [currentSubject, setCurrentSubject] = useState(null);
  const [subjectData, setSubjectData] = useState(null);

  useEffect(() => {
    if (currentSubject) {
      const subject = subjects.subjects.find((s) => s.id === currentSubject);
      setSubjectData(subject);
    } else {
      setSubjectData(null);
    }
  }, [currentSubject]);

  const handleSubjectChange = (subjectId) => {
    setCurrentSubject(subjectId);
    setCurrentView("study"); // Reset to study view when changing subject
  };

  return (
    <div className="app-container">
      <SubjectSelector onSubjectChange={handleSubjectChange} />

      <div className="view-toggle">
        <button
          className={`view-button ${currentView === "study" ? "active" : ""}`}
          onClick={() => setCurrentView("study")}
        >
          📚 Flashcards
        </button>
        <button
          className={`view-button ${currentView === "exam" ? "active" : ""}`}
          onClick={() => setCurrentView("exam")}
        >
          🎓 Modo Examen
        </button>
        <button
          className={`view-button ${currentView === "progress" ? "active" : ""}`}
          onClick={() => setCurrentView("progress")}
        >
          📊 Progreso
        </button>
        <button
          className={`view-button ${currentView === "manage" ? "active" : ""}`}
          onClick={() => setCurrentView("manage")}
        >
          ⚙️ Gestionar
        </button>
      </div>

      <main className="main-content">
        {currentSubject && (
          <>
            {currentView === "study" && <FlashcardList key={currentSubject} />}
            {currentView === "exam" && (
              <ExamMode onExit={() => setCurrentView("study")} />
            )}
            {currentView === "progress" && subjectData && (
              <SubjectProgress
                subjectId={subjectData.id}
                subjectName={subjectData.name}
                subjectCode={subjectData.code}
                hours={subjectData.hours}
              />
            )}
            {currentView === "manage" && <FlashcardManager key={currentSubject} />}
          </>
        )}
        {!currentSubject && (
          <div className="welcome-message">
            <h2>👋 Bienvenido a tu App de Flashcards DAW</h2>
            <p>Selecciona un módulo del Grado Superior para comenzar a estudiar</p>
            <div className="welcome-features">
              <div className="feature">
                <span className="feature-icon">📚</span>
                <h3>Estudia con Flashcards</h3>
                <p>Repasa conceptos clave de cada módulo</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🎓</span>
                <h3>Modo Examen</h3>
                <p>Simula PACs con límite de tiempo</p>
              </div>
              <div className="feature">
                <span className="feature-icon">📊</span>
                <h3>Seguimiento de Progreso</h3>
                <p>Visualiza tu avance por módulo</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
