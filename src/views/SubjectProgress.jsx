import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getSubjectProgress } from "../components/StatsUtils";
import FlashcardController from "../controllers/FlashcardController";
import "../styles/SubjectProgress.css";

const SubjectProgress = ({ subjectId, subjectName, subjectCode, hours }) => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (subjectId) {
      const flashcards = FlashcardController.getFlashcards();
      const totalCards = flashcards.length;
      const stats = getSubjectProgress(subjectId, totalCards);
      setProgress(stats);
    }
  }, [subjectId]);

  if (!progress) return null;

  return (
    <div className="subject-progress">
      <div className="subject-progress-header">
        <h3>
          {subjectCode} - {subjectName}
        </h3>
        {hours > 0 && <span className="subject-hours">{hours}h</span>}
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress.progressPercentage}%` }}
        >
          <span className="progress-percentage">
            {progress.progressPercentage}%
          </span>
        </div>
      </div>

      <div className="progress-visualization">
        <div className="progress-chart-container">
          <svg viewBox="0 0 200 200" className="progress-chart">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#64748b"
              strokeWidth="40"
              opacity="0.2"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#10b981"
              strokeWidth="40"
              strokeDasharray={`${(progress.remembered / progress.total) * 502.65} 502.65`}
              strokeDashoffset="0"
              transform="rotate(-90 100 100)"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#ef4444"
              strokeWidth="40"
              strokeDasharray={`${(progress.learning / progress.total) * 502.65} 502.65`}
              strokeDashoffset={`-${(progress.remembered / progress.total) * 502.65}`}
              transform="rotate(-90 100 100)"
            />
            <text
              x="100"
              y="95"
              textAnchor="middle"
              fontSize="32"
              fontWeight="bold"
              fill="#ecf0f1"
            >
              {progress.progressPercentage}%
            </text>
            <text
              x="100"
              y="115"
              textAnchor="middle"
              fontSize="12"
              fill="#bdc3c7"
            >
              Completado
            </text>
          </svg>
        </div>

        <div className="progress-stats-grid">
          <div className="progress-stat">
            <span className="stat-label">Total Tarjetas</span>
            <span className="stat-value">{progress.total}</span>
          </div>
          <div className="progress-stat remembered">
            <span className="stat-label">✓ Dominadas</span>
            <span className="stat-value">{progress.remembered}</span>
          </div>
          <div className="progress-stat learning">
            <span className="stat-label">📚 Estudiando</span>
            <span className="stat-value">{progress.learning}</span>
          </div>
          <div className="progress-stat not-started">
            <span className="stat-label">⏳ Sin empezar</span>
            <span className="stat-value">{progress.notStarted}</span>
          </div>
        </div>
      </div>

      <div className="progress-bar-chart">
        <h4 className="bar-chart-title">Distribución de Tarjetas</h4>
        <div className="bar-chart-container">
          <div className="bar-item">
            <div className="bar-label">
              <span className="bar-icon">✓</span>
              <span>Dominadas</span>
            </div>
            <div className="bar-background">
              <div
                className="bar-fill remembered-bar"
                style={{ width: `${(progress.remembered / progress.total) * 100}%` }}
              >
                <span className="bar-value">{progress.remembered}</span>
              </div>
            </div>
          </div>

          <div className="bar-item">
            <div className="bar-label">
              <span className="bar-icon">📚</span>
              <span>Estudiando</span>
            </div>
            <div className="bar-background">
              <div
                className="bar-fill learning-bar"
                style={{ width: `${(progress.learning / progress.total) * 100}%` }}
              >
                <span className="bar-value">{progress.learning}</span>
              </div>
            </div>
          </div>

          <div className="bar-item">
            <div className="bar-label">
              <span className="bar-icon">⏳</span>
              <span>Sin empezar</span>
            </div>
            <div className="bar-background">
              <div
                className="bar-fill not-started-bar"
                style={{ width: `${(progress.notStarted / progress.total) * 100}%` }}
              >
                <span className="bar-value">{progress.notStarted}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {progress.totalAttempts > 0 && (
        <div className="progress-summary">
          <p>
            Total de intentos: <strong>{progress.totalAttempts}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

SubjectProgress.propTypes = {
  subjectId: PropTypes.string.isRequired,
  subjectName: PropTypes.string.isRequired,
  subjectCode: PropTypes.string,
  hours: PropTypes.number,
};

export default SubjectProgress;
