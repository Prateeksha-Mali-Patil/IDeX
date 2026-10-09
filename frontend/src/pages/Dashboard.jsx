import { useEffect, useState } from "react";
import { getEvents, getIdentities } from "../services/api";

function Dashboard({ onSearchIdentity }) {
  const [identityId, setIdentityId] = useState("");
  const [identities, setIdentities] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = () => {
    const id = identityId.trim().toUpperCase();

    if (!id) {
      alert("Please enter an Identity ID");
      return;
    }

    onSearchIdentity(id);
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const [identityData, eventData] = await Promise.all([
          getIdentities(),
          getEvents(),
        ]);

        setIdentities(
          Array.isArray(identityData) ? identityData : []
        );

        setEvents(
          Array.isArray(eventData) ? eventData : []
        );
      } catch (error) {
        console.error(
          "Failed to load dashboard data:",
          error
        );

        setIdentities([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const getRiskLevel = (riskScore) => {
    if (riskScore >= 70) return "HIGH";
    if (riskScore >= 40) return "MEDIUM";
    return "LOW";
  };

  const highRiskCount = events.filter(
    (event) => Number(event.riskScore || 0) >= 70
  ).length;

  const challengedCount = events.filter(
    (event) => event.decision === "CHALLENGE"
  ).length;

  const relationshipsCount = 3;

  const recentEvents = events.slice(0, 5);

  return (
    <div className="console-content">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <p className="eyebrow">IDEX SECURITY CONSOLE</p>
          <h1>Dashboard</h1>
          <p className="page-subtitle">
            Digital identity fraud and synthetic identity detection
          </p>
        </div>

        <div className="engine-status">
          <span className="status-dot"></span>
          DETECTION ENGINE ONLINE
        </div>
      </div>

      {/* IDENTITY SEARCH */}
      <div className="identity-search-card">
        <div>
          <p className="eyebrow">IDENTITY INVESTIGATION</p>
          <h2>Search Identity</h2>
          <p className="search-description">
            Enter an Identity ID to investigate risk, indicators,
            devices, IP addresses and relationships.
          </p>
        </div>

        <div className="search-box">
          <input
            type="text"
            value={identityId}
            onChange={(e) => setIdentityId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Enter Identity ID e.g. ID-047"
          />

          <button onClick={handleSearch}>
            SEARCH
          </button>
        </div>

        <div className="search-examples">
          Try:{" "}
          <button onClick={() => setIdentityId("ID-047")}>
            ID-047
          </button>

          <button onClick={() => setIdentityId("ID-025")}>
            ID-025
          </button>

          <button onClick={() => setIdentityId("ID-001")}>
            ID-001
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="dashboard-grid">

        <div className="dashboard-card">
          <span className="card-label">
            IDENTITIES MONITORED
          </span>

          <strong>
            {loading ? "..." : identities.length}
          </strong>

          <small>Active identities</small>
        </div>

        <div className="dashboard-card">
          <span className="card-label">
            HIGH RISK
          </span>

          <strong>
            {loading ? "..." : highRiskCount}
          </strong>

          <small>Require investigation</small>
        </div>

        <div className="dashboard-card">
          <span className="card-label">
            CHALLENGED
          </span>

          <strong>
            {loading ? "..." : challengedCount}
          </strong>

          <small>Additional verification</small>
        </div>

        <div className="dashboard-card">
          <span className="card-label">
            RELATIONSHIPS
          </span>

          <strong>
            {loading ? "..." : relationshipsCount}
          </strong>

          <small>Identity connections</small>
        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="dashboard-section">

        <div className="section-title">
          <h2>Recent Risk Events</h2>
          <span>LIVE</span>
        </div>

        <div className="recent-events">

          {loading && (
            <div className="event-row">
              <div>
                <strong>Loading...</strong>
                <span>
                  Fetching recent security events
                </span>
              </div>
            </div>
          )}

          {!loading && recentEvents.length === 0 && (
            <div className="event-row">
              <div>
                <strong>No risk events</strong>
                <span>
                  No security events are currently available.
                </span>
              </div>
            </div>
          )}

          {!loading &&
            recentEvents.map((event) => {
              const riskScore = Number(
                event.riskScore || 0
              );

              const riskLevel =
                getRiskLevel(riskScore);

              let description =
                "Security event detected";

              if (riskLevel === "HIGH") {
                description =
                  "High-risk authentication activity";
              } else if (riskLevel === "MEDIUM") {
                description =
                  "Unusual authentication activity";
              } else {
                description =
                  "Normal authentication activity";
              }

              return (
                <div
                  className="event-row"
                  key={event.eventId || event.id}
                >
                  <div>
                    <strong>
                      {event.identityId || "UNKNOWN"}
                    </strong>

                    <span>
                      {description}
                    </span>
                  </div>

                  <div
                    className={`event-risk ${riskLevel.toLowerCase()}`}
                  >
                    {riskScore} {riskLevel}
                  </div>

                  <div>
                    {event.decision || "PENDING"}
                  </div>
                </div>
              );
            })}

        </div>
      </div>

    </div>
  );
}

export default Dashboard;