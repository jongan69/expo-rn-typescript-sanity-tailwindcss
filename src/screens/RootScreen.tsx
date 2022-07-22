import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from 'expo-vector-icons';
import React from "react";
import Home from '../components/Home';
import LikedScreen from './LikedScreen';
import OwnedNFTsScreen from './OwnedNFTsScreen';
// import { urlFor } from '../src/lib/client.js'


type HomeStackParametersList = {
  client: undefined;
  data: undefined;
  products: [];
};

interface Props {
  navigation: StackNavigationProp<HomeStackParametersList>;
}

const Tab = createBottomTabNavigator();

export const RootScreen = () => {
  // const navigate = Props.navigation.navigate
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "md-home";
          }
          else if (route.name === "Liked") {
            iconName = "md-heart";
          }

          else if (route.name === "Owned") {
            iconName = "md-heart";
          }

          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Liked"
        component={LikedScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Owned"
        component={OwnedNFTsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default RootScreen;