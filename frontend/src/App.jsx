import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Investigation from "./pages/Investigation";
import "./App.css";

function IdentityGraph() {
  return (
    <div className="console-content">

      <div className="page-header">
        <div>
          <p className="eyebrow">NETWORK ANALYSIS</p>
          <h1>Identity Graph</h1>
          <p className="page-subtitle">
            Visualize relationships between identities, devices and IP addresses
          </p>
        </div>
      </div>

      <div className="graph-stats">
        <div>
          <strong>1,284</strong>
          <span>IDENTITIES</span>
        </div>

        <div>
          <strong>842</strong>
          <span>DEVICES</span>
        </div>

        <div>
          <strong>617</strong>
          <span>IP ADDRESSES</span>
        </div>

        <div>
          <strong>3,921</strong>
          <span>RELATIONSHIPS</span>
        </div>
      </div>

      <div className="big-graph">

        <div className="graph-line line-1"></div>
        <div className="graph-line line-2"></div>
        <div className="graph-line line-3"></div>
        <div className="graph-line line-4"></div>

        <div className="graph-node center-node">
          <strong>ID-047</strong>
          <span>IDENTITY</span>
        </div>

        <div className="graph-node device-node">
          <strong>DEV-8841</strong>
          <span>DEVICE</span>
        </div>

        <div className="graph-node ip-node">
          <strong>IP-24.91</strong>
          <span>IP ADDRESS</span>
        </div>

        <div className="graph-node identity-node">
          <strong>ID-025</strong>
          <span>IDENTITY</span>
        </div>

        <div className="graph-node location-node">
          <strong>BENGALURU</strong>
          <span>LOCATION</span>
        </div>

      </div>

    </div>
  );
}

function RiskEvents() {
  const events = [
    ["EVT-90421", "ID-047", "91", "HIGH", "BLOCK / REVIEW", "12 sec ago"],
    ["EVT-90420", "ID-025", "56", "MEDIUM", "CHALLENGE", "1 min ago"],
    ["EVT-90419", "ID-001", "18", "LOW", "ALLOW", "3 min ago"],
    ["EVT-90418", "ID-083", "76", "HIGH", "BLOCK / REVIEW", "5 min ago"],
  ];

  return (
    <div className="console-content">

      <div className="page-header">
        <div>
          <p className="eyebrow">SECURITY EVENTS</p>
          <h1>Risk Events</h1>
          <p className="page-subtitle">
            Recent identity security analysis events
          </p>
        </div>
      </div>

      <div className="events-table">

        <div className="events-header">
          <span>EVENT ID</span>
          <span>IDENTITY</span>
          <span>RISK</span>
          <span>LEVEL</span>
          <span>DECISION</span>
          <span>TIME</span>
        </div>

        {events.map((event, index) => (
          <div className="events-row" key={index}>
            <span>{event[0]}</span>
            <strong>{event[1]}</strong>
            <span>{event[2]}/100</span>
            <span className={`event-level ${event[3].toLowerCase()}`}>
              {event[3]}
            </span>
            <span>{event[4]}</span>
            <span>{event[5]}</span>
          </div>
        ))}

      </div>
    </div>
  );
}

function AuditLogs() {
  const logs = [
    ["19:04:21", "IDeX Engine", "Risk analysis completed", "ID-047", "BLOCK / REVIEW"],
    ["19:03:48", "Analyst", "Investigation opened", "ID-047", "SUCCESS"],
    ["19:02:16", "IDeX Engine", "Identity relationship detected", "DEV-8841", "FLAGGED"],
    ["19:01:42", "Security Plugin", "Authentication event received", "EVT-90420", "SUCCESS"],
    ["18:59:31", "IDeX Engine", "Behaviour anomaly detected", "ID-083", "FLAGGED"],
  ];

  return (
    <div className="console-content">

      <div className="page-header">
        <div>
          <p className="eyebrow">SYSTEM ACTIVITY</p>
          <h1>Audit Logs</h1>
          <p className="page-subtitle">
            Traceable security and analyst actions
          </p>
        </div>
      </div>

      <div className="audit-table">

        <div className="audit-header">
          <span>TIME</span>
          <span>ACTOR</span>
          <span>ACTION</span>
          <span>RESOURCE</span>
          <span>RESULT</span>
        </div>

        {logs.map((log, index) => (
          <div className="audit-row" key={index}>
            <span>{log[0]}</span>
            <span>{log[1]}</span>
            <strong>{log[2]}</strong>
            <span>{log[3]}</span>
            <span>{log[4]}</span>
          </div>
        ))}

      </div>

    </div>
  );
}

function App() {

  const [activePage, setActivePage] = useState("dashboard");
  const [selectedIdentity, setSelectedIdentity] = useState("ID-047");

  const handleSearchIdentity = (id) => {
    setSelectedIdentity(id);
    setActivePage("investigation");
  };

  const renderPage = () => {

    if (activePage === "dashboard") {
      return (
        <Dashboard
          onSearchIdentity={handleSearchIdentity}
        />
      );
    }

    if (activePage === "investigation") {
      return (
        <Investigation
          identityId={selectedIdentity}
        />
      );
    }

    if (activePage === "graph") {
      return <IdentityGraph />;
    }

    if (activePage === "events") {
      return <RiskEvents />;
    }

    if (activePage === "audit") {
      return <AuditLogs />;
    }

    return null;
  };

  return (
    <div className="global-console">

      {/* SIDEBAR */}
      <aside className="global-sidebar">

        <div className="brand">
          <div className="brand-icon">I</div>

          <div>
            <h2>IDeX</h2>
            <span>IDENTITY SECURITY</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <button
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className={activePage === "investigation" ? "active" : ""}
            onClick={() => setActivePage("investigation")}
          >
            <span>⌕</span>
            Investigations
          </button>

          <button
            className={activePage === "graph" ? "active" : ""}
            onClick={() => setActivePage("graph")}
          >
            <span>◈</span>
            Identity Graph
          </button>

          <button
            className={activePage === "events" ? "active" : ""}
            onClick={() => setActivePage("events")}
          >
            <span>⚠</span>
            Risk Events
          </button>

          <button
            className={activePage === "audit" ? "active" : ""}
            onClick={() => setActivePage("audit")}
          >
            <span>▤</span>
            Audit Logs
          </button>

        </nav>

        <div className="engine-footer">
          <span className="status-dot"></span>

          <div>
            <strong>DETECTION ENGINE</strong>
            <small>ONLINE • v1.0</small>
          </div>
        </div>

      </aside>

      {/* MAIN */}
      <main className="global-page">
        {renderPage()}
      </main>

    </div>
  );
}

export default App;