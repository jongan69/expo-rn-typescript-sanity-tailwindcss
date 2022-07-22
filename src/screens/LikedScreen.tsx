import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { client } from "../lib/client";


export const LikedScreen = () => {
  // const navigate = Props.navigation.navigate
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
    <View>
      <Text> Liked NFTs </Text>
    </View>
  );
}

export default LikedScreen;