import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getSubjectProgress } from "../components/StatsUtils";
import "../styles/SubjectProgress.css";

const SubjectProgress = ({ subjectId, subjectName, subjectCode, hours }) => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (subjectId) {
      const stats = getSubjectProgress(subjectId);
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
