from typing import Any
from anomaly_detector import calculate_anomaly_score


def calculate_risk(event: Any) -> dict:
    score = 0
    indicators = []
    reasons = []

    # ML behaviour anomaly
    anomaly_score = calculate_anomaly_score(event)

    # 1. New / suspicious device
    if event.deviceId.startswith("NEW-"):
        points = 20
        score += points

        indicators.append({
            "name": "NEW_DEVICE",
            "score": points,
            "severity": "MEDIUM",
            "evidence": (
                f"Device {event.deviceId} is not recognized for this identity."
            )
        })

        reasons.append(
            f"Unrecognized device detected ({event.deviceId})."
        )

    # 2. Unusual location
    if event.location.lower() in {"unknown", "high-risk", "unusual"}:
        points = 15
        score += points

        indicators.append({
            "name": "UNUSUAL_LOCATION",
            "score": points,
            "severity": "MEDIUM",
            "evidence": f"Login location reported as {event.location}."
        })

        reasons.append(
            f"Login originated from an unusual location ({event.location})."
        )

    # 3. Failed authentication attempts
    if event.failedLogins >= 3:
        points = min(event.failedLogins * 5, 25)
        score += points

        indicators.append({
            "name": "FAILED_AUTHENTICATION",
            "score": points,
            "severity": "HIGH",
            "evidence": f"{event.failedLogins} failed login attempts detected."
        })

        reasons.append(
            f"Multiple failed authentication attempts "
            f"({event.failedLogins}) detected."
        )

    # 4. High login velocity
    if event.loginVelocity >= 5:
        points = 15
        score += points

        indicators.append({
            "name": "HIGH_LOGIN_VELOCITY",
            "score": points,
            "severity": "HIGH",
            "evidence": (
                f"Login velocity is "
                f"{event.loginVelocity} attempts/minute."
            )
        })

        reasons.append(
            "Login activity is occurring at an unusually high velocity."
        )

    # 5. ML behaviour anomaly
    if anomaly_score >= 70:
        points = 20
        score += points

        indicators.append({
            "name": "BEHAVIOUR_ANOMALY",
            "score": points,
            "severity": "HIGH",
            "evidence": (
                "User behaviour differs significantly from "
                "the expected activity pattern."
            )
        })

        reasons.append(
            "Behaviour anomaly detected from login activity."
        )

    # Keep score within 0–100
    score = min(score, 100)

    # Risk classification
    if score >= 70:
        risk_level = "HIGH"
        decision = "BLOCK_REVIEW"
    elif score >= 40:
        risk_level = "MEDIUM"
        decision = "CHALLENGE_REVIEW"
    else:
        risk_level = "LOW"
        decision = "ALLOW"

    # Confidence based on number and severity of signals
    signal_count = len(indicators)

    if signal_count >= 4:
        confidence = 0.95
    elif signal_count == 3:
        confidence = 0.88
    elif signal_count == 2:
        confidence = 0.75
    elif signal_count == 1:
        confidence = 0.60
    else:
        confidence = 0.50

    # Increase confidence when multiple high-severity indicators exist
    high_severity_count = sum(
        1
        for indicator in indicators
        if indicator["severity"] == "HIGH"
    )

    if high_severity_count >= 2:
        confidence = min(confidence + 0.05, 0.99)

    return {
        "riskScore": score,
        "riskLevel": risk_level,
        "decision": decision,
        "confidence": confidence,
        "indicators": indicators,
        "reasons": reasons
    }