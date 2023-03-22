import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"
import { SearchOutline } from "@styled-icons/evaicons-outline"

const Container = styled.nav`
  width: 100%;
  height: 64px;
  background: #FFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  gap: 46px;
  padding: 0 24px;
`

const LogoContainer = styled.div`
  position: relative;
  min-width: 200px;
  max-width: 200px;
  height: 24px;
  transition: transform .3s ease;

  &:hover {
    transform: scale(1.05);
  }
`

const InputHolder = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 6px 8px;
  width: 100%;
  border-bottom: 1px solid #505050;
`

const Input = styled.input`
  width: 100%;
  border: none;
  outline: 0;
  height: 20px;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

type ButtonLinkProps = {
  mode: "primary" | "secondary"
}

const ButtonLink = styled(Link) <ButtonLinkProps>`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: ${p => p.mode === "primary" ? 600 : 400};
  font-size: 20px;
  line-height: 24px;
  width: max-content;
  color: ${p => p.mode === "primary" ? '#7A11FF' : '#000'};
  transition: background-color .3s ease;
  padding: 8px;

  &:hover {
    background-color: rgba(30, 10, 60, .1);
  }
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`

const WelcomeP = styled.p`
  font-family: 'Inter', sans-serif;
  width: max-content;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #000;
`

const UserButton = styled(ButtonLink)`
  padding: 4px;
`

const SearchIcon = styled(SearchOutline)`
  width: 24px;
  height: 24px;
  color: #505050;
`

type NavbarProps = {
  user?: string
}

export default function Navbar(props: NavbarProps) {
  return (
    <Container>
      <Link href={"/"}>
        <LogoContainer>
          <Image alt="" src={'/png/logo_proevents.png'} fill />
        </LogoContainer>
      </Link>
      <InputHolder>
        <SearchIcon title="Buscar eventos" />
        <Input type={"text"} placeholder="Buscar eventos"></Input>
      </InputHolder>
      {!props.user ?
        <ButtonsContainer>
          <ButtonLink href={"/login"} mode='secondary'>Login</ButtonLink>
          <ButtonLink href={"/signup"} mode='primary'>Cadastre-se</ButtonLink>
        </ButtonsContainer> :
        <UserContainer>
          <WelcomeP>Bem vindo,</WelcomeP>
          <UserButton href={"/user"} mode='primary'>{props.user}</UserButton>
        </UserContainer>}
    </Container>
  )
}