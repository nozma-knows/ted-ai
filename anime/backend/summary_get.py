import json
import requests
from marvin import ai_fn, ai_model, ChatCompletion, settings
from pydantic import BaseModel
from typing import Dict, List

settings.llm_model="openai/gpt-4"

def generate_scene(video_id: str) -> Dict:
    # Variables
    BASE_URL = "https://api.twelvelabs.io/v1.2"
    api_key = "tlk_25RFF6T069MJFF286MZEM3GC5KRY"
    index_id = "652b5c043c4a426cf3f4fa29"
    data = {
        "video_id": video_id,
        "prompt": "describe this video to a professional storyteller so they can make an anime out of it",
    }

    response = requests.post(f"{BASE_URL}/generate", json=data, headers={"x-api-key": api_key})
    return response.json()


@ai_model
class Scene(BaseModel):
    '''Create a dynamic scene and a list of relevant characters '''

    characters: List[str]
    imagery: str
    plot: str

def vid2scene(video_id: str) -> List[Scene]:
    desc_from_twelve_labs = generate_scene(video_id)
    Scene(str(desc_from_twelve_labs))