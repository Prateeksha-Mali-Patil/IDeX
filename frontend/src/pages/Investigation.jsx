function Investigation({ identityId }) {
  const identities = {
    "ID-047": {
      score: 91,
      level: "HIGH",
      decision: "BLOCK / REVIEW",
      device: "DEV-8841",
      ip: "24.91.xx.xx",
      location: "Bengaluru",
      indicators: [
        {
          name: "Behaviour Anomaly",
          severity: "HIGH",
          evidence: "Login behaviour differs significantly from the identity's normal pattern."
        },
        {
          name: "Suspicious IP",
          severity: "HIGH",
          evidence: "IP address is associated with multiple identities."
        },
        {
          name: "Login Velocity",
          severity: "MEDIUM",
          evidence: "Multiple authentication attempts detected within a short time."
        },
        {
          name: "New Device",
          severity: "MEDIUM",
          evidence: "Identity accessed from a previously unseen device."
        }
      ]
    },

    "ID-025": {
      score: 56,
      level: "MEDIUM",
      decision: "CHALLENGE",
      device: "DEV-4421",
      ip: "103.21.xx.xx",
      location: "Bengaluru",
      indicators: [
        {
          name: "Login Velocity",
          severity: "MEDIUM",
          evidence: "Higher than normal authentication frequency."
        },
        {
          name: "New Device",
          severity: "LOW",
          evidence: "New device detected for this identity."
        }
      ]
    },

    "ID-001": {
      score: 18,
      level: "LOW",
      decision: "ALLOW",
      device: "DEV-1022",
      ip: "49.36.xx.xx",
      location: "Bengaluru",
      indicators: [
        {
          name: "Normal Behaviour",
          severity: "LOW",
          evidence: "Authentication behaviour matches the normal identity profile."
        }
      ]
    }
  };

  const data = identities[identityId];

  if (!data) {
    return (
      <div className="console-content">
        <div className="page-header">
          <div>
            <p className="eyebrow">IDENTITY INVESTIGATION</p>
            <h1>Identity Not Found</h1>
            <p className="page-subtitle">
              No mock investigation data available for{" "}
              <strong>{identityId}</strong>
            </p>
          </div>
        </div>

        <div className="not-found-card">
          <h2>Identity ID not found</h2>
          <p>
            Try one of the available demo identities:
          </p>

          <div className="available-ids">
            <span>ID-047</span>
            <span>ID-025</span>
            <span>ID-001</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="console-content">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <p className="eyebrow">IDENTITY INVESTIGATION</p>
          <h1>{identityId}</h1>
          <p className="page-subtitle">
            Identity risk analysis and relationship investigation
          </p>
        </div>

        <div className={`investigation-decision ${data.level.toLowerCase()}`}>
          {data.decision}
        </div>
      </div>

      {/* RISK OVERVIEW */}
      <div className="investigation-overview">

        <div className={`big-risk-card ${data.level.toLowerCase()}`}>
          <span>RISK SCORE</span>

          <div className="big-risk-score">
            {data.score}
            <small>/100</small>
          </div>

          <strong>{data.level} RISK</strong>
        </div>

        <div className="identity-details-card">
          <h2>Identity Details</h2>

          <div className="detail-grid">

            <div>
              <span>IDENTITY ID</span>
              <strong>{identityId}</strong>
            </div>

            <div>
              <span>DEVICE</span>
              <strong>{data.device}</strong>
            </div>

            <div>
              <span>IP ADDRESS</span>
              <strong>{data.ip}</strong>
            </div>

            <div>
              <span>LOCATION</span>
              <strong>{data.location}</strong>
            </div>

          </div>
        </div>

      </div>

      {/* INDICATORS */}
      <div className="dashboard-section">
        <div className="section-title">
          <h2>Risk Indicators</h2>
          <span>{data.indicators.length} DETECTED</span>
        </div>

        <div className="investigation-indicators">

          {data.indicators.map((indicator, index) => (
            <div className="investigation-indicator" key={index}>

              <div className="indicator-top">
                <h3>{indicator.name}</h3>

                <span className={`severity ${indicator.severity.toLowerCase()}`}>
                  {indicator.severity}
                </span>
              </div>

              <p>{indicator.evidence}</p>

            </div>
          ))}

        </div>
      </div>

      {/* RELATIONSHIPS */}
      <div className="dashboard-section">
        <div className="section-title">
          <h2>Identity Relationships</h2>
          <span>NETWORK ANALYSIS</span>
        </div>

        <div className="relationship-summary">

          <div>
            <span>CONNECTED DEVICE</span>
            <strong>{data.device}</strong>
          </div>

          <div>
            <span>IP ADDRESS</span>
            <strong>{data.ip}</strong>
          </div>

          <div>
            <span>LOCATION</span>
            <strong>{data.location}</strong>
          </div>

          <div>
            <span>RELATED IDENTITIES</span>
            <strong>3</strong>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Investigation;