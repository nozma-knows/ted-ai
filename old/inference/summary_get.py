import json
import requests
from marvin import ai_fn, ai_model, ChatCompletion, settings
from pydantic import BaseModel
from typing import Dict, List

settings.llm_model="openai/gpt-4"
from transcription_get import get_transcription

# Variables
BASE_URL = "https://api.twelvelabs.io/v1.2"
api_key = "tlk_25RFF6T069MJFF286MZEM3GC5KRY"
index_id = "652afdd53c4a426cf3f4f541"
video_id = "652b2d8b43e8c47e4eb4818a"
data = {
    "video_id": video_id,
    "prompt": "with all of the information you have available, create a list of all scenes.."
}


class Shot(BaseModel):
    subject: str
    description: str
    # time: str

@ai_model
class Scene(BaseModel):
    '''Take into account the movie and the context when generating the scenes. Provide additional detail when possible.'''
    movie_name: str
    shot_list:List[Shot]

@ai_fn
def describe_shot_with_character_name(scene: Scene, context: str ) -> str:
    '''Describe the shot.'''
    pass

    
# Send request
if __name__ == "__main__":
    response = requests.post(f"{BASE_URL}/generate", json=data, headers={"x-api-key": api_key})

    print (response.text)
    print()
    print()
    print()
    print()





    scenes = Scene(response.text, movie_name="Ferris Bueller's Day Off")

    print(scenes)

    with open('scenes.json', "w") as file:
        json.dump(scenes.model_dump_json(), file, indent=4)

    # for scene in scenes.shot_list:
    #     rewritten_scene = describe_shot_with_character_name(scene, "The movie is Ferris Bueller's day off.")
    #     print(rewritten_scene)


    # print(scenes)
    # print()
    # print()
    # print()
    # print()
    # print(characters)

    # transcription = get_transcription(index_id, video_id)

    # # Call gpt-3.5-turbo simply by specifying it inside of ChatCompletion.
    # openai = ChatCompletion('gpt-4').create(messages = messages)

    # print()
    # print()
    # print()
    # print()
    # print()
    # print(openai.response.choices[0].message.content)