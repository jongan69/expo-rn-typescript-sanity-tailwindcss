import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
// import CardComponent from '../components/CardComponent';
import { client } from "../lib/client";

export const OwnedNFTsScreen = () => {
  const connector = useWalletConnect();
  const ownedNFTs: Array<[]> = []
  // const navigate = Props.navigation.navigate

  const getData: () => Promise<void> = async () => {
    try {
      const query = '*[_type == "nfts"]';
      const data = await client.fetch(query);
      console.log(data)
      if (data) {
        data.forEach((element: Record<string, unknown>) => {
          if (connector.accounts[0] === element.owner) {
            // console.log('Found your NFT: ', element.urls[0])
            const url = element?.urls[0]
            ownedNFTs.push(url)
          }
        });
        console.log('Found your NFTs: ', ownedNFTs)
        setNfs(ownedNFTs);
        // Alert.alert('Found your NFTs!', ownedNfs.toString());
      } else {
        setNfs([])
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [nfts, setNfs] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <Text style={{ padding: 100 }}> Owned NFTs</Text>
      {nfts &&
        <View>
          {nfts.map((item, index) => {
            return (
              <Image key={index} source={{ uri: item }} />
            )
          })}
        </View>
        // <View>
        //   {nfts.map((item, index) => {
        //     <TouchableOpacity key={index}>
        //       <Text key={index}>{item.url}</Text>
        //       <Image key={index} source={{ uri: nfts[index].url }} style={{ width: 30, height: 30 }} />
        //       {/* <CardComponent key={index} imageUrl={item?.url.toString()} title={item?.name} /> */}
        //     </TouchableOpacity>
        //   })}
        // </View>
      }
    </View>
  );
}

export default OwnedNFTsScreen;