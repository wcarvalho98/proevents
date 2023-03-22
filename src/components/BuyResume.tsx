import { useState } from "react"
import styled, { keyframes } from "styled-components"
import { TitleText } from "./Event"
import { BuyTicketButton } from "./EventDetail"

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${fadeIn} .3s ease forwards;
  min-width: 250px;
`

const ResumeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ResumeText = styled(TitleText)`
  text-align: center;
`

type BuyResumeProp = {
  preco: number,
  taxas?: number,
  finalizarCompra: () => void
}

export default function BuyResume(props: BuyResumeProp) {
  const [finalizado, setFinalizado] = useState(false)

  const finishBuy = () => {
    setFinalizado(true)
    props.finalizarCompra()
  }

  const calculateFinalValue = () => {
    return props.taxas ?? 0 + props.preco
  }

  return (
    <Container>
      <ResumeInfoContainer>
        <ResumeText>Resumo da sua compra</ResumeText>
        <TitleText>Valor do ingresso: R$ {props.preco},00</TitleText>
        <TitleText>Taxas: R$ {props.taxas ?? "0"},00</TitleText>
        <TitleText>Valor final: R$ {calculateFinalValue()},00</TitleText>
      </ResumeInfoContainer>
      <BuyTicketButton onClick={finishBuy} comprando={finalizado}>Finalizar</BuyTicketButton>
    </Container>
  )
}