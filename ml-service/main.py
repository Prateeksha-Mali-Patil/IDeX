from fastapi import FastAPI
from pydantic import BaseModel
from risk_engine import calculate_risk


app = FastAPI(
    title="IDeX Detection Intelligence API",
    description="ML-powered digital identity fraud and synthetic identity risk detection",
    version="1.0.0"
)


class SecurityEvent(BaseModel):
    eventId: str
    userId: str
    timestamp: str
    ip: str
    deviceId: str
    location: str
    failedLogins: int
    loginVelocity: float
    userAgent: str


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "IDeX Detection Intelligence",
        "version": "1.0.0"
    }


@app.post("/analyze")
def analyze_event(event: SecurityEvent):
    result = calculate_risk(event)

    return {
        "eventId": event.eventId,
        "userId": event.userId,
        **result
    }