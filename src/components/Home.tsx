import React from "react";
import { ScrollView, Text } from "react-native";
import tw from 'twrnc';
import SwipeableCard from "./SwipeableCard";

export const Home = () => {

  return (
    <>
      <ScrollView style={tw`p-4 android:pt-2 bg-green-300 dark:bg-black`}>
        <Text> HomeScreen Test </Text>
        <SwipeableCard />
      </ScrollView >
    </>
  )
}

export default Home;