import { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";

function RelationshipGraph() {
  const graphRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (!graphRef.current) return;

    const cy = cytoscape({
      container: graphRef.current,

      elements: [
        {
          data: {
            id: "identity",
            label: "ID-047",
            type: "IDENTITY",
          },
        },
        {
          data: {
            id: "device",
            label: "DEV-8841",
            type: "DEVICE",
          },
        },
        {
          data: {
            id: "ip",
            label: "IP-24.91",
            type: "IP ADDRESS",
          },
        },
        {
          data: {
            id: "related",
            label: "ID-025",
            type: "RELATED IDENTITY",
          },
        },

        {
          data: {
            id: "edge1",
            source: "identity",
            target: "device",
          },
        },
        {
          data: {
            id: "edge2",
            source: "identity",
            target: "ip",
          },
        },
        {
          data: {
            id: "edge3",
            source: "identity",
            target: "related",
          },
        },
      ],

      style: [
        {
          selector: "node",
          style: {
            "background-color": "#0d1622",
            "border-width": 1,
            "border-color": "#30445c",
            color: "#e8edf5",
            label: "data(label)",
            "font-size": "11px",
            "text-valign": "center",
            "text-halign": "center",
            width: 75,
            height: 75,
            "text-wrap": "wrap",
          },
        },

        {
          selector: "#identity",
          style: {
            "background-color": "#351015",
            "border-color": "#ff4f56",
            "border-width": 2,
            width: 95,
            height: 95,
            "font-size": "13px",
            color: "#ffffff",
          },
        },

        {
          selector: "#device",
          style: {
            "border-color": "#3b82f6",
          },
        },

        {
          selector: "#ip",
          style: {
            "border-color": "#ffbe46",
          },
        },

        {
          selector: "#related",
          style: {
            "border-color": "#a855f7",
          },
        },

        {
          selector: "edge",
          style: {
            width: 1.5,
            "line-color": "#34465d",
            "curve-style": "bezier",
          },
        },

        {
          selector: ":selected",
          style: {
            "border-width": 3,
            "border-color": "#ffffff",
          },
        },
      ],

      layout: {
        name: "cose",
        animate: true,
        padding: 50,
      },
    });

    // NODE CLICK
    cy.on("tap", "node", (event) => {
      const node = event.target;

      setSelectedNode({
        label: node.data("label"),
        type: node.data("type"),
      });
    });

    return () => {
      cy.destroy();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "360px" }}>

      {/* GRAPH */}
      <div
        ref={graphRef}
        style={{
          width: "100%",
          height: "360px",
        }}
      />

      {/* SELECTED NODE PANEL */}
      {selectedNode && (
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            width: "190px",
            padding: "16px",
            background: "#0b111a",
            border: "1px solid #26364a",
            borderRadius: "10px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            color: "#e8edf5",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "1.5px",
              color: "#7f91a8",
              marginBottom: "7px",
            }}
          >
            SELECTED ENTITY
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              marginBottom: "5px",
            }}
          >
            {selectedNode.label}
          </div>

          <div
            style={{
              fontSize: "11px",
              color: "#8ea1b8",
            }}
          >
            {selectedNode.type}
          </div>
        </div>
      )}

    </div>
  );
}

export default RelationshipGraph;