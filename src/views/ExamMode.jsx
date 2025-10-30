import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import FlashcardController from "../controllers/FlashcardController";
import { savePACResult } from "../components/StatsUtils";
import "../styles/ExamMode.css";

const ExamMode = ({ onExit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [examDuration, setExamDuration] = useState(30); // minutos
  const [numQuestions, setNumQuestions] = useState(10);
  const [score, setScore] = useState(0);
  const [maxQuestions, setMaxQuestions] = useState(50);

  useEffect(() => {
    const allFlashcards = FlashcardController.getFlashcards();
    const totalCards = allFlashcards.length;
    setMaxQuestions(totalCards > 0 ? totalCards : 50);
    if (numQuestions > totalCards) {
      setNumQuestions(Math.min(10, totalCards));
    }
  }, [numQuestions]);

  const finishExam = useCallback((answers = userAnswers) => {
    const correctAnswers = answers.filter((a) => a === true).length;
    setScore(correctAnswers);
    setExamFinished(true);

    // Guardar resultado de PAC
    const subjectId = FlashcardController.getCurrentSubject();
    if (subjectId) {
      const pacNumber = Date.now(); // Usar timestamp como número de PAC
      savePACResult(subjectId, pacNumber, correctAnswers, questions.length);
    }
  }, [userAnswers, questions.length]);

  useEffect(() => {
    if (examStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examStarted, timeRemaining, finishExam, userAnswers, questions.length]);

  const startExam = () => {
    const allFlashcards = FlashcardController.getFlashcards();

    if (allFlashcards.length === 0) {
      alert("No hay flashcards disponibles para este examen.");
      return;
    }

    // Seleccionar preguntas aleatorias
    const shuffled = [...allFlashcards].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(
      0,
      Math.min(numQuestions, shuffled.length)
    );

    setQuestions(selectedQuestions);
    setUserAnswers(new Array(selectedQuestions.length).fill(null));
    setTimeRemaining(examDuration * 60); // convertir a segundos
    setExamStarted(true);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const handleAnswer = (correct) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = correct;
    setUserAnswers(newAnswers);
    setShowAnswer(false);

    // Avanzar automáticamente a la siguiente pregunta
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 500);
    } else {
      // Si es la última pregunta, terminar el examen
      setTimeout(() => {
        finishExam(newAnswers);
      }, 500);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!examStarted) {
    return (
      <div className="exam-mode">
        <div className="exam-config">
          <h2>🎓 Modo Examen - Simulación PAC</h2>
          <p>
            Pon a prueba tus conocimientos con un examen tipo PAC. Responde las
            preguntas en el tiempo establecido.
          </p>

          <div className="exam-settings">
            <div className="setting-group">
              <label htmlFor="numQuestions">
                Número de preguntas: <strong>{numQuestions}</strong> de {maxQuestions}
              </label>
              <input
                id="numQuestions"
                type="range"
                min="3"
                max={maxQuestions}
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              />
            </div>

            <div className="setting-group">
              <label htmlFor="examDuration">
                Duración: <strong>{examDuration} minutos</strong>
              </label>
              <input
                id="examDuration"
                type="range"
                min="1"
                max="60"
                value={examDuration}
                onChange={(e) => setExamDuration(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="exam-actions">
            <button className="btn-start-exam" onClick={startExam}>
              Comenzar Examen
            </button>
            <button className="btn-cancel" onClick={onExit}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (examFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 50;

    return (
      <div className="exam-mode">
        <div className="exam-results">
          <h2>📊 Resultados del Examen</h2>

          <div className={`result-card ${passed ? "passed" : "failed"}`}>
            <div className="result-score">
              <span className="score-number">{percentage}%</span>
              <span className="score-label">
                {passed ? "¡APROBADO! ✓" : "No superado ✗"}
              </span>
            </div>

            <div className="result-details">
              <p>
                Respuestas correctas: <strong>{score}</strong> de{" "}
                <strong>{questions.length}</strong>
              </p>
              <p>
                Respuestas incorrectas:{" "}
                <strong>{questions.length - score}</strong>
              </p>
            </div>
          </div>

          <div className="exam-actions">
            <button className="btn-retry" onClick={() => window.location.reload()}>
              Repetir Examen
            </button>
            <button className="btn-exit" onClick={onExit}>
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="exam-mode">
      <div className="exam-header">
        <div className="exam-progress">
          Pregunta {currentIndex + 1} de {questions.length}
        </div>
        <div className={`exam-timer ${timeRemaining < 300 ? "warning" : ""}`}>
          ⏱ {formatTime(timeRemaining)}
        </div>
      </div>

      <div className="exam-question-card">
        <div className="question-number">Pregunta {currentIndex + 1}</div>
        <div className="question-text">{currentQuestion.question}</div>

        {!showAnswer ? (
          <button
            className="btn-show-answer"
            onClick={() => setShowAnswer(true)}
          >
            Ver Respuesta
          </button>
        ) : (
          <div className="answer-section">
            <div className="answer-text">{currentQuestion.answer}</div>

            <div className="answer-buttons">
              <p>¿Respondiste correctamente?</p>
              <button
                className="btn-correct"
                onClick={() => handleAnswer(true)}
              >
                ✓ Correcto
              </button>
              <button
                className="btn-incorrect"
                onClick={() => handleAnswer(false)}
              >
                ✗ Incorrecto
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="exam-footer">
        <button className="btn-finish-early" onClick={() => finishExam()}>
          Finalizar Examen
        </button>
      </div>
    </div>
  );
};

ExamMode.propTypes = {
  onExit: PropTypes.func.isRequired,
};

export default ExamMode;
