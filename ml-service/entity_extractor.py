import re
import spacy


# Load spaCy English model
nlp = spacy.load("en_core_web_sm")


def extract_entities(text: str) -> dict:
    """
    Extract important entities from investigation text.
    """

    doc = nlp(text)

    entities = {
        "PERSON": [],
        "LOCATION": [],
        "ORGANIZATION": [],
        "PHONE": [],
        "VEHICLE": [],
        "FIR_CASE_ID": [],
        "MONEY": []
    }

    # spaCy entities
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            entities["PERSON"].append(ent.text)

        elif ent.label_ in {"GPE", "LOC"}:
            entities["LOCATION"].append(ent.text)

        elif ent.label_ == "ORG":
            entities["ORGANIZATION"].append(ent.text)

    # Phone numbers
    phone_pattern = r"\b(?:\+91[-\s]?)?[6-9]\d{9}\b"
    entities["PHONE"].extend(re.findall(phone_pattern, text))

    # Indian vehicle registration numbers
    vehicle_pattern = r"\b[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,3}\s?\d{4}\b"
    entities["VEHICLE"].extend(
        re.findall(vehicle_pattern, text, re.IGNORECASE)
    )

    # FIR / Case IDs
    case_pattern = r"\b(?:FIR|CASE)[-\s]?\d{1,6}(?:/\d{2,4})?\b"
    entities["FIR_CASE_ID"].extend(
        re.findall(case_pattern, text, re.IGNORECASE)
    )

    # Money amounts
    money_pattern = r"(?:₹|Rs\.?|INR)\s?\d+(?:,\d{2,3})*(?:\.\d{1,2})?"
    entities["MONEY"].extend(
        re.findall(money_pattern, text, re.IGNORECASE)
    )

    # Remove duplicates while preserving order
    for key in entities:
        entities[key] = list(dict.fromkeys(entities[key]))

    return entities