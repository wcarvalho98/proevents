import { NextApiRequest, NextApiResponse } from "next"
import { promises as fsAsync } from 'fs'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto';

const jsonDirectory = path.join(process.cwd(), 'json')
const file = jsonDirectory + '/ticket.json'
const ticketCreatedFile = jsonDirectory + '/createdTicket.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" })
    return
  }
  const body = req.body
  await diminuaQuantidadeTicket(body.id, body.quantidade)
  await createTickets(body.preco, body.id, body.tipo, body.email, body.idAtendimento, body.quantidade)
  res.status(200).json({ message: "Ticktes created!" })
}

const leiaArquivo = async (file: string) => {
  return JSON.parse(await fsAsync.readFile(file, 'utf-8'))
}

const diminuaQuantidadeTicket = async (id: number, quantidade: number) => {
  const content = await leiaArquivo(file)
  content[id].quantidade -= quantidade
  await fsAsync.writeFile(file, JSON.stringify(content, null, 2))
}

const createTickets = async (preco: number, id: number, tipo: string, email: string, idAtendimento: string, quantidade: number) => {
  let tickets = []
  if (fs.existsSync(ticketCreatedFile)) {
    tickets = await leiaArquivo(ticketCreatedFile)
  }
  for (let i = 0; i < quantidade; i++) {
    const ticket = {
      id: randomUUID(),
      eventId: id,
      preco,
      tipo,
      email,
      date: new Date(),
      idAtendimento
    }
    tickets.push(ticket)
  }
  await fsAsync.writeFile(ticketCreatedFile, JSON.stringify(tickets, null, 2))
}