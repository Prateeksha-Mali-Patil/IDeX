import "../App.css";
import RelationshipGraph from "../components/RelationshipGraph";

function Investigation() {
  return (
    <div className="investigation-page">

      {/* TOP BAR */}
      <div className="investigation-topbar">
        <div>
          <span className="eyebrow">
            SECURITY / INVESTIGATION
          </span>

          <h1>Identity Investigation</h1>
        </div>

        <div className="investigation-status">
          <span className="status-dot"></span>
          LIVE ANALYSIS
        </div>
      </div>


      {/* IDENTITY HEADER */}
      <div className="investigation-header">

        <div>
          <span className="eyebrow">
            IDENTITY UNDER REVIEW
          </span>

          <h2>ID-047</h2>

          <p>
            Identity risk investigation and correlated activity analysis
          </p>
        </div>


        <div className="investigation-risk">
          <span>HIGH RISK</span>

          <strong>91</strong>

          <small>/100</small>
        </div>

      </div>


      {/* DECISION */}
      <div className="decision-banner">

        <div>
          <span className="eyebrow">
            RECOMMENDED DECISION
          </span>

          <h2>BLOCK / REVIEW</h2>
        </div>


        <div className="confidence">

          <span>
            ANALYSIS CONFIDENCE
          </span>

          <strong>
            92%
          </strong>

        </div>

      </div>


      {/* INFORMATION GRID */}
      <div className="investigation-grid">

        <div className="investigation-card">

          <span className="eyebrow">
            IDENTITY
          </span>

          <h3>
            ID-047
          </h3>

          <p>
            Primary identity under investigation
          </p>

        </div>


        <div className="investigation-card">

          <span className="eyebrow">
            DEVICE
          </span>

          <h3>
            DEV-8841
          </h3>

          <p>
            New device association detected
          </p>

        </div>


        <div className="investigation-card">

          <span className="eyebrow">
            IP ADDRESS
          </span>

          <h3>
            •••.•••.24.91
          </h3>

          <p>
            Associated with unusual events
          </p>

        </div>


        <div className="investigation-card">

          <span className="eyebrow">
            LOCATION
          </span>

          <h3>
            Bengaluru, IN
          </h3>

          <p>
            Current event location
          </p>

        </div>

      </div>


      {/* SIGNAL ANALYSIS */}
      <div className="evidence-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              DETECTION ENGINE
            </span>

            <h2>
              Evidence & Signal Analysis
            </h2>

          </div>

        </div>


        <div className="evidence-list">

          <div className="evidence-row">

            <div className="evidence-icon danger">
              !
            </div>

            <div>

              <strong>
                Behaviour anomaly
              </strong>

              <p>
                Significant deviation from baseline activity
              </p>

            </div>

            <strong className="evidence-score">
              +24
            </strong>

          </div>


          <div className="evidence-row">

            <div className="evidence-icon danger">
              ↗
            </div>

            <div>

              <strong>
                Suspicious IP
              </strong>

              <p>
                Associated with multiple unusual events
              </p>

            </div>

            <strong className="evidence-score">
              +21
            </strong>

          </div>


          <div className="evidence-row">

            <div className="evidence-icon warning">
              ϟ
            </div>

            <div>

              <strong>
                Login velocity
              </strong>

              <p>
                7 attempts detected within 90 seconds
              </p>

            </div>

            <strong className="evidence-score">
              +18
            </strong>

          </div>


          <div className="evidence-row">

            <div className="evidence-icon warning">
              ◇
            </div>

            <div>

              <strong>
                New device
              </strong>

              <p>
                Device has no previous identity association
              </p>

            </div>

            <strong className="evidence-score">
              +12
            </strong>

          </div>

        </div>

      </div>


      {/* TIMELINE */}
      <div className="timeline-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              EVENT HISTORY
            </span>

            <h2>
              Activity Timeline
            </h2>

          </div>

        </div>


        <div className="timeline">

          <div className="timeline-item">

            <span className="timeline-dot"></span>

            <div>

              <strong>
                Multiple login attempts detected
              </strong>

              <p>
                7 attempts within 90 seconds
              </p>

            </div>

            <time>
              12:04:21
            </time>

          </div>


          <div className="timeline-item">

            <span className="timeline-dot"></span>

            <div>

              <strong>
                New device observed
              </strong>

              <p>
                DEV-8841 linked to identity ID-047
              </p>

            </div>

            <time>
              12:03:48
            </time>

          </div>


          <div className="timeline-item">

            <span className="timeline-dot"></span>

            <div>

              <strong>
                Risk engine analysis completed
              </strong>

              <p>
                Risk score calculated as 91/100
              </p>

            </div>

            <time>
              12:03:12
            </time>

          </div>

        </div>

      </div>


      {/* RELATIONSHIP GRAPH */}
      <div className="graph-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              NETWORKX ANALYSIS
            </span>

            <h2>
              Identity Relationships
            </h2>

          </div>

          <span className="graph-label">
            RELATIONSHIP INTELLIGENCE
          </span>

        </div>


        <div className="graph-placeholder">

          <RelationshipGraph />

        </div>

      </div>

    </div>
  );
}

export default Investigation;