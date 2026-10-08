import RiskCard from "../components/RiskCard";
import IndicatorCard from "../components/IndicatorCard";

function Dashboard() {
  const indicators = [
    {
      name: "New Device",
      severity: "MEDIUM",
      evidence: "Device has not previously been associated with ID-047.",
      score: "+12",
    },
    {
      name: "Suspicious IP",
      severity: "HIGH",
      evidence: "IP appears across multiple unusual authentication events.",
      score: "+21",
    },
    {
      name: "Login Velocity",
      severity: "HIGH",
      evidence: "7 authentication attempts detected within 90 seconds.",
      score: "+18",
    },
    {
      name: "Behaviour Anomaly",
      severity: "CRITICAL",
      evidence: "Current activity significantly deviates from baseline behaviour.",
      score: "+24",
    },
  ];

  return (
    <div className="app-shell">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-mark">I</div>
          <div>
            <h2>IDeX</h2>
            <span>IDENTITY INTELLIGENCE</span>
          </div>
        </div>

        <nav className="navigation">

          <div className="nav-section">OPERATIONS</div>

          <a className="nav-item active">
            <span>⌁</span>
            Dashboard
          </a>

          <a className="nav-item">
            <span>◉</span>
            Investigations
          </a>

          <a className="nav-item">
            <span>◎</span>
            Identity Graph
          </a>

          <div className="nav-section">INTELLIGENCE</div>

          <a className="nav-item">
            <span>◇</span>
            Risk Events
          </a>

          <a className="nav-item">
            <span>▣</span>
            Audit Logs
          </a>

        </nav>

        <div className="sidebar-bottom">
          <div className="security-status">
            <span className="pulse"></span>
            <div>
              <strong>Detection Engine</strong>
              <small>Operational</small>
            </div>
          </div>

          <div className="version">
            IDeX Security Platform<br />
            <span>v1.0 • CY-04</span>
          </div>
        </div>

      </aside>

      {/* MAIN */}
      <main className="main-content">

        {/* TOP BAR */}
        <header className="topbar">

          <div>
            <span className="breadcrumb">SECURITY / OVERVIEW</span>
            <h1>Identity Risk Command Center</h1>
          </div>

          <div className="topbar-right">
            <div className="live-status">
              <span className="live-dot"></span>
              LIVE MONITORING
            </div>

            <div className="avatar">
              M
            </div>
          </div>

        </header>

        {/* SYSTEM STRIP */}
        <section className="system-strip">

          <div>
            <span>ENGINE STATUS</span>
            <strong>
              <i className="online"></i>
              OPERATIONAL
            </strong>
          </div>

          <div>
            <span>EVENT STREAM</span>
            <strong>8,492 EVENTS</strong>
          </div>

          <div>
            <span>MODEL CONFIDENCE</span>
            <strong>94.7%</strong>
          </div>

          <div>
            <span>LAST ANALYSIS</span>
            <strong>12 SEC AGO</strong>
          </div>

        </section>

        {/* MAIN RISK AREA */}
        <section className="hero-grid">

          {/* RISK PANEL */}
          <div className="risk-panel">

            <div className="panel-header">
              <div>
                <span className="panel-kicker">ACTIVE INVESTIGATION</span>
                <h2>ID-047</h2>
              </div>

              <span className="critical-badge">
                ● HIGH RISK
              </span>
            </div>

            <div className="risk-content">

              <div className="score-ring">
                <div className="score-inner">
                  <strong>91</strong>
                  <span>/100</span>
                  <small>RISK SCORE</small>
                </div>
              </div>

              <div className="risk-summary">

                <span className="summary-label">RECOMMENDED DECISION</span>

                <h3>BLOCK / REVIEW</h3>

                <p>
                  Multiple correlated signals indicate a significant
                  deviation from the identity's normal behaviour.
                </p>

                <div className="confidence">
                  <span>ANALYSIS CONFIDENCE</span>
                  <strong>92%</strong>
                </div>

                <div className="confidence-bar">
                  <div></div>
                </div>

              </div>

            </div>

            <div className="risk-footer">

              <div>
                <span>IDENTITY</span>
                <strong>ID-047</strong>
              </div>

              <div>
                <span>DEVICE</span>
                <strong>DEV-8841</strong>
              </div>

              <div>
                <span>IP ADDRESS</span>
                <strong>•••.•••.24.91</strong>
              </div>

              <div>
                <span>LOCATION</span>
                <strong>Bengaluru, IN</strong>
              </div>

            </div>

          </div>

          {/* THREAT SUMMARY */}
          <div className="threat-panel">

            <div className="panel-header">
              <div>
                <span className="panel-kicker">SIGNAL ANALYSIS</span>
                <h2>Why this score?</h2>
              </div>
            </div>

            <div className="signal-list">

              <div className="signal critical">
                <div className="signal-icon">!</div>
                <div>
                  <strong>Behaviour anomaly</strong>
                  <p>Significant deviation from baseline activity</p>
                </div>
                <b>+24</b>
              </div>

              <div className="signal high">
                <div className="signal-icon">↗</div>
                <div>
                  <strong>Suspicious IP</strong>
                  <p>Associated with multiple unusual events</p>
                </div>
                <b>+21</b>
              </div>

              <div className="signal high">
                <div className="signal-icon">⚡</div>
                <div>
                  <strong>Login velocity</strong>
                  <p>7 attempts detected within 90 seconds</p>
                </div>
                <b>+18</b>
              </div>

              <div className="signal medium">
                <div className="signal-icon">◇</div>
                <div>
                  <strong>New device</strong>
                  <p>Device has no previous identity association</p>
                </div>
                <b>+12</b>
              </div>

            </div>

          </div>

        </section>

        {/* STATS */}
        <section className="stats-row">

          <div className="metric">
            <span>IDENTITIES MONITORED</span>
            <strong>1,284</strong>
            <small>↑ 8.4% this week</small>
          </div>

          <div className="metric">
            <span>HIGH RISK IDENTITIES</span>
            <strong>17</strong>
            <small className="danger-text">↑ 3 requiring review</small>
          </div>

          <div className="metric">
            <span>UNDER INVESTIGATION</span>
            <strong>42</strong>
            <small>12 new today</small>
          </div>

          <div className="metric">
            <span>BLOCKED EVENTS</span>
            <strong>126</strong>
            <small>99.2% detection uptime</small>
          </div>

        </section>

        {/* RECENT CASES */}
        <section className="cases-section">

          <div className="section-title">
            <div>
              <span className="panel-kicker">INVESTIGATION QUEUE</span>
              <h2>Recent Risk Events</h2>
            </div>

            <button>View all investigations →</button>
          </div>

          <div className="cases-grid">

            <RiskCard
              id="ID-001"
              score={18}
              level="LOW"
              decision="ALLOW"
            />

            <RiskCard
              id="ID-025"
              score={56}
              level="MEDIUM"
              decision="CHALLENGE"
            />

            <RiskCard
              id="ID-047"
              score={91}
              level="HIGH"
              decision="BLOCK / REVIEW"
            />

          </div>

        </section>

        {/* RELATIONSHIP PREVIEW */}
        <section className="graph-preview">

          <div className="graph-heading">
            <div>
              <span className="panel-kicker">RELATIONSHIP INTELLIGENCE</span>
              <h2>Identity Connection Overview</h2>
            </div>

            <span className="graph-live">
              ● NETWORKX ANALYSIS
            </span>
          </div>

          <div className="graph-placeholder">

            <div className="graph-lines"></div>

            <div className="node center">
              <strong>ID-047</strong>
              <small>IDENTITY</small>
            </div>

            <div className="node node-one">
              <strong>DEV-8841</strong>
              <small>DEVICE</small>
            </div>

            <div className="node node-two">
              <strong>IP-24.91</strong>
              <small>IP ADDRESS</small>
            </div>

            <div className="node node-three">
              <strong>ID-025</strong>
              <small>IDENTITY</small>
            </div>

            <div className="graph-info">
              <strong>3 related entities</strong>
              <span>Relationship evidence detected</span>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;