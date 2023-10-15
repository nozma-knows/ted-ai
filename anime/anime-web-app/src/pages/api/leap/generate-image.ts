import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const modelId = "26a1a203-3a46-42cb-8cfa-f4de075907d8";
  const url = `https://api.tryleap.ai/api/v1/images/models/${modelId}/inferences`;
  const body = JSON.parse(req.body);

  console.log("body: ", body);
  console.log("body.prompt: ", body.prompt);

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.NEXT_PUBLIC_LEAP_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: body.prompt,
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
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("generate-image.ts - data: ", data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
}
