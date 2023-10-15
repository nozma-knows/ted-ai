from marvin import openai
from typing import Literal
from pydantic import BaseModel, Field
from demo_scene import scene_text

class Panel(BaseModel):
    character: str = Field(..., description="The character name who is speaking.")
    text: str = Field(..., description="The short text the character is speaking. The character")

def panel_to_string(panel: Panel) -> str:
    return f"{panel.character}: {panel.text}"

initial_message = {
    'role': 'system',
    'content': f'''You are generating panels for a manga! Each manga panel should be short and engaging. The goal of the manga is to tell an interactive story. Please make sure to keep the story consistent and engaging. You should send messages for different characters depending on the current action of the scene. It should unfold in an interesting and engaging way to the user. Make sure that one character doesn't speak more than 4 times in a row. There should be scenematic action unfolding in an engaging, Manga way. There's no such thing as overdramatic in Manga! Be creative and keep all the characters engaged!
'''
}

scene_message = {
    'role': 'user',
    'content': scene_text
}

messages = [initial_message, scene_message]

for i in range(0,10):
    response = openai.ChatCompletion().create(
        messages=messages,
        response_model = Panel
    )
    model = response.to_model()
    new_message = {
        'role': 'assistant',
        'content': panel_to_string(model)
    }
    messages = messages + [new_message]
    print(model)