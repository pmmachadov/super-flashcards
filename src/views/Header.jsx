import { useState } from "react";
import FlashcardForm from "./FlashcardForm";
import "../styles/Header.css";

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showMenu) setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>JavaScript Flashcards</h1>
        <div className="header-actions">
          <button
            className="create-button"
            onClick={toggleForm}
            aria-label="Create new flashcard"
          >
            <i className="plus-icon">+</i> New Card
          </button>

          <button
            className="menu-button"
            onClick={toggleMenu}
            aria-label="Show menu"
          >
            <span className="menu-icon"></span>
          </button>

          {showMenu && (
            <div className="dropdown-menu">
              <ul>
                <li>
                  <a href="#study">Study Mode</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <FlashcardForm onClose={toggleForm} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
