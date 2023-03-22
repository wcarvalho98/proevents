import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"

export type EventProp = {
  imageRef?: string,
  id: number,
  title: string,
  date: {
    weekDay: string,
    day: string,
    month: string,
    hours: string
  },
  location: {
    title: string,
    city: string,
    state: string
  },
  priceStart?: string,
  promoter: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  background: #FFF;
  transition: all .2s ease;
  
  &:hover {
    box-shadow: 0px 0px 24px 4px rgba(0, 0, 0, 0.25);
    transform: scale(1.048) translateZ(0);
  }
`

const ImageContainer = styled.div`
  position: relative;
  min-width: 250px;
  max-width: 250px;
  min-height: 150px;
  max-height: 150px;
`

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px 8px;
  gap: 8px;
`

const LocationPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Text = styled.p`
  font-family: 'Inter';
  font-style: normal;
`

export const TitleText = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000;
`

export const PromoterText = styled(TitleText)`
  font-size: 14px;
  line-height: 17px;
`

export const DateText = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #7A11FF;
`

export const PlaceText = styled(DateText)`
  color: #505050;
`

export const PriceText = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #505050;
`

export default function Event(props: EventProp) {
  return (
    <Link href={`/event/${props.id}`}>
      <Container>
        <ImageContainer>
          <Image alt="" src={props.imageRef ?? "/png/stadium-event.png"} fill />
        </ImageContainer>
        <EventContainer>
          <TitleText>{props.title}</TitleText>
          <DateText>{props.date.weekDay}, {props.date.month.substring(0, 3)} {props.date.day}, {props.date.hours}</DateText>
          <LocationPriceContainer>
            <PlaceText>{props.location.title} • {props.location.city} • {props.location.state}</PlaceText>
            <PriceText>{props.priceStart ? `A partir de R$ ${props.priceStart}` : 'Gratuito'}</PriceText>
          </LocationPriceContainer>
          <PromoterText>{props.promoter}</PromoterText>
        </EventContainer>
      </Container>
    </Link>
  )
}