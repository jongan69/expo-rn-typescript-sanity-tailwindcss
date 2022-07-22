/* eslint-disable func-style */
import { useNavigation } from '@react-navigation/native';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from 'twrnc';


const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

function Button({ onPress, label }: unknown) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[tw`rounded mt-10`]}>
      <Text style={[tw`font-bold text-lg text-slate-100`]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function WalletConnectButton() {
  const connector = useWalletConnect();
  const navigation = useNavigation();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    navigation.navigate('Welcome')
    return connector.killSession();
  }, [connector]);

  return (
    <>
      {!connector.connected ? (
        <>
          <Button onPress={connectWallet} label="Connect a wallet" />
        </>
      ) : (
        <>
          <Button onPress={killSession} label="Log out" />
        </>
      )
      }
    </>
  );
};