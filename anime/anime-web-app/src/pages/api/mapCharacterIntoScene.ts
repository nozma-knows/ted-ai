import { Character, Scene } from "@/types";
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
  const body = req.body;

  console.log("body: ", body);

 

  const doOpenAiCall = async (character: Character, scene: Scene) => {
    const res = await openai.chat.completions.create({
      messages: [
        {role: 'system', content: `There has been a typo in user data, you need to select one of the following options:
        ${scene.characters.map((character) => character.name).join(", ")}
        `},
        { role: 'user', content: `User Data:
        name: ${character.name}`}
      ],
      functions: [{
        name: 'select_character',
        description: `Performs a cosine similarity search into a database of embedded email bullet point summaries. Todays date is ${new Date().toLocaleDateString()}.`,
        parameters: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description:
                'The character name, chosen from the provided list',
            },
          },
      },
      }],
      model: 'gpt-4',
      }
    );
    return JSON.parse(res.choices[0].message.function_call?.arguments!).name}
  const name = await doOpenAiCall(body.character, body.scene);


  return res.status(200).json({ name });
}