import pandas as pd


def process_csv(file_path: str) -> list:
    """
    Read structured investigation data from a CSV file
    and return it as a list of records.
    """

    df = pd.read_csv(file_path)

    # Remove completely empty rows
    df = df.dropna(how="all")

    # Replace missing values with empty strings
    df = df.fillna("")

    # Convert DataFrame into records for the AI pipeline
    records = df.to_dict(orient="records")

    return records