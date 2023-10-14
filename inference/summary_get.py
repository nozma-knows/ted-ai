import requests
from marvin import ai_model, ChatCompletion
from pydantic import BaseModel
from typing import List


from transcription_get import get_transcription

# Variables
BASE_URL = "https://api.twelvelabs.io/v1.2"
api_key = "tlk_25RFF6T069MJFF286MZEM3GC5KRY"
index_id = "652afdd53c4a426cf3f4f541"
video_id = "652b180143e8c47e4eb48080"
data = {
    "video_id": video_id,
    "prompt": "with all of the information you have available, create a list of all scenes.."
}



# Send request
response = requests.post(f"{BASE_URL}/generate", json=data, headers={"x-api-key": api_key})

print (response.text)
print()
print()
print()
print()

class Scene(BaseModel):
    name: str
    description: str
    # time: str

@ai_model
class Scenes(BaseModel):
    '''Take into account the movie and the context when generating the scenes. Provide additional detail when possible.'''
    movie_name: str
    scene_list:List[Scene]

scenes = Scenes(response.text, movie_name="Iron Man")

print(scenes)

transcription = get_transcription(index_id, video_id)

video_name = "Iron Man"

system_prompt = f"""You will be given a list of shots in a video, and a transcription of the audio in the video. It is your job to map the shots in the video to timestamps in the video. The transcription will be a list of text and timestamps. The transcription audio is not something we have control over. The list of shots will be a list of descriptions of the visual imagery on screen. The goal is to find empty time slots, where no one is talking- and describe what is happening in the scene. Please output the timestamps and narration, where we can safely narrate. Please try and find time slots that are long enough for the human to narrate the given text.

Please supplement the descriptions with relevant details given the context of the video."""

user_prompt = f"""Video Name: {str(video_name)}
Video Length: 2 minutes, 21 seconds
Transcription: {str(transcription)}
Scene Description: {str(scenes)}"""

messages = [{'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': user_prompt}]

# Call gpt-3.5-turbo simply by specifying it inside of ChatCompletion.
openai = ChatCompletion('gpt-4').create(messages = messages)

print()
print()
print()
print()
print()
print(openai.response.choices[0].message.content)