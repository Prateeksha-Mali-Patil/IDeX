def build_relationships(entities: dict) -> list:
    """
    Build simple relationships between extracted entities.
    """

    relationships = []

    people = entities.get("PERSON", [])
    locations = entities.get("LOCATION", [])
    organizations = entities.get("ORGANIZATION", [])
    phones = entities.get("PHONE", [])
    vehicles = entities.get("VEHICLE", [])
    cases = entities.get("FIR_CASE_ID", [])
    money = entities.get("MONEY", [])

    for person in people:
        for location in locations:
            relationships.append({
                "source": person,
                "relationship": "LOCATED_AT",
                "target": location
            })

        for phone in phones:
            relationships.append({
                "source": person,
                "relationship": "ASSOCIATED_WITH",
                "target": phone
            })

        for vehicle in vehicles:
            relationships.append({
                "source": person,
                "relationship": "ASSOCIATED_WITH",
                "target": vehicle
            })

        for organization in organizations:
            relationships.append({
                "source": person,
                "relationship": "CONNECTED_TO",
                "target": organization
            })

        for case in cases:
            relationships.append({
                "source": person,
                "relationship": "MENTIONED_IN",
                "target": case
            })

        for amount in money:
            relationships.append({
                "source": person,
                "relationship": "ASSOCIATED_WITH",
                "target": amount
            })

    return relationships