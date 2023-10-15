import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface ResponseError {
  message: string;
}

interface ResponseData {
  successful: boolean;
  error: ResponseError | null;
}

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    message: string;
  };
}

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const API_URL = `https://api.twelvelabs.io/v1.2`; // Base URL
  const TASKS_URL = `${API_URL}/tasks/external-provider`;

  const data = {
    index_id: `652b036d3c4a426cf3f4f576`,
    url: `https://www.youtube.com/watch?v=3ryID_SwU5E`,
  };

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key": process.env.TWELVE_LABS_API_KEY,
  };

  const config = {
    method: "POST",
    url: TASKS_URL,
    headers: headers,
    data: data,
  };

  try {
    const resp = await axios(config);
    console.log(`Status code: ${resp.status}`);
    const response = await resp.data;
    const TASK_ID = response._id;
    console.log("TASK_ID: ", TASK_ID);
  } catch (error: any) {
    console.log("error: ", error.message);
  }
}
