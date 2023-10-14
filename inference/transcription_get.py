import requests
from dotenv import load_dotenv
load_dotenv()
import os


API_KEY='tlk_2A5WBRE14TGGV921MJSR40MNXM7J'
headers = {
    "accept": "application/json",
    "x-api-key":API_KEY,
    "Content-Type": "application/json"
}

index_id = "652793eb23c1347ffbe3a398"
video_id = "6527d45f43e8c47e4eb47dee"

url = f"https://api.twelvelabs.io/v1.1/indexes/{index_id}/videos/{video_id}/transcription"


response = requests.get(url, headers=headers)

print(response.text)