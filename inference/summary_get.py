import requests
from marvin import ai_model
from pydantic import BaseModel
from typing import List

# Variables
BASE_URL = "https://api.twelvelabs.io/v1.2"
api_key = "tlk_25RFF6T069MJFF286MZEM3GC5KRY"
data = {
    "video_id": "652afe5a43e8c47e4eb48057",
    "prompt": "describe each scene in this video in a bulleted list"
}

# Send request
response = requests.post(f"{BASE_URL}/generate", json=data, headers={"x-api-key": api_key})

print (response.text)

class Scene(BaseModel):
    name: str
    description: str

@ai_model
class Scenes(BaseModel):
    scene_list:List[Scene]

scenes = Scenes(response.text)

print(scenes)