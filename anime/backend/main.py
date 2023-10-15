from fastapi import FastAPI
from typing import Dict, List
from summary_get import Character, vid2scene, Scene
from marvin import openai
from pydantic import BaseModel, Field
from demo_scene import scene_to_text


# Define the Panel model
class Panel(BaseModel):
    character: str = Field(description="The character name who is speaking.")
    text: str = Field(
        description="The short text the character is speaking. The character"
    )


# Define the function to convert a Panel to a string
def panel_to_string(panel: Panel) -> str:
    return f"{panel.character}: {panel.text}"


# Initialize the chat history
chat_history = []

# Initialize the FastAPI app
app = FastAPI()

# Initialize the scene
# scene = {
#     "response": {
#         "name": "Rockets' Ascend",
#         "imagery": "The scene unfolds at a vast rocket launch site, with a crowd gathered in anticipation. The sky is clear, with the sun glistening in the backdrop, creating a dramatic contrast with the towering rockets ready for lift-off. Television screens and livestreams across the globe echo the excitement and tension.",
#         "music": "The music is an orchestra of anticipation and adventure, mixing the sounds of escalating violins and drums with the occasional crescendos of horns to highlight the rockets' ascend.",
#         "plot": "In a futuristic world, where space exploration has become a spectator sport, different factions compete in launching rockets, the most prominent being SpaceX with their Starship and Falcon 9. Each launch is a high-stakes game, with not just the teams but the whole world watching. The story revolves around these launches, the rivalries, the triumphs and the failures, and the dreams of reaching the stars.",
#         "characters": [
#             {
#                 "name": "Captain Blast",
#                 "description": "A veteran astronaut and the charismatic leader of the SpaceX team.",
#                 "imagery": "Donning a sleek silver flight suit with the SpaceX logo, he embodies ambition and courage.",
#                 "personality": "Determined, charismatic, and always eager to push the boundaries of space exploration."
#             },
#             {
#                 "name": "Nova",
#                 "description": "A young genius engineer responsible for designing the rockets.",
#                 "imagery": "With her blueprint-covered overalls and ever-present clipboard, she's the brain behind the rockets.",
#                 "personality": "Intelligent, meticulous, and passionate about her creations reaching the stars."
#             }
#         ]
#     }
# }

scene = Scene(
    name="Rockets' Ascend",
    imagery="The scene unfolds at a vast rocket launch site, with a crowd gathered in anticipation. The sky is clear, with the sun glistening in the backdrop, creating a dramatic contrast with the towering rockets ready for lift-off. Television screens and livestreams across the globe echo the excitement and tension.",
    music="The music is an orchestra of anticipation and adventure, mixing the sounds of escalating violins and drums with the occasional crescendos of horns to highlight the rockets' ascend.",
    plot="In a futuristic world, where space exploration has become a spectator sport, different factions compete in launching rockets, the most prominent being SpaceX with their Starship and Falcon 9. Each launch is a high-stakes game, with not just the teams but the whole world watching. The story revolves around these launches, the rivalries, the triumphs and the failures, and the dreams of reaching the stars.",
    characters=[
        Character(
            name="Captain Blast",
            description="A veteran astronaut and the charismatic leader of the SpaceX team.",
            imagery="Donning a sleek silver flight suit with the SpaceX logo, he embodies ambition and courage.",
            personality="Determined, charismatic, and always eager to push the boundaries of space exploration.",
        ),
        Character(
            name="Nova",
            description="A young genius engineer responsible for designing the rockets.",
            imagery="With her blueprint-covered overalls and ever-present clipboard, she's the brain behind the rockets.",
            personality="Intelligent, meticulous, and passionate about her creations reaching the stars.",
        ),
    ],
)


@app.get("/next_panel/")
async def send_message():
    # Define the initial message
    initial_message = {
        "role": "system",
        "content": f"""You are generating panels for a manga! Each manga panel should be short and engaging. The goal of the manga is to tell an interactive story. Please make sure to keep the story consistent and engaging. You should send messages for different characters depending on the current action of the scene. It should unfold in an interesting and engaging way to the user. Make sure that one character doesn't speak more than 4 times in a row. There should be scenematic action unfolding in an engaging, Manga way. There's no such thing as overdramatic in Manga! Be creative and keep all the characters engaged!

We have generated drawings for the characters, so it is very important that you may not invent new characters, use only the characters listed, with the names written exactly how they are listed.
""",
    }

    # Define the scene message
    scene_message = {"role": "user", "content": scene_to_text(scene)}

    # Initialize the messages list
    messages = [initial_message, scene_message] + chat_history

    # Generate a new panel
    response = openai.ChatCompletion().create(messages=messages, response_model=Panel)
    model = response.to_model()

    # Append the new panel to the chat history
    new_message = {"role": "assistant", "content": panel_to_string(model)}
    chat_history.append(new_message)

    return {"response": model}


@app.get("/get_history/")
async def get_history():
    return chat_history


class UserInput(BaseModel):
    name: str = Field(description="The name of the user.")
    description: str = Field(description="A description of the user.")


@app.post("/generate_user_character/")
async def generate_user_character(user_input: UserInput):
    global scene
    if scene is None:
        return {"response": "Please generate a scene first.", "error": True}
    # Define the initial message
    initial_message = {
        "role": "system",
        "content": "You are generating a new character for a manga! This character should be unique and fit into the existing story.",
    }

    # Define the user message
    user_message = {
        "role": "user",
        "content": f"The user, {user_input.name}, is described as {user_input.description}.",
    }

    # Initialize the messages list
    messages = [initial_message, user_message]

    # Generate a new character
    response = openai.ChatCompletion().create(
        messages=messages, response_model=Character
    )
    model = response.to_model()

    # Append the generated character to the scene's characters list
    scene.characters.append(model)

    return {"response": model}


class VideoInput(BaseModel):
    video_id: str = Field(description="The ID of the video.")


@app.post("/generate_scene/")
async def generate_scene(video_input: VideoInput):
    # Call the vid2scene method with the video_id from the request body
    global scene
    scene = vid2scene(video_input.video_id)

    # Return the Scene object
    return {"response": scene}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
