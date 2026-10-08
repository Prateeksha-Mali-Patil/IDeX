import { useEffect, useState } from "react";
import { getIdentity } from "../services/api";

function Investigation({ identityId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadIdentity = async () => {
      if (!identityId) {
        setError("No Identity ID selected.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const identity = await getIdentity(identityId);
        setData(identity);
      } catch (err) {
        console.error("Failed to load identity:", err);

        setData(null);
        setError(
          err.response?.data?.message ||
            "Unable to load identity data from the backend."
        );
      } finally {
        setLoading(false);
      }
    };

    loadIdentity();
  }, [identityId]);

  if (loading) {
    return (
      <div className="console-content">
        <div className="page-header">
          <div>
            <p className="eyebrow">IDENTITY INVESTIGATION</p>
            <h1>Loading...</h1>
            <p className="page-subtitle">
              Loading identity risk analysis for{" "}
              <strong>{identityId}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="console-content">
        <div className="page-header">
          <div>
            <p className="eyebrow">IDENTITY INVESTIGATION</p>
            <h1>Identity Not Found</h1>
            <p className="page-subtitle">
              Unable to load investigation data for{" "}
              <strong>{identityId}</strong>
            </p>
          </div>
        </div>

        <div className="not-found-card">
          <h2>Unable to load identity</h2>
          <p>{error || "No identity data was returned by the backend."}</p>
        </div>
      </div>
    );
  }

  // Backend data
  const indicators = data.indicators || [];
  const relationships = data.relationships || [];

  // Device from Prisma relation
  const device =
    data.devices?.[0]?.device?.id ||
    data.devices?.[0]?.deviceId ||
    "N/A";

  // IP from Prisma relation
  const ip =
    data.ips?.[0]?.ip?.address ||
    data.ips?.[0]?.ipId ||
    "N/A";

  // Calculate risk score from indicators
  const score = indicators.reduce(
    (total, indicator) => total + (indicator.score || 0),
    0
  );

  // Determine risk level
  let level = "LOW";

  if (score >= 60) {
    level = "HIGH";
  } else if (score >= 30) {
    level = "MEDIUM";
  }

  // Determine decision
  let decision = "ALLOW";

  if (level === "HIGH") {
    decision = "BLOCK";
  } else if (level === "MEDIUM") {
    decision = "CHALLENGE_REVIEW";
  }

  return (
    <div className="console-content">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <p className="eyebrow">IDENTITY INVESTIGATION</p>

          <h1>{data.id}</h1>

          <p className="page-subtitle">
            Identity risk analysis and relationship investigation
          </p>
        </div>

        <div
          className={`investigation-decision ${level.toLowerCase()}`}
        >
          {decision}
        </div>
      </div>

      {/* RISK OVERVIEW */}
      <div className="investigation-overview">

        <div className={`big-risk-card ${level.toLowerCase()}`}>
          <span>RISK SCORE</span>

          <div className="big-risk-score">
            {score}
            <small>/100</small>
          </div>

          <strong>{level} RISK</strong>
        </div>

        <div className="identity-details-card">
          <h2>Identity Details</h2>

          <div className="detail-grid">

            <div>
              <span>IDENTITY ID</span>
              <strong>{data.id}</strong>
            </div>

            <div>
              <span>DEVICE</span>
              <strong>{device}</strong>
            </div>

            <div>
              <span>IP ADDRESS</span>
              <strong>{ip}</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong>{data.status}</strong>
            </div>

          </div>
        </div>
      </div>

      {/* RISK INDICATORS */}
      <div className="dashboard-section">
        <div className="section-title">
          <h2>Risk Indicators</h2>

          <span>
            {indicators.length} DETECTED
          </span>
        </div>

        <div className="investigation-indicators">

          {indicators.length > 0 ? (
            indicators.map((indicator) => (
              <div
                className="investigation-indicator"
                key={indicator.id}
              >
                <div className="indicator-top">

                  <h3>{indicator.name}</h3>

                  <span
                    className={`severity ${(
                      indicator.severity || "MEDIUM"
                    ).toLowerCase()}`}
                  >
                    {indicator.severity}
                  </span>

                </div>

                <p>
                  {indicator.evidence ||
                    "No evidence description available."}
                </p>

                <small>
                  Risk contribution: +{indicator.score}
                </small>
              </div>
            ))
          ) : (
            <div className="investigation-indicator">

              <div className="indicator-top">
                <h3>No risk indicators</h3>

                <span className="severity low">
                  LOW
                </span>
              </div>

              <p>
                No active risk indicators were returned for this identity.
              </p>

            </div>
          )}

        </div>
      </div>

      {/* IDENTITY RELATIONSHIPS */}
      <div className="dashboard-section">

        <div className="section-title">
          <h2>Identity Relationships</h2>

          <span>NETWORK ANALYSIS</span>
        </div>

        <div className="relationship-summary">

          <div>
            <span>CONNECTED DEVICE</span>
            <strong>{device}</strong>
          </div>

          <div>
            <span>IP ADDRESS</span>
            <strong>{ip}</strong>
          </div>

          <div>
            <span>RELATED IDENTITIES</span>
            <strong>{relationships.length}</strong>
          </div>

          <div>
            <span>ACCOUNT STATUS</span>
            <strong>{data.status}</strong>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Investigation;