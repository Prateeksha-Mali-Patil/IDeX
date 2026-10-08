function RiskCard({ id, score, level, decision }) {
  return (
    <div className={`risk-card ${level.toLowerCase()}`}>
      <div className="risk-card-top">
        <span className="identity-id">{id}</span>

        <span className="risk-level">
          {level}
        </span>
      </div>

      <div className="risk-score">
        <strong>{score}</strong>
        <span>/100</span>
      </div>

      <p className="risk-label">RISK SCORE</p>

      <div className="decision">
        <span>DECISION</span>
        <strong>{decision}</strong>
      </div>

      <button className="investigate-btn">
        Investigate →
      </button>
    </div>
  );
}

export default RiskCard;