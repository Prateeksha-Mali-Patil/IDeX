def detect_suspicious_patterns(graph):
    """
    Detect simple suspicious patterns in the intelligence graph.
    """

    alerts = []

    # Pattern 1: highly connected entity
    for node in graph.nodes:
        degree = graph.degree(node)

        if degree >= 3:
            alerts.append({
                "pattern": "HIGHLY_CONNECTED_ENTITY",
                "entity": node,
                "severity": "MEDIUM",
                "reason": f"{node} is connected to {degree} other entities."
            })

    # Pattern 2: person connected to multiple organizations
    for node in graph.nodes:
        organization_count = 0

        for neighbor in graph.neighbors(node):
            relationship = graph[node][neighbor].get("relationship")

            if relationship == "CONNECTED_TO":
                organization_count += 1

        if organization_count >= 2:
            alerts.append({
                "pattern": "MULTIPLE_ORGANIZATION_CONNECTIONS",
                "entity": node,
                "severity": "HIGH",
                "reason": (
                    f"{node} is connected to "
                    f"{organization_count} organizations."
                )
            })

    return alerts