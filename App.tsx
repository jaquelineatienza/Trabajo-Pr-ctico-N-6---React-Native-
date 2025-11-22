import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import CameraLoginScreen from "./screens/CameraLoginScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="CameraLogin"
          component={CameraLoginScreen}
          options={{ title: "Login Facial" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Bienvenido" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
