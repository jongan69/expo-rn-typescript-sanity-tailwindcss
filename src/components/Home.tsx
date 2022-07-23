import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import tw from 'twrnc';
import { client } from "../lib/client";
import SwipeableCard from "./SwipeableCard";

export const Home = () => {
  const getData: () => Promise<void> = async () => {
    try {
      const query = '*[_type == "users"]';
      const data = await client.fetch(query);
      console.log(data)
      if (data) {
        setUsers(data);
        Alert.alert('Found Users!', users.toString());
      } else {
        setUsers([])
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [users, setUsers] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <ScrollView style={[tw`flex`, { padding: '20%' }]}>
        {users && users !== [] && <SwipeableCard users={users} />}
        {!users && <Text> We didn't find any users! </Text>}
      </ScrollView >
    </>
  )
}

export default Home;