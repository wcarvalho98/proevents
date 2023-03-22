import styled from "styled-components"
import { Linkedin, Github } from "@styled-icons/bootstrap"
import Link from "next/link"

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 64px;
  padding: 0 42px;
  background: #7A11FF;
`

const TextHolderLeft = styled.div`
  display: flex;
  gap: 32px;
`

const TextHolderRight = styled.div`
  display: flex;
  gap: 16px;
`

const Text = styled.p`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #FFF;
`

const LinkedinIcon = styled(Linkedin)`
  color: #FFF;
  width: 24px;
  height: 24px;
`

const GithubIcon = styled(Github)`
  color: #FFF;
  width: 24px;
  height: 24px;
`

export default function Footer() {
  return (
    <Container>
      <TextHolderLeft>
        <Text>© 2023 ProEvents</Text>
        <Text>Todos os direitos reservados</Text>
      </TextHolderLeft>
      <TextHolderRight>
        <Text>Criado por Wilder Carvalho</Text>
        <Link href={"https://www.linkedin.com/in/wilder-carvalho/"} target={"_blank"}><LinkedinIcon title="Linkedin de Wilder Carvalho" /></Link>
        <Link href={"https://github.com/wcarvalho98/"} target={"_blank"}><GithubIcon title="Github de Wilder Carvalho" /></Link>
      </TextHolderRight>
    </Container>
  )
}