import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import styled from 'styled-components';
import tw from 'twrnc';

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Header = styled.Text`
    color: #FFF;
    font-size: 30px;
    margin-bottom: 30px;
    margin-top: 20%
`

export const MessageScreen = () => {
  // const navigate = Props.navigation.navigate
  // const getData: () => Promise<void> = async () => {
  //   try {
  //     const query = '*[_type == "products"]';
  //     const data = await client.fetch(query);
  //     console.log(data)
  //     if (data) {
  //       setMessages(data);
  //       // Alert.alert('getMessages ran', messages.toString());
  //     } else {
  //       setMessages([])
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <ScrollView style={[tw`bg-black`]}>
      <Container style={[tw`bg-black`]}>
        <Header> Messages Screen </Header>
      </Container>
    </ScrollView>
  );
}

export default MessageScreen;