import { Ticket } from "@/pages/event/[id]"
import Image from "next/image"
import { useState } from "react"
import styled from "styled-components"
import { EventProp, TitleText } from "./Event"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 16px;
  background-color: #FFF;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
`

const EventContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const HeaderContainer = styled.div`
  display: flex;
  gap: 18px;
`

const ImageContainer = styled.div`
  position: relative;
  min-width: 250px;
  max-width: 250px;
  min-height: 150px;
  max-height: 150px;
`

const EventDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const TicketContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  min-width: 250px;
`

const TicketPriceContainer = styled(TicketContainer)`
  gap: 8px;
`

export const BuyTicketButton = styled.button<{ comprando: boolean }>`
  border: none;
  padding: 12px 64px;
  background: ${p => p.comprando ? "#1E0A3C" : "#7A11FF"};
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  position: relative;
  cursor: ${p => p.comprando ? "normal" : "pointer"};
  transition: all .5s ease;

  ::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    transition: all .3s ease;
  }

  &:hover::before {
    ${p => !p.comprando && "background-color: rgba(0, 0, 0, .1)"}
  }
`

export default function EventDetail(props: EventProp & Ticket) {
  const transformToUpper = (text: string) => {
    return `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`
  }

  const [comprando, setComprando] = useState(false)

  const performBuy = () => {
    setComprando(true)
    props.comprar()
  }

  return (
    <Container>
      <EventContainer>
        <HeaderContainer>
          <ImageContainer>
            <Image alt="" src={"/png/stadium-event.png"} fill />
          </ImageContainer>
          <EventDescriptionContainer>
            <TitleText>Evento: {props.title}</TitleText>
            <TitleText>Data: {transformToUpper(props.date.weekDay)}, {props.date.day} de {transformToUpper(props.date.month)} às {props.date.hours}</TitleText>
            <TitleText>Localização: {transformToUpper(props.location.title)} • {transformToUpper(props.location.city)} • {transformToUpper(props.location.state)}</TitleText>
            <TitleText>Promotora: {props.promoter}</TitleText>
            <TitleText>Faixa etária: {props.faixaEtaria ? `A partir de ${props.faixaEtaria} anos` : 'Livre'}</TitleText>
            <TitleText>Quantidade de ingressos: {props.quantidade}</TitleText>
          </EventDescriptionContainer>
        </HeaderContainer>
        {props.preco &&
          <TicketContainer>
            <TicketPriceContainer>
              {props.preco.meia && <TitleText>Ingresso meia: R$ {props.preco.meia},00</TitleText>}
              {props.preco.social && <TitleText>Ingresso social: R$ {props.preco.social},00</TitleText>}
              {props.preco.inteira && <TitleText>Ingresso inteira: R$ {props.preco.inteira},00</TitleText>}
            </TicketPriceContainer>
            <BuyTicketButton onClick={performBuy} comprando={comprando}>Comprar</BuyTicketButton>
          </TicketContainer>}
      </EventContainer>
    </Container>
  )
}
