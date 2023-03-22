import styled from "styled-components";
import { fadeFromTop } from "./BuyTicket";
import { TitleText } from "./Event";
import { v4 } from "uuid"
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { fetcher } from "@/utils/utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  padding: 16px;
  background-color: #FFF;
  animation: ${fadeFromTop} .5s ease forwards;
  align-items: center;
  justify-content: center;
`

type TicketGenerationProp = {
  id: string,
  gerarTicket: () => void
}

export default function TicketGeneration(props: TicketGenerationProp) {
  useEffect(() => {
    props.gerarTicket()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <TitleText>Parabéns pela sua compra!</TitleText>
      <TitleText>Agora pode ficar tranquilo, seus ingressos serão enviados em até 24 horas úteis pro email informado.</TitleText>
      <TitleText>Esse é o seu código de atendimento: {props.id}</TitleText>
      <TitleText>Se você teve algum problema ao inserir seus dados, pedimos que entre em contato conosco informando o código de atendimento!</TitleText>
    </Container>
  )
}