import json
import os
from pathlib import Path

import requests


def main():
    api_key = os.environ["SERP_API_KEY"]
    scholar_id = os.environ["GOOGLE_SCHOLAR_ID"]

    response = requests.get(
        "https://serpapi.com/search.json",
        params={
            "engine": "google_scholar_author",
            "author_id": scholar_id,
            "api_key": api_key,
        },
        timeout=30,
    )
    response.raise_for_status()

    data = response.json()
    citation_count = data["cited_by"]["table"][0]["citations"]["all"]
    shields_data = {
        "schemaVersion": 1,
        "label": "Google Scholar",
        "message": str(citation_count),
        "color": "critical",
    }

    results_dir = Path(__file__).resolve().parent / "results"
    results_dir.mkdir(parents=True, exist_ok=True)
    output_path = results_dir / "gs_data_shieldsio.json"
    output_path.write_text(
        json.dumps(shields_data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
