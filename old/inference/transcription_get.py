import requests
from dotenv import load_dotenv
import os

def get_transcription(index_id, video_id):
    load_dotenv()

    API_KEY='tlk_25RFF6T069MJFF286MZEM3GC5KRY'
    headers = {
        "accept": "application/json",
        "x-api-key":API_KEY,
        "Content-Type": "application/json"
    }

    url = f"https://api.twelvelabs.io/v1.1/indexes/{index_id}/videos/{video_id}/transcription"

    response = requests.get(url, headers=headers)

    return response.text

# Usage
# index_id = "652afdd53c4a426cf3f4f541"
# video_id = "652afe5a43e8c47e4eb48057"
# print(get_transcription(index_id, video_id))