import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WalletConnectProvider, { useWalletConnect } from "@walletconnect/react-native-dapp";
import React from 'react';
import { Platform } from "react-native";
import { TailwindProvider } from 'tailwind-rn';
import utilities from '../tailwind.json';
import CameraMinter from "./components/CameraMinter";
import AppProvider from "./context/AppContext";
import { RootScreen } from "./screens/RootScreen";
import { WelcomeScreen } from './screens/WelcomeScreen';

const SCHEME_FROM_APP_JSON = 'demo'

const Stack = createStackNavigator();
export const App = () => {
  const connector = useWalletConnect();

  return (
    <TailwindProvider utilities={utilities}>
      <AppProvider>
        <WalletConnectProvider
          redirectUrl={
            Platform.OS === "web"
              ? window.location.origin
              : `${SCHEME_FROM_APP_JSON}://`
          }
          storageOptions={{
            asyncStorage: AsyncStorage,
          }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={!connector.connected ? "Welcome" : "Home"}>
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ title: "Welcome", headerShown: false }}
              />
              <Stack.Screen
                name="Root"
                component={RootScreen}
                options={{ title: "Home", headerShown: false }}
              />
              <Stack.Group>
                <Stack.Screen
                  name="Camera"
                  component={CameraMinter}
                  options={{ title: "Camera", headerShown: false }}
                />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </WalletConnectProvider>
      </AppProvider>
    </TailwindProvider>
  );
};
