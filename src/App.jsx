import { useState } from "react";
import FlashcardList from "./views/FlashcardList";
import FlashcardManager from "./views/FlashcardManager";
import "./App.css";
import "./styles/app.css";

function App() {
  const [currentView, setCurrentView] = useState("study"); // 'study' or 'manage'

  return (
    <div className="app-container">
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
        {currentView === "study" ? <FlashcardList /> : <FlashcardManager />}
      </main>
    </div>
  );
}

export default App;
