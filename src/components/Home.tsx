import React, { useContext } from "react";
import { View } from "react-native";
import tw from 'twrnc';
import { AppContext } from "../context/AppContext";
import SwipeableCard from "./SwipeableCard";

export const Home = () => {
  const { cardsData, currentUserWallet } = useContext(AppContext);
  return (
    <>
      <View style={[tw`flex bg-fuchsia-700`, { padding: '20%', height: '100%' }]}>
        {cardsData && currentUserWallet && <SwipeableCard />}
      </View >
    </>
  )
}

export default Home;