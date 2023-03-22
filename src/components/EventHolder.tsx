import styled from "styled-components"
import Event, { EventProp } from "./Event"

type EventHolderProps = {
  title: string,
  events: EventProp[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px 0;
`

const EventsContainer = styled.div`
  display: flex;
  gap: 42px;
`

const Title = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #000;
`

export default function EventHolder(props: EventHolderProps) {
  const renderEvents = () => {
    return props.events.map(event => <Event key={event.id} id={event.id}
      date={event.date} location={event.location} promoter={event.promoter}
      title={event.title} priceStart={event.priceStart} imageRef={event.imageRef} />)
  }

  return (
    <Container>
      <Title>{props.title}</Title>
      <EventsContainer>
        {renderEvents()}
      </EventsContainer>
    </Container>
  )
}