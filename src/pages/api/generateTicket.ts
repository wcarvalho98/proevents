import { randomUUID } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = { "id": randomUUID() }
  res.status(200).json(result);
}