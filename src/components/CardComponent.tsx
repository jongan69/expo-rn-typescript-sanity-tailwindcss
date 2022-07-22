import React from "react";
import { Image } from "react-native";
import { Card } from "react-native-paper";
import { Text, View } from './Themed';

export const NFTCard = ({ imageUrl, title }) => {
  return (
    <Card>
      <View>
        <Image
          key="NFT"
          source={{
            uri: imageUrl
          }}
        />
      </View>
      <Text>{title}</Text>
    </Card>
  )
}

export default NFTCard;