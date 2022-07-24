import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Image, Text, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from 'styled-components';
import tw from 'twrnc';
import { AppContext } from "../context/AppContext";

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

const Header = styled.Text`
    color: #FFF;
    font-size: 30px;
    margin-bottom: 30px;
    margin-top: 20%
`

const FormContainer = styled.View`
    padding: 8px
    justify-content: center;
    align-items: center;
`

// const CardImage = styled.ImageBackground`
//     width: 100%;
//     height: 100%;
//     overflow: hidden;
//     border-radius: 20px;
// `

// const FormTitle = styled.Text`
//     position: absolute;
//     bottom: 0;
//     margin: 10px;
//     color: #fff;
// `

// type FormData = {
//   Biography: string;
//   Name: string;
//   ProfileImage: undefined
// };



export const ProfileScreen = () => {
  const { currentUserData } = useContext(AppContext)

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      ProfileImage: currentUserData[0].imageUrl,
      Name: currentUserData[0].name,
      Biography: currentUserData[0].userBio,
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  }

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log('errors', errors, 'Data from provider: ', currentUserData);

  // const getProfile: () => Promise<void> = async () => {
  //   try {
  //     const query = '*[_type == "users"]';
  //     const data = await client.fetch(query);
  //     console.log(data)
  //     if (data) {
  //       setCurrentUser(data);
  //       // Alert.alert('getProfile ran', currentUser.toString());
  //     } else {
  //       setCurrentUser([])
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // const [currentUser, setCurrentUser] = useState([]);
  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <Container style={[tw`bg-white`]} >
      <Header style={[tw`bg-black`]}> Profile Screen </Header>
      <ScrollView>
        <FormContainer>
          {currentUserData[0].imageUrl &&
            <Image
              style={{ height: 100, width: 100, borderRadius: 20 }}
              source={{ uri: currentUserData[0]?.imageUrl }} />
          }
          <Text style={[tw`p-5`]}> Your Displayed Name </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[tw`bg-white`, { width: '80%' }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              // placeholder={currentUserData.name}
              />
            )}
            name={"Name"}
          />
          {errors.Name && <Text>This is required.</Text>}

          <Text style={[tw`p-5`]}> Your Biography</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 500,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                // style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Biography"
              />
            )}
            name="Biography"
          />
        </FormContainer>
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </Container >
  );
}

export default ProfileScreen;