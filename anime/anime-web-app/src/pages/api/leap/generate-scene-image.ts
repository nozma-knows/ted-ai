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
  const url = `https://api.tryleap.ai/api/v1/images/models/${modelId}/inferences`;
  const body = req.body;

  const prompt = body.prompt; // Change this line

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.LEAP_API_KEY}`,
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

  const response = await fetch(url, options);
  const data = await response.json();
  const {  id: inferenceId } = data;

  // Define the polling URL
  const pollingUrl = `https://api.tryleap.ai/api/v1/images/models/${modelId}/inferences/${inferenceId}`;

  // Define the polling options
  const pollingOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${process.env.LEAP_API_KEY}`,
    },
  };

  // Poll the endpoint until the image is generated
  let imageResponse;
  do {
    imageResponse = await fetch(pollingUrl, pollingOptions);
    const imageData = await imageResponse.json();

    // If the image is generated, break the loop
    if (imageData.state === 'finished' && imageData.images && imageData.images.length > 0) {
      // Return the URL of the generated image
      res.status(200).json({ imageUrl: imageData.images[0].uri });
      return;
    }

    // Wait for 1 second before the next poll
    await new Promise(resolve => setTimeout(resolve, 1000));
  } while (true);
}