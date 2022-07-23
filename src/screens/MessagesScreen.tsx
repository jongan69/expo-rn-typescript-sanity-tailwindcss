import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { client } from "../lib/client";


export const MessageScreen = () => {
  // const navigate = Props.navigation.navigate
  const getData: () => Promise<void> = async () => {
    try {
      const query = '*[_type == "products"]';
      const data = await client.fetch(query);
      console.log(data)
      if (data) {
        setMessages(data);
        Alert.alert('getMessages ran', messages.toString());
      } else {
        setMessages([])
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <Text> Message Screen </Text>
    </View>
  );
}

export default MessageScreen;