import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { AppContext } from '../context/AppContext';
import uploadProfileImage from '../lib/uploadProfilePicture';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function CameraComponent() {
  const { currentUserWallet } = useContext(AppContext);
  const navigation = useNavigation();
  const [image, setImage] = useState();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const [isCameraReady, setIsCameraReady] = useState(false);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    const localUri = result.uri.replace("file:///", "file:/");
    setImage(localUri);
    const response = await fetch(image);
    const blob = await response.blob();
    if (blob) {
      uploadProfileImage(blob, currentUserWallet)
      navigation.navigate('Profile')
    }
  }


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <Camera
        style={[{ flex: 1 }]}
        type={type}
      >
        <View style={[tw`flex-row mt-180`, { marginBottom: 0, paddingHorizontal: '30%' }]}>
          <TouchableOpacity
            style={[tw`pr-5`]}
            // disabled={!isCameraReady}
            onPress={pickImage}
          >
            <MaterialIcons name='image-search' size={28} color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            // disabled={!isCameraReady}
            // onPress={onSnap}
            style={[tw`relative`, {
              backgroundColor: '#5A45FF',
              height: CAPTURE_SIZE,
              width: CAPTURE_SIZE,
              borderRadius: Math.floor(CAPTURE_SIZE / 2),
              // marginBottom: 28,
              // padding: 30,
              // marginHorizontal: '10%'
            }]}
          />
          <TouchableOpacity
            style={[tw`pl-5`]}
            // disabled={!isCameraReady}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <MaterialIcons name='flip-camera-ios' size={28} color='white' />
          </TouchableOpacity>
        </View>
      </Camera>
    </>
  );
}
