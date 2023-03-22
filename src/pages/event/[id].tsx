import BuyTicket from "@/components/BuyTicket"
import { EventProp } from "@/components/Event"
import EventDetail from "@/components/EventDetail"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import TicketGeneration from "@/components/TicketGeneration"
import { fetcher } from "@/utils/utils"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useState } from "react"
import styled from "styled-components"

const EventPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  background-color: #FAFAFA;
`

const EventContentHolder = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  gap: 24px;
  padding: 24px 42px;
`

export type Ticket = {
  idEvento: number,
  preco?: {
    meia?: number,
    social?: number,
    inteira?: number
  },
  quantidade: number,
  faixaEtaria?: number,
  comprar: () => {}
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await Promise.all([fetcher("api/handler?file=event"), fetcher("api/handler?file=ticket")])

  const eventResult: EventProp[] = JSON.parse(res[0])
  const ticketResult: Ticket[] = JSON.parse(res[1])
  const id = await fetch(`${process.env.BASE_FETCH_URL}api/generateTicket`).then(value => value.json())

  return {
    props: {
      event: eventResult[+context.query.id!],
      ticket: ticketResult[+context.query.id!],
      id: id.id
    }
  }
}

export default function EventPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [comprando, setComprando] = useState(false)
  const [email, setEmail] = useState("")
  const [tipo, setTipo] = useState("")
  const [quantidade, setQuantidade] = useState(1)
  const [quantidadeTickets, setQuantidadeTickets] = useState(props.ticket.quantidade)

  const comprar = () => {
    setComprando(true)
  }

  const ticket = {
    ...props.ticket,
    comprar
  }

  const realizarCompra = (email: string, tipo: string, quantidade: number): void => {
    setEmail(email)
    setTipo(tipo)
    setQuantidade(quantidade)
  }

  const gerarTicket = () => {
    const ticketCreated = {
      id: props.event.id,
      email,
      tipo,
      quantidade,
      preco: props.ticket.preco[tipo],
      idAtendimento: props.id
    }
    fetch(`${process.env.BASE_FETCH_URL ?? "http://localhost:3000/"}api/createTicket`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketCreated)
    })
    setQuantidadeTickets(ticket.quantidade - quantidade)
  }

  return (
    <EventPageContainer>
      <Navbar user="Wilder" />
      <EventContentHolder>
        <EventDetail {...props.event} {...ticket} quantidade={quantidadeTickets} />
        {comprando && <BuyTicket event={props.event} ticket={ticket} realizarCompra={realizarCompra} />}
        {email && <TicketGeneration id={props.id} gerarTicket={gerarTicket} />}
      </EventContentHolder>
      <Footer />
    </EventPageContainer>
  )
}