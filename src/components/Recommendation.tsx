import styled from "styled-components"
import Image from "next/image"
import { AnglesDown } from "@styled-icons/fa-solid"
import { SingleQuotesL, SingleQuotesR } from "@styled-icons/remix-editor"

const Container = styled.div`
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  min-width: 300px;
  min-height: 300px;
  gap: 16px;
`

const ImageContainer = styled.div`
  max-width: 64px;
  min-width: 64px;
  max-height: 64px;
  min-height: 64px;
  border-radius: 25%;
  position: relative;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const HeaderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UserNameText = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
`

const UserOcupationText = styled(UserNameText)`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #505050;
`

const RecommendationText = styled(UserOcupationText)`
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  max-width: 220px;
`

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const Divider = styled.div`
  width: 100%;
  min-width: 100px;
  height: 1px;
  background-color: #000;
  border-radius: 50%;
`

const AnglesDownIcon = styled(AnglesDown)`
  width: 24px;
  height: 24px;
  color: #505050;
`

const RecommendationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const QuoteLeft = styled(SingleQuotesL)`
  width: 16px;
  color: #000;
  position: absolute;
  top: 0;
  left: 0;
`

const QuoteRight = styled(SingleQuotesR)`
  width: 16px;
  color: #000;
  position: absolute;
  right: 0;
  bottom: 0;
`

export type RecommendationProp = {

}

export default function Recommendation(props: RecommendationProp) {
  return (
    <Container>
      <HeaderContainer>
        <ImageContainer>
          <Image alt="Imagem de usuário" src={"/png/user-recommendation.png"} fill></Image>
        </ImageContainer>
        <HeaderInfoContainer>
          <UserNameText>{"João Freitas Bichelar"}</UserNameText>
          <UserOcupationText>{"Chefe Executivo da Promotora Eventos LTDA"}</UserOcupationText>
        </HeaderInfoContainer>
      </HeaderContainer>
      <DividerContainer>
        <Divider />
        <AnglesDownIcon />
        <Divider />
      </DividerContainer>
      <RecommendationContainer>
        <QuoteLeft />
        <RecommendationText>{"Excelente plataforma de fácil usabilidade com preços altamente competitivos"}</RecommendationText>
        <QuoteRight />
      </RecommendationContainer>
    </Container>
  )
}