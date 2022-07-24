import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import tw from 'twrnc';
import { client } from "../lib/client";
import SwipeableCard from "./SwipeableCard";

export const Home = () => {
  const getUsers: () => Promise<void> = async () => {
    try {
      const query = '*[_type =="users"]';
      const data = await client.fetch(query);
      // console.log(data)
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
    getUsers();
  }, []);
  return (
    <>
      <View style={[tw`flex bg-fuchsia-700`, { padding: '20%', height: '100%' }]}>
        {users && <SwipeableCard data={users} />}
        {!users && <Text> We didn't find any users! </Text>}
      </View >
    </>
  )
}

export default Home;