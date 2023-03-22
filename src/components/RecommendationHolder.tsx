import styled from "styled-components"
import Recommendation, { RecommendationProp } from "./Recommendation"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px 0;
`

const RecommendationsContainer = styled.div`
  display: flex;
  gap: 64px;
`

const Title = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #000;
`

type RecommendationHolderProp = {
  title: string,
  recommendations: RecommendationProp[]
}

export default function RecommendationHolder() {
  return (
    <Container>
      <Title>{"Veja como nossos usuários avaliam a ProEvents"}</Title>
      <RecommendationsContainer>
        <Recommendation></Recommendation>
        <Recommendation></Recommendation>
        <Recommendation></Recommendation>
      </RecommendationsContainer>
    </Container>
  )
}