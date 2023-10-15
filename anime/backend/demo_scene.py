from typing import Dict, List
from summary_get import Character
from summary_get import vid2scene, Scene
from fastapi import FastAPI
scene = Scene(
    name='Rocket Launch Chronicles', 
    imagery="A vast expanse of sky and earth, punctuated by the towering forms of SpaceX's Falcon 9 and Starship rockets. On the ground, a sea of excited spectators eagerly awaiting the moment of launch.",
      plot="In a world where space exploration is the pinnacle of human achievement, SpaceX's Starship and Falcon 9 rockets play a crucial role. Each launch represents a thrilling and high-stakes mission, with the fate of humanity's future in space hanging in the balance. The story unfolds through the eyes of a young narrator, who guides the audience through the intricacies of each launch, the technology of the rockets, and the significance of their missions. As the series progresses, the narrator becomes more involved in the launches, moving from observer to participant in these historic moments.",
      characters=[Character(name='The Narrator', description='A charismatic young individual with a deep understanding of space exploration and technology.', imagery='A young character, always seen with a rocket launch blueprint or a book about space. Wears casual attire with a SpaceX logo.', personality='Inquisitive, knowledgeable, and passionate about space exploration. Has a knack for breaking down complex information in an engaging and accessible way.'), Character(name='Starship', description='A monumental rocket that represents hope and ambition for the future of space exploration.', imagery='A towering and sleek rocket, gleaming under the sun, ready for launch.', personality='Ambitious, reliable, and awe-inspiring. Represents the spirit of human endeavour in space exploration.'), Character(name='Falcon 9', description='A smaller but equally important rocket that carries out crucial missions in space.', imagery='A high-tech rocket with powerful engines, always ready for the next launch.', personality="Determined, reliable, and resourceful. Plays a key role in humanity's exploration of space.")]
)

def scene_to_text(scene: Scene) -> str:
    return f'''The following Scene: {scene.name}
{scene.imagery}
{scene.plot}
{[character.name for character in scene.characters]}'''


scene_text = scene_to_text(scene)