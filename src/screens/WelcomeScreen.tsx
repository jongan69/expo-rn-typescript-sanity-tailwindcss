import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React, { useEffect } from 'react';
import { ImageBackground, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import MenuIcon from '../components/MenuIcon';
import { Text, View } from '../components/Themed';
import WalletConnectButton from '../components/WalletConnect';

export const WelcomeScreen = () => {
  const connector = useWalletConnect();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props: StackHeaderLeftButtonProps) => (<MenuIcon />)
    });
  });

  const imgString = () => {
    const rand = Math.floor(Math.random() * 7);
    switch (rand) {
      case 1:
        return require('../../assets/backgrounds/1.gif');

      case 2:
        return require('../../assets/backgrounds/2.gif');

      case 3:
        return require('../../assets/backgrounds/3.gif');

      case 4:
        return require('../../assets/backgrounds/4.gif');

      case 5:
        return require('../../assets/backgrounds/5.gif');

      case 6:
        return require('../../assets/backgrounds/6.gif');

      case 7:
        return require('../../assets/backgrounds/7.gif');

      case 8:
        return require('../../assets/backgrounds/8.gif');

      default:
        return require('../../assets/backgrounds/8.gif');
    }
  };

  return (
    <View>
      <ImageBackground
        source={imgString()}
        style={[tw`flex justify-center items-center`, { height: '100%' }]}
      >
        {!connector.connected
          ?
          <>
            <WalletConnectButton />
          </>
          :
          <>
            <View style={[tw`items-center rounded`, { padding: 20 }]}>
              <Text >Welcome</Text>
              <Text>{connector.accounts[0]}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Root")}
              style={[tw`px-8 py-8 bg-cyan-700 rounded mt-10`]}
            >
              <Text>Press to continue</Text>
            </TouchableOpacity>
            <WalletConnectButton />
          </>
        }
      </ImageBackground>
    </View>
  )
}

export default WelcomeScreen;