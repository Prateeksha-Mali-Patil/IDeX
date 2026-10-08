from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel

from risk_engine import calculate_risk
from entity_extractor import extract_entities
from relationship_builder import build_relationships
from graph_builder import build_graph, calculate_centrality
from suspicious_patterns import detect_suspicious_patterns


app = FastAPI(title="IDeX AI Service")


class Event(BaseModel):
    eventId: str
    userId: str
    timestamp: str
    ip: str
    deviceId: str
    location: str
    failedLogins: int
    loginVelocity: int
    userAgent: str
    text: Optional[str] = ""


@app.get("/")
def root():
    return {
        "service": "IDeX AI Service",
        "status": "running"
    }


@app.post("/analyze")
def analyze(event: Event):
    # 1. Risk analysis
    risk_result = calculate_risk(event)

    # 2. Build text for NLP entity extraction
    investigation_text = event.text or (
        f"User {event.userId} logged in from {event.location}. "
        f"Device {event.deviceId}. "
        f"IP address {event.ip}. "
        f"User agent {event.userAgent}."
    )

    # 3. Extract entities
    entities = extract_entities(investigation_text)

    # 4. Build relationships
    relationships = build_relationships(entities)

    # 5. Build intelligence graph
    graph = build_graph(relationships)

    # 6. Calculate entity importance
    centrality = calculate_centrality(graph)

    # 7. Detect suspicious graph patterns
    suspicious_patterns = detect_suspicious_patterns(graph)

    # 8. Return complete AI result
    return {
        **risk_result,
        "entities": entities,
        "relationships": relationships,
        "centrality": centrality,
        "suspiciousPatterns": suspicious_patterns
    }