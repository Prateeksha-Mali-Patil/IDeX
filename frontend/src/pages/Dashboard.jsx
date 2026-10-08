import { useState } from "react";

function Dashboard({ onSearchIdentity }) {
  const [identityId, setIdentityId] = useState("");

  const handleSearch = () => {
    const id = identityId.trim().toUpperCase();

    if (!id) {
      alert("Please enter an Identity ID");
      return;
    }

    onSearchIdentity(id);
  };

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
          <span className="card-label">IDENTITIES MONITORED</span>
          <strong>1,284</strong>
          <small>Active identities</small>
        </div>

        <div className="dashboard-card">
          <span className="card-label">HIGH RISK</span>
          <strong>42</strong>
          <small>Require investigation</small>
        </div>

        <div className="dashboard-card">
          <span className="card-label">CHALLENGED</span>
          <strong>118</strong>
          <small>Additional verification</small>
        </div>

        <div className="dashboard-card">
          <span className="card-label">RELATIONSHIPS</span>
          <strong>3,921</strong>
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

          <div className="event-row">
            <div>
              <strong>ID-047</strong>
              <span>Suspicious login activity</span>
            </div>
            <div className="event-risk high">
              91 HIGH
            </div>
            <div>BLOCK / REVIEW</div>
          </div>

          <div className="event-row">
            <div>
              <strong>ID-025</strong>
              <span>Unusual login velocity</span>
            </div>
            <div className="event-risk medium">
              56 MEDIUM
            </div>
            <div>CHALLENGE</div>
          </div>

          <div className="event-row">
            <div>
              <strong>ID-001</strong>
              <span>Normal authentication</span>
            </div>
            <div className="event-risk low">
              18 LOW
            </div>
            <div>ALLOW</div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;