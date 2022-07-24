/* eslint-disable no-unused-expressions */
import SvgUri from "expo-svg-uri";
import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twrnc';
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

// const users = [
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

const SwipeableCard = (props: { data: []; }) => {
  const users = props.data
  console.log('Users in Swipe card: ', users)
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
      {users !== undefined &&
        <CardContainer>
          {users.map((person) => {
            person.profileImage
              ?
              <TinCard key={person._id} onSwipe={(dir) => swiped(dir, person.name)} onCardLeftScreen={() => outOfFrame(person.name)}>
                <Card>
                  <CardImage source={person.profileImage}>
                    <CardTitle>{person.name}</CardTitle>
                  </CardImage>
                </Card>
              </TinCard>
              :
              <TinCard key={person._id} onSwipe={(dir: string) => swiped(dir, person.name)} onCardLeftScreen={() => outOfFrame(person.name)}>
                <Card>
                  <SvgUri
                    width="100"
                    height="100"
                    source={{ uri: person.defaultProfileImage }}
                  />
                  <CardTitle>{person.name}</CardTitle>
                </Card>
              </TinCard>
          })}
        </CardContainer>

      }
      {lastDirection ? <InfoText>You swiped {lastDirection}</InfoText> : <InfoText />}
    </Container>
  )
}

export default SwipeableCard