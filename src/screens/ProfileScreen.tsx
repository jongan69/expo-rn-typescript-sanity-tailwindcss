import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import tw from 'twrnc';
import { client } from "../lib/client";

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Header = styled.Text`
    color: #FFF;
    font-size: 30px;
    margin-bottom: 30px;
    margin-top: 20%
`

const CardContainer = styled.View`
    width: 90%;
    max-width: 260px;
    height: 300px;
    padding: 1%
`

// const CardImage = styled.ImageBackground`
//     width: 100%;
//     height: 100%;
//     overflow: hidden;
//     border-radius: 20px;
// `

const CardTitle = styled.Text`
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
`

export const ProfileScreen = () => {
  // const getProfile: () => Promise<void> = async () => {
  //   try {
  //     const query = '*[_type == "users"]';
  //     const data = await client.fetch(query);
  //     console.log(data)
  //     if (data) {
  //       setCurrentUser(data);
  //       // Alert.alert('getProfile ran', currentUser.toString());
  //     } else {
  //       setCurrentUser([])
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // const [currentUser, setCurrentUser] = useState([]);
  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <Container style={[tw`bg-black`]}>
      <Header> Profile Screen </Header>
    </Container>
  );
}

export default ProfileScreen;