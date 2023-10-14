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

index_id = "6527128823c1347ffbe3a2b7"
video_id = "65271b4c43e8c47e4eb47cc5"

url = f"https://api.twelvelabs.io/v1.1/indexes/{index_id}/videos/{video_id}/transcription"


response = requests.get(url, headers=headers)

print(response.text)