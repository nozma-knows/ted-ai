import { Character } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import {OpenAI} from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const modelId = "26a1a203-3a46-42cb-8cfa-f4de075907d8";
  const url = `https://api.tryleap.ai/api/v1/images/models/${modelId}/inferences`;
  const body = JSON.parse(req.body);

  console.log("body: ", body);

 

  const getLeapPrompt = async (character: Character) => {
    const res = await openai.chat.completions.create({
      messages: [
        {role: 'system', content: `you are a prompt generation expert tasked with helping me take descriptions of characters and turn them into prompts for stable diffusion to generate engaging avatars
        help me generate a killer prompt I can use to consistently create any kind of characterI want based on a name, description, imagery, and personality w/ stable diffusion
        every character you generate needs to feel like they belong in the same world
        {subject} Luminous neon colors, cyberpunk aesthetic, crisp 8K clarity, contemporary anime influence, Studio Ghibli-inspired, emphasize intricate fractals, impactful.
        we will only be modifying the {subject} using the data we provide you while using the rest of the prompt to maintain style w/ the rest of the world we are building
        generate the {subject} and integrate it into the main prompt structure
        return only the final output
        `},
        { role: 'user', content: `User Data:
        name: ${character.name}
        description: ${character.description}
        imagery: ${character.imagery}
        personality: ${character.personality}`}
      ],
       model: 'gpt-4',
      }
    );
    return res.choices[0].message.content}
  const prompt = await getLeapPrompt(body.character);


    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_LEAP_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        negativePrompt:
          "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render,  text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck",
        steps: 50,
        width: 1024,
        height: 1024,
        numberOfImages: 1,
        promptStrength: 7,
      }),
    };  

  try {
    console.log("generate-image.ts - url: ", url);
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("generate-image.ts - data: ", data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
}
