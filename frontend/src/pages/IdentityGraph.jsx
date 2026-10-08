import { useEffect, useState } from "react";
import { getIdentity } from "../services/api";

function IdentityGraph({ identityId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIdentity = async () => {
      try {
        setLoading(true);
        const result = await getIdentity(identityId);
        setData(result);
      } catch (error) {
        console.error("Failed to load graph data:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (identityId) {
      loadIdentity();
    }
  }, [identityId]);

  if (loading) {
    return (
      <div className="console-content">
        <h1>Loading Identity Graph...</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="console-content">
        <h1>Identity Graph</h1>
        <p>Unable to load identity data.</p>
      </div>
    );
  }

  const device = data.devices?.[0]?.device?.id || "N/A";
  const ip = data.ips?.[0]?.ip?.address || "N/A";
  const relationships = data.relationships || [];

  return (
    <div className="console-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">NETWORK ANALYSIS</p>

          <h1>Identity Graph</h1>

          <p className="page-subtitle">
            Relationship network for <strong>{data.id}</strong>
          </p>
        </div>
      </div>

      {/* GRAPH */}
      <div className="identity-graph-container">

        <svg
          className="identity-graph-lines"
          viewBox="0 0 1000 520"
          preserveAspectRatio="none"
        >
          {/* Identity → Device */}
          <line
            x1="500"
            y1="260"
            x2="220"
            y2="120"
          />

          {/* Identity → IP */}
          <line
            x1="500"
            y1="260"
            x2="780"
            y2="120"
          />

          {/* Identity → Related identity 1 */}
          {relationships[0] && (
            <line
              x1="500"
              y1="260"
              x2="220"
              y2="400"
            />
          )}

          {/* Identity → Related identity 2 */}
          {relationships[1] && (
            <line
              x1="500"
              y1="260"
              x2="780"
              y2="400"
            />
          )}
        </svg>

        {/* CENTER IDENTITY */}
        <div className="graph-node graph-center">
          <span className="graph-node-type">IDENTITY</span>
          <strong>{data.id}</strong>
          <small>PRIMARY IDENTITY</small>
        </div>

        {/* DEVICE */}
        <div className="graph-node graph-device">
          <span className="graph-node-type">DEVICE</span>
          <strong>{device}</strong>
          <small>CONNECTED DEVICE</small>
        </div>

        {/* IP */}
        <div className="graph-node graph-ip">
          <span className="graph-node-type">IP ADDRESS</span>
          <strong>{ip}</strong>
          <small>NETWORK ADDRESS</small>
        </div>

        {/* RELATIONSHIP 1 */}
        {relationships[0] && (
          <div className="graph-node graph-related-one">
            <span className="graph-node-type">
              {relationships[0].relationshipType}
            </span>

            <strong>{relationships[0].relatedId}</strong>

            <small>
              WEIGHT {relationships[0].weight}
            </small>
          </div>
        )}

        {/* RELATIONSHIP 2 */}
        {relationships[1] && (
          <div className="graph-node graph-related-two">
            <span className="graph-node-type">
              {relationships[1].relationshipType}
            </span>

            <strong>{relationships[1].relatedId}</strong>

            <small>
              WEIGHT {relationships[1].weight}
            </small>
          </div>
        )}
      </div>

      {/* LEGEND */}
      <div className="graph-legend">
        <div>
          <span className="legend-dot identity"></span>
          Identity
        </div>

        <div>
          <span className="legend-dot device"></span>
          Device
        </div>

        <div>
          <span className="legend-dot network"></span>
          IP Address
        </div>

        <div>
          <span className="legend-dot related"></span>
          Related Identity
        </div>
      </div>

      {/* RELATIONSHIP DETAILS */}
      <div className="dashboard-section">
        <div className="section-title">
          <h2>Relationship Details</h2>
          <span>{relationships.length} NETWORK LINKS</span>
        </div>

        <div className="investigation-indicators">
          {relationships.length > 0 ? (
            relationships.map((relationship) => (
              <div
                className="investigation-indicator"
                key={relationship.id}
              >
                <div className="indicator-top">
                  <h3>{relationship.relatedId}</h3>

                  <span className="severity medium">
                    {relationship.relationshipType}
                  </span>
                </div>

                <p>
                  Connected to {data.id} through{" "}
                  {relationship.relationshipType
                    .replaceAll("_", " ")
                    .toLowerCase()}
                  .
                </p>

                <small>
                  Relationship strength: +{relationship.weight}
                </small>
              </div>
            ))
          ) : (
            <div className="investigation-indicator">
              <h3>No connected identities</h3>

              <p>
                No relationships were found for this identity.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IdentityGraph;