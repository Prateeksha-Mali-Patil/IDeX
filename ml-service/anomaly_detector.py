import pandas as pd
from sklearn.ensemble import IsolationForest


# Normal login behaviour baseline
NORMAL_ACTIVITY = [
    {"failedLogins": 0, "loginVelocity": 1},
    {"failedLogins": 0, "loginVelocity": 2},
    {"failedLogins": 1, "loginVelocity": 1},
    {"failedLogins": 0, "loginVelocity": 3},
    {"failedLogins": 1, "loginVelocity": 2},
    {"failedLogins": 0, "loginVelocity": 2},
    {"failedLogins": 1, "loginVelocity": 3},
    {"failedLogins": 0, "loginVelocity": 1},
    {"failedLogins": 2, "loginVelocity": 2},
    {"failedLogins": 0, "loginVelocity": 3},
]


def calculate_anomaly_score(event):
    baseline = pd.DataFrame(NORMAL_ACTIVITY)

    current_event = pd.DataFrame([{
        "failedLogins": event.failedLogins,
        "loginVelocity": event.loginVelocity
    }])

    model = IsolationForest(
        n_estimators=100,
        contamination=0.1,
        random_state=42
    )

    model.fit(baseline)

    prediction = model.predict(current_event)[0]

    if prediction == -1:
        return 80

    return 20