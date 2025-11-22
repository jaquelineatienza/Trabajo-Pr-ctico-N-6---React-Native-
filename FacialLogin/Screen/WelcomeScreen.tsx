import React from "react";
import { Text, View } from "react-native";
import { STYLES } from "../constants/styles";

const WelcomeScreen: React.FC = () => {
  return (
    <View style={STYLES.container}>
      <Text style={STYLES.title}>¡Bienvenido!</Text>
      <Text style={STYLES.subtitle}>
        Has iniciado sesión exitosamente mediante reconocimiento facial
      </Text>
    </View>
  );
};

export default WelcomeScreen;
