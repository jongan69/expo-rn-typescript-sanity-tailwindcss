/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twrnc';
import { AppContext } from '../context/AppContext';
import TinCard from './TinCard';


const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Header = styled.Text`
    color: #000;
    font-size: 30px;
    margin-bottom: 30px;
    width: 100%
`

const CardContainer = styled.View`
    width: 90%;
    max-width: 260px;
    height: 300px;
`

const Card = styled.View`
    position: absolute;
    background-color: #fff;
    width: 100%;
    max-width: 260px;
    height: 300px;
    shadow-color: black;
    shadow-opacity: 0.2;
    shadow-radius: 20px;
    border-radius: 20px;
    resize-mode: cover;
`

const CardImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
`

const CardTitle = styled.Text`
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
`

const InfoText = styled.Text`
    height: 28px;
    justify-content: center;
    display: flex;
    z-index: -100;
`

const SwipeableCard = () => {
  const { cardsData } = useContext(AppContext)
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (cardsData && cardsData.length > 0) {
      setUsers(cardsData)
      console.log('Users in Swipe card: ', users)

    }
  }, [cardsData])

  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction: undefined, nameToDelete: string) => {
    console.log(`removing: ${nameToDelete}`)
    setLastDirection(direction)
  }

  const outOfFrame = (name: string) => {
    console.log(`${name} left the screen!`)
  }

  return (
    <Container>
      <Header style={tw`text-white`}>
        Match with Web3 friends!
      </Header>
      <CardContainer>
        <>
          {users.map((user) => {
            return (
              <TinCard
                key={user._id}
                onSwipe={(dir) => swiped(dir, user.name)}
                onCardLeftScreen={() => outOfFrame(user.name)}
              >
                <Card>
                  <CardImage source={{ uri: user.imageUrl }}>
                    <CardTitle>{user.name}</CardTitle>
                    <InfoText>{user.userBio}</InfoText>
                  </CardImage>
                </Card>
              </TinCard>
            )
          })}
        </>
      </CardContainer>
      {lastDirection ? <InfoText>You swiped {lastDirection}</InfoText> : <InfoText />}
    </Container>
  )
}

export default SwipeableCard