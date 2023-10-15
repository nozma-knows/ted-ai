import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);

  const voiceId = body.voiceId;

  const url = `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM?optimize_streaming_latency=0&output_format=mp3_44100_128`;

  const options = {
    method: "POST",
    headers: {
      accept: "audio/mpeg",
      "content-type": "application/json",
      "xi-api-key": process.env.ELEVEN_LABS_API_KEY as string,
    },
    body: JSON.stringify({
      text: body.text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0,
        similarity_boost: 0,
        style: 0,
        use_speaker_boost: true,
      },
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("text-to-speech.ts - data: ", data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
}
