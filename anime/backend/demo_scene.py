from typing import Dict, List
from summary_get import Character
from summary_get import vid2scene, Scene
from fastapi import FastAPI


def scene_to_text(scene: Scene) -> str:
    return f'''The following Scene: {scene.name}
{scene.imagery}
{scene.plot}
{[character.name for character in scene.characters]}'''


# scene_text = scene_to_text(scene)