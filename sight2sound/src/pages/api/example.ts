// pages/api/addVideo.js

import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

// Your Supabase URL and anon key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

console.log(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const { twelve_labs_id, transcript, generated_video } = req.body;
    const twelve_labs_id = '123';
    const transcript = 'test';

    // Insert the data into the videos table
    const { data, error } = await supabase
      .from('videos')
      .insert([
        { twelve_labs_id, transcript }
      ]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
}
