import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { client } from "../lib/client";


export const ProfileScreen = () => {
  // const navigate = Props.navigation.navigate
  const getProfile: () => Promise<void> = async () => {
    try {
      const query = '*[_type == "users"]';
      const data = await client.fetch(query);
      console.log(data)
      if (data) {
        setCurrentUser(data);
        Alert.alert('getProfile ran', currentUser.toString());
      } else {
        setCurrentUser([])
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View>
      <Text> Profile Screen </Text>
    </View>
  );
}

export default ProfileScreen;