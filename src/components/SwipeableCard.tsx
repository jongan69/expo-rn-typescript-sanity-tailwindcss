import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import styled from 'styled-components'
import { Text } from './Themed'

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

// const db = [
//   {
//     name: 'Richard Hendricks',
//     img: require('../../assets/demoImages/richard.jpeg')
//   },
//   {
//     name: 'Erlich Bachman',
//     img: require('../../assets/demoImages/erlich.jpeg')
//   },
//   {
//     name: 'Monica Hall',
//     img: require('../../assets/demoImages/monica.jpeg')
//   },
//   {
//     name: 'Jared Dunn',
//     img: require('../../assets/demoImages/jared.jpeg')
//   },
//   {
//     name: 'Dinesh Chugtai',
//     img: require('../../assets/demoImages/dinesh.jpeg')
//   }
// ]

const SwipeableCard = (users: any[]) => {
  console.log('Users in Swipe card: ', users)
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction: string | React.SetStateAction<undefined>, nameToDelete: any) => {
    console.log(`removing: ${nameToDelete}`)
    setLastDirection(direction)
  }

  const outOfFrame = (name: any) => {
    console.log(`${name} left the screen!`)
  }

  return (
    <Container>
      <Header>Match with Web3 friends!</Header>
      {users.length && <Text>User Data: {users.toString()}</Text>}
      <CardContainer>
        {users.length > 1 &&
          <>
            {users.map((person: { name: React.Key | null | undefined; image: any }) =>
              <TinderCard key={person.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                <Card>
                  <CardImage source={person.image}>
                    <CardTitle>{person.name}</CardTitle>
                  </CardImage>
                </Card>
              </TinderCard>
            )}
          </>}
      </CardContainer>
      {lastDirection ? <InfoText>You swiped {lastDirection}</InfoText> : <InfoText />}
    </Container>
  )
}

export default SwipeableCard