import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import styled from 'styled-components';
import tw from 'twrnc';

// import CardComponent from '../components/CardComponent';
import { client } from "../lib/client";

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
    margin-top: 20%
`

const CardContainer = styled.View`
    width: 90%;
    max-width: 260px;
    height: 300px;
    padding: 1%
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


export const MatchScreen = () => {
  // const connector = useWalletConnect();
  // const navigate = Props.navigation.navigate

  // const getLiked: () => Promise<void> = async () => {
  //   try {
  //     const query = '*[_type == "nfts"]';
  //     const data = await client.fetch(query);
  //     console.log(data)
  //     if (data) {
  //       setLikes(data)
  //     } else {
  //       setLikes([])
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // const [likes, setLikes] = useState([]);

  // useEffect(() => {
  //   getLiked();
  // }, []);

  return (
    <ScrollView style={tw`bg-cyan-700`}>
      <Container style={tw`bg-black`}>
        <Header style={tw`text-white`}>
          Liked Profiles
        </Header>
        {/* {likes.length > 0 &&
          <>
            {
              likes.map((item) => {
                if (item.owner === connector.accounts[0]) {
                  return (
                    <>
                      <CardContainer>
                        <CardImage
                          source={{ uri: item.urls[0] }}
                        />
                        <CardTitle>{item.nftName}</CardTitle>
                      </CardContainer>
                    </>
                  )
                }
              })}
          </>
        } */}
      </Container>
    </ScrollView>
  );
}

export default MatchScreen;