import { useState, useEffect } from "react";
import FlashcardController from "../controllers/FlashcardController";
import "../styles/SubjectSelector.css";

const SubjectSelector = ({ onSubjectChange }) => {
  const [subjects, setSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const availableSubjects = FlashcardController.getSubjects();
    setSubjects(availableSubjects);

    // Cargar la primera materia por defecto
    const loadDefaultSubject = async () => {
      if (availableSubjects.length > 0 && !currentSubject) {
        await handleSubjectSelect(availableSubjects[0].id);
      }
    };

    loadDefaultSubject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubjectSelect = async (subjectId) => {
    setLoading(true);
    try {
      await FlashcardController.loadSubject(subjectId);
      setCurrentSubject(subjectId);
      if (onSubjectChange) {
        onSubjectChange(subjectId);
      }
    } catch (error) {
      console.error("Error loading subject:", error);
      alert("Error al cargar la materia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subject-selector">
      <h3>Selecciona una materia:</h3>
      <div className="subject-buttons">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            className={`subject-button ${
              currentSubject === subject.id ? "active" : ""
            }`}
            onClick={() => handleSubjectSelect(subject.id)}
            disabled={loading}
            style={{
              borderColor: subject.color,
              backgroundColor:
                currentSubject === subject.id ? subject.color : "transparent",
            }}
          >
            <span className="subject-name">{subject.name}</span>
          </button>
        ))}
      </div>
      {loading && <div className="loading">Cargando...</div>}
    </div>
  );
};

export default SubjectSelector;
