import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { STYLES } from "../constants/styles";
import { RootStackParamList } from "../constants/types";
import { useAsyncStorage } from "../hooks/useAsyncStorage";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { value: hasRegisteredFace } = useAsyncStorage(
    "hasRegisteredFace",
    false
  );

  return (
    <View style={STYLES.container}>
      <Text style={STYLES.title}>Iniciar Sesión</Text>

      {/* Botones de login existentes */}
      <TouchableOpacity
        style={STYLES.button}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={STYLES.buttonText}>Login Clásico</Text>
      </TouchableOpacity>

      {/* Nuevo botón de login facial */}
      <TouchableOpacity
        style={[STYLES.button, { backgroundColor: "#5856D6" }]}
        onPress={() => navigation.navigate("FacialLogin")}
      >
        <Text style={STYLES.buttonText}>
          {hasRegisteredFace
            ? "Ingresar con Rostro"
            : "Configurar Reconocimiento Facial"}
        </Text>
      </TouchableOpacity>

      {/* Botón de registro facial */}
      <TouchableOpacity
        style={[STYLES.button, { backgroundColor: "#34C759" }]}
        onPress={() => navigation.navigate("FacialRegistration")}
      >
        <Text style={STYLES.buttonText}>Registrar Rostro</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
