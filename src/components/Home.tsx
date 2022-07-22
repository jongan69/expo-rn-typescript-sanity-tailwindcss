import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import tw from 'twrnc';
import { client } from "../lib/client";

export const Home = () => {
  const getData: () => Promise<void> = async () => {
    try {
      const query = '*[_type == "products"]';
      const data = await client.fetch(query);
      console.log(data)
      if (data) {
        setProducts(data);
        Alert.alert('getData ran', products.toString());
      } else {
        setProducts([])
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [products, setProducts] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ScrollView style={tw`p-4 android:pt-2 bg-green-300 dark:bg-black`}>
        <Text> HomeScreen Test </Text>
      </ScrollView >
    </>
  )
}

export default Home;