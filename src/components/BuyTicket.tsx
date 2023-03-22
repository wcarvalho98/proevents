import { Ticket } from "@/pages/event/[id]";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import BuyResume from "./BuyResume";
import { EventProp, TitleText } from "./Event";

export const fadeFromTop = keyframes`
  0% {
    margin-top: -48px;
    opacity: 0;
  }
  100% {
    margin-top: 0;
    opacity: 1;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  padding: 16px;
  background-color: #FFF;
  width: 100%;
  animation: ${fadeFromTop} .5s ease forwards;
`

const BuyTicketContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`

type BuyTicketProp = {
  ticket: Ticket,
  event: EventProp,
  realizarCompra: (email: string, tipo: string, quantidade: number) => void
}

const DataInput = styled.input<{ number?: boolean, radio?: boolean }>`
  border: none;
  outline: ${p => !p.radio && 0};
  height: 20px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #000;
  transition: all .3s ease;
  width: ${p => p.number ? "fit-content" : "50%"};

  &:focus-within {
    border-bottom: 1px solid #000;
  }
`

const DataContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const RadioContainer = styled.div`
  display: flex;
  gap: 24px;
`

const RadioText = styled(TitleText) <{ selected: boolean }>`
  ${p => p.selected && "font-weight: 600"};
`

const RadioElementContainer = styled.div<{ disabled: boolean }>`
  display: flex;
  gap: 4px;
  ${p => !p.disabled && "cursor: pointer"};
`

export default function BuyTicket(props: BuyTicketProp) {
  const [selectedRadio, setSelectedRadio] = useState("")
  const [email, setEmail] = useState("")
  const [emailConfirmation, setEmailConfirmation] = useState("")
  const [quantidade, setQuantidade] = useState(1)
  const [valido, setValido] = useState(false)
  const [preco, setPreco] = useState(0)
  const [finalizaCompra, setFinalizaCompra] = useState(false)

  const onChangeRadio = (event: any) => {
    if (!finalizaCompra) {
      setSelectedRadio(event.target.value)
    }
  }

  const changeRadio = (tipo: string) => {
    if (!finalizaCompra) {
      setSelectedRadio(tipo)
    }
  }

  const onChangeQuantidade = (event: any) => {
    const value = event.target.value
    if (value < 1) {
      setQuantidade(1)
    } else if (value > props.ticket.quantidade) {
      setQuantidade(props.ticket.quantidade)
    } else {
      setQuantidade(value)
    }
  }

  const onChangeEmail = (event: any) => {
    setEmail(event.target.value)
  }

  const onChangeEmailConfirmation = (event: any) => {
    setEmailConfirmation(event.target.value)
  }

  const isEmailValid = () => {
    return email && email.length > 4 && email.includes("@") && email.includes(".")
      && !email.endsWith(".") && email === emailConfirmation
  }

  useEffect(() => {
    setValido(false)
    if (selectedRadio && isEmailValid()) {
      setValido(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRadio, email, emailConfirmation])

  useEffect(() => {
    if (selectedRadio === "meia") {
      setPreco(props.ticket.preco?.meia!)
    } else if (selectedRadio === "social") {
      setPreco(props.ticket.preco?.social!)
    } else if (selectedRadio === "inteira") {
      setPreco(props.ticket.preco?.inteira!)
    }
  }, [props.ticket.preco?.inteira, props.ticket.preco?.meia, props.ticket.preco?.social, selectedRadio])

  const finishBuy = () => {
    setFinalizaCompra(true)
    props.realizarCompra(email, selectedRadio, quantidade)
  }

  return (
    <Container>
      <BuyTicketContainer>
        <TitleText>Você está comprando ingresso para o(a) {props.event.title}</TitleText>
        <TitleText>Para isso, precisamos de alguns dados seu:</TitleText>
        <DataContainer>
          <TitleText>Quantos ingressos você deseja comprar?</TitleText>
          <DataInput disabled={finalizaCompra} onChange={onChangeQuantidade} type={"number"}
            value={quantidade} min={1} max={props.ticket.quantidade} number />
        </DataContainer>
        <DataContainer>
          <TitleText>Qual é o tipo do ingresso?</TitleText>
          <RadioContainer onChange={onChangeRadio}>
            <RadioElementContainer disabled={finalizaCompra} onClick={() => changeRadio("meia")}>
              <DataInput disabled={finalizaCompra} readOnly type={"radio"} value="meia" name="Meia" checked={selectedRadio === "meia"} radio />
              <RadioText selected={selectedRadio === "meia"}>Meia</RadioText>
            </RadioElementContainer>
            <RadioElementContainer disabled={finalizaCompra} onClick={() => changeRadio("social")} >
              <DataInput disabled={finalizaCompra} readOnly type={"radio"} value="social" name="Social" checked={selectedRadio === "social"} radio />
              <RadioText selected={selectedRadio === "social"}>Social</RadioText>
            </RadioElementContainer>
            <RadioElementContainer disabled={finalizaCompra} onClick={() => changeRadio("inteira")}>
              <DataInput disabled={finalizaCompra} readOnly type={"radio"} value="inteira" name="Inteira" checked={selectedRadio === "inteira"} radio />
              <RadioText selected={selectedRadio === "inteira"}>Inteira</RadioText>
            </RadioElementContainer>
          </RadioContainer>
        </DataContainer>
        <DataContainer onChange={onChangeEmail}>
          <TitleText>Qual é o seu email?</TitleText>
          <DataInput disabled={finalizaCompra} type={"email"} placeholder="Insira seu email aqui" />
        </DataContainer>
        <DataContainer onChange={onChangeEmailConfirmation}>
          <TitleText>Confirme o email:</TitleText>
          <DataInput disabled={finalizaCompra} type={"email"} placeholder="Insira seu email aqui" />
        </DataContainer>
      </BuyTicketContainer>
      {valido && <BuyResume preco={preco * quantidade} finalizarCompra={finishBuy} />}
    </Container>
  )
}