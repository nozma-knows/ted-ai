import json
import requests
from marvin import ai_fn, ai_model, ChatCompletion, settings, openai
from pydantic import BaseModel, Field
from typing import Dict, List

settings.llm_model = "openai/gpt-4"


def generate_scene(video_id: str) -> Dict:
    # Variables
    BASE_URL = "https://api.twelvelabs.io/v1.2"
    api_key = "tlk_25RFF6T069MJFF286MZEM3GC5KRY"
    index_id = "652b5c043c4a426cf3f4fa29"
    data = {
        "video_id": video_id,
        "prompt": "describe this video to a professional storyteller so they can make an anime out of it",
    }

    response = requests.post(
        f"{BASE_URL}/generate", json=data, headers={"x-api-key": api_key}
    )
    return response.json()


class Character(BaseModel):
    name: str = Field(description="The name of the character.")
    description: str = Field(description="A description of the character.")
    imagery: str = Field(description="A description of the character's appearance.")
    personality: str = Field(
        description="A description of the character's personality."
    )


@ai_model
class Scene(BaseModel):
    """Create a dynamic scene and a list of relevant characters"""

    name: str = Field(description="The name of the scene.")
    imagery: str = Field(description="A description of the setting of the scene.")
    music: str = Field(
        description="A description of the music that plays in the scene."
    )
    plot: str = Field(
        description="An imaginary plot, based on the original but changed for dramatic effect. The plot should draw from anime storytelling conventions and be engaging for the user. Be creative! Make sure to use events, characters and settings from the original video whenever possible!"
    )
    characters: List[Character] = Field(
        description="An imaginative description of characters that could be in the scene. We will be generating an imaginary anime using these characters, that will be an interactive story. Please make sure that there are suitable characters for such an imaginary story. Inventing characters that make sense in the scene is OK. Please make sure that the characters are represented by humans or humanoids and avoid anthropomorphized animals or objects."
    )
    prompts: List[str] = []


class ScenePrompt(BaseModel):
    text: str = Field(description="the prompt for the scenes.")


async def generate_scene_prompts(scene: Scene):
    # Define the initial message
    initial_message = {
        "role": "system",
        "content": f"""
        plot: {scene.plot}

Create the initial scene for the prompt, so that we can set the tone for the rest of the story. The scene should be a visual description of the start of the story

describe each scene concisely in 1-2 sentences using active voice and descriptive language to generate an image accurately with stable diffusion""",
    }

    # Initialize the messages list
    messages = [initial_message]

    # Generate a new character
    response = openai.ChatCompletion().create(
        messages=messages, response_model=ScenePrompt
    )
    model = response.to_model()

    return [model.text]


async def vid2scene(video_id: str) -> Scene:
    desc_from_twelve_labs = generate_scene(video_id)
    s = Scene(str(desc_from_twelve_labs))

    s.prompts = await generate_scene_prompts(s)

    return s


space_x = "652b5c1b43e8c47e4eb4829b"
# print(vid2scene(space_x))
