import Head from 'next/head'
import Navbar from '@/components/Navbar'
import styled from 'styled-components'
import Footer from '@/components/Footer'
import EventHolder from '@/components/EventHolder'
import { GetServerSideProps } from 'next'
import { EventProp } from '@/components/Event'
import { fetcher } from '@/utils/utils'
import RecommendationHolder from '@/components/RecommendationHolder'

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  background-color: #FAFAFA;
`

const HomeContentHolder = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1;
  align-items: center;
`

const Divider = styled.div`
  width: 80%;
  height: 1px;  
  border-radius: 50%;
  background-color: #000000;
  margin: 16px 0;
`

type HomeProps = {
  result: EventProp[]
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await fetcher("api/event")
  const result: EventProp[] = JSON.parse(res)

  return {
    props: {
      result
    }
  }
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>ProEvents</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer>
        <Navbar user="Wilder" />
        <HomeContentHolder>
          <EventHolder title='Encontre o seu próximo evento, perto de você' events={props.result} />
          <Divider />
          <RecommendationHolder />
        </HomeContentHolder>
        <Footer />
      </HomeContainer>
    </>
  )
}