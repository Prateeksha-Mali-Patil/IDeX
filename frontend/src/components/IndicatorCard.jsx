function IndicatorCard({ name, severity, evidence }) {
  return (
    <div className="indicator-card">
      <div className="indicator-header">
        <h3>{name}</h3>

        <span className={`severity ${severity.toLowerCase()}`}>
          {severity}
        </span>
      </div>

      <p>{evidence}</p>
    </div>
  );
}

export default IndicatorCard;