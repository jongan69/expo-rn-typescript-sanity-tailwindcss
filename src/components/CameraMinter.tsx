import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Text,
  TouchableOpacity,
  TouchableWithoutFeedback, View
} from 'react-native';

// const apiUrl = 'https://api.cloudinary.com/v1_1/dp8lp5b68/image/upload';
// const CLARIFAY_KEY = "83e67f71dd034c60b784e4a050228303"
// const WINDOW_HEIGHT = Dimensions.get('window').height;
// const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function CameraMinter() {
  const navigation = useNavigation();
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    onHandlePermission();
  }, []);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  }

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  // const onSnap = async () => {
  //   if (cameraRef.current) {
  //     console.log('Camera Minter Used: ', cameraRef.current)
  //     const options = { quality: 0.9, base64: true };
  //     const data = await cameraRef.current.takePictureAsync(options);
  //     const source = data.base64;


  //     if (source) {
  //       let base64Img = `data:image/jpg;base64,${source}`;
  //       let data = {
  //         file: base64Img,
  //         upload_preset: 'edscgabu'
  //       };
  //       await cameraRef.current.pausePreview();
  //       setIsPreview(true);
  //       fetch(apiUrl, {
  //         body: JSON.stringify(data),
  //         headers: {
  //           'content-type': 'application/json'
  //         },
  //         method: 'POST'
  //       })
  //         .then(async response => {
  //           let data = await response.json();
  //           if (data.secure_url) {
  //             process.nextTick = setImmediate // RN polyfill
  //             clarifai.models.predict(Clarifai.GENERAL_MODEL, data.secure_url)
  //               .then(response => {
  //                 const { concepts } = response.outputs[0].data
  //                 if (concepts && concepts.length > 0) {
  //                   for (const prediction of concepts) {
  //                     if (prediction.name) {
  //                       fetch('https://thirdweb-nextjs-minting-api.vercel.app/api/mint', {
  //                         body: JSON.stringify({
  //                           "mintToAddress": connector.accounts[0],
  //                           "supply": 1,
  //                           "message": prediction.name,
  //                           "metadata": {
  //                             "name": prediction.name,
  //                             "description": prediction.name,
  //                             "image": data.secure_url,
  //                             "external_url": data.secure_url,
  //                             "uri": data.secure_url,
  //                             "background_color": "",
  //                             "attributes": [
  //                               {
  //                                 "value": "AI reading",
  //                                 "trait_type": prediction.name
  //                               }
  //                             ]
  //                           }
  //                         }),
  //                         headers: {
  //                           'content-type': 'application/json'
  //                         },
  //                         method: 'POST'
  //                       })
  //                       // setBluntVerified(true)
  //                       // Alert.alert(`Minted NFT for ${connector.accounts[0]}!`);
  //                       // navigation.navigate('Home')
  //                     } else {
  //                       // Anything else gets output as alert
  //                       Alert.alert('Couldnt mint nft of: ', prediction.name);
  //                     }

  //                     // All Predictions should be logged
  //                     // console.log('PREDEICTION FROM CLARIFAI: ', prediction)
  //                     // setAiData(prediction)
  //                     return
  //                   }
  //                 }
  //               })
  //           }
  //         })
  //         .catch(err => {
  //           Alert.alert('Error Verifiying Blunt');
  //           console.log(err);
  //         });

  //     }
  //   }
  // };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback
      delayLongPress={630}
      onLongPress={() => navigation.goBack()}
    >
      <View>
        <Camera
          ref={cameraRef}
          type={cameraType}
          onCameraReady={onCameraReady}
          useCamera2Api={true}
        />
        <View>
          {isPreview && (
            <>
              <View style={{ alignSelf: 'center', padding: '80%' }}>
              </View>
              <TouchableOpacity
                onPress={cancelPreview}
                activeOpacity={0.7}
              >
                <AntDesign name='close' size={32} color='#fff' />
              </TouchableOpacity>
            </>
          )}
          {!isPreview && (
            <View>
              <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
                <MaterialIcons name='flip-camera-ios' size={28} color='white' />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={!isCameraReady}
              // onPress={onSnap}
              // style={styles.capture}
              />
              <View>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image &&
                  <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}