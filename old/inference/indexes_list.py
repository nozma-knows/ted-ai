import requests
from dotenv import load_dotenv
load_dotenv()
import os


API_KEY=os.getenv("TWELVE_LABS_API_KEY")
headers = {
    "accept": "application/json",
    "x-api-key":API_KEY,
    "Content-Type": "application/json"
}

url = "https://api.twelvelabs.io/v1.1/indexes?page=1&page_limit=10&sort_by=created_at&sort_option=desc"


response = requests.get(url, headers=headers)

print(response.text)