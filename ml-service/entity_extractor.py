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
        "VEHICLE": []
    }

    # spaCy entities
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            entities["PERSON"].append(ent.text)

        elif ent.label_ in {"GPE", "LOC"}:
            entities["LOCATION"].append(ent.text)

        elif ent.label_ == "ORG":
            entities["ORGANIZATION"].append(ent.text)

    # Phone number detection using Regex
    phone_pattern = r"\b(?:\+91[-\s]?)?[6-9]\d{9}\b"

    phones = re.findall(phone_pattern, text)

    entities["PHONE"].extend(phones)

    # Remove duplicates while preserving order
    for key in entities:
        entities[key] = list(dict.fromkeys(entities[key]))

    return entities