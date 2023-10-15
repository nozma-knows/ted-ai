import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = "https://api.tryleap.ai/api/v1/music";
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
      mode: body.mode,
      duration: body.duration,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("generate-music.ts - data: ", data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
}
