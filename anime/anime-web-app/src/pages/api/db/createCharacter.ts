import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAdminKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
const supabase = createClient(supabaseUrl, supabaseAdminKey)

export default async function createCharacter(req: NextApiRequest, res: NextApiResponse) {
  const { character } = req.body

  const { data, error } = await supabase
    .from('characters')
    .insert([
      { 
        name: character.name, 
        description: character.description, 
        imagery: character.imagery, 
        personality: character.personality 
      },
    ])

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ data })
}