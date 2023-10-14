import requests
from dotenv import load_dotenv
load_dotenv()
import os
API_KEY='tlk_2A5WBRE14TGGV921MJSR40MNXM7J'

headers = {
    "accept": "application/json",
    "Content-Type": "application/json",
    "x-api-key":API_KEY,
}


index_id = "6527128823c1347ffbe3a2b7"

url = f'https://api.twelvelabs.io/v1.1/indexes/{index_id}/videos?page=1&page_limit=10&sort_by=created_at&sort_option=desc'


headers = {
    "accept": "application/json",
    "x-api-key": "tlk_2A5WBRE14TGGV921MJSR40MNXM7J",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)

print(response.text)