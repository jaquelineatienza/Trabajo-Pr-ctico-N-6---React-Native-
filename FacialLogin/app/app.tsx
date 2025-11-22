import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "./constants/types";
import FacialLoginScreen from "./screens/FacialLoginScreen";
import FacialRegistrationScreen from "./screens/FacialRegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import PanelScreen from "./screens/PanelScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: "Bienvenido" }}
        />
        <Stack.Screen
          name="FacialRegistration"
          component={FacialRegistrationScreen}
          options={{ title: "Registro Facial" }}
        />
        <Stack.Screen
          name="FacialLogin"
          component={FacialLoginScreen}
          options={{ title: "Ingreso Facial", headerShown: false }}
        />
        <Stack.Screen
          name="Panel"
          component={PanelScreen}
          options={{ title: "Panel Principal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
