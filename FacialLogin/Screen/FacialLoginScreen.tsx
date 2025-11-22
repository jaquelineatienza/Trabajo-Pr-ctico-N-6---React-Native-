import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CameraView } from "expo-camera";
import React, { useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";
import { STYLES } from "../constants/styles";
import { RootStackParamList } from "../constants/types";
import { useFacialRecognition } from "../hooks/useFacialRecognition";

type FacialLoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FacialLogin"
>;

type Props = {
  navigation: FacialLoginScreenNavigationProp;
};

const FacialLoginScreen: React.FC<Props> = ({ navigation }) => {
  const cameraRef = useRef<CameraView>(null);
  const { loginWithFace, loading } = useFacialRecognition();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFacialLogin = async () => {
    if (cameraRef.current && !isProcessing) {
      setIsProcessing(true);

      try {
        const photo = await cameraRef.current.takePictureAsync();
        const result = await loginWithFace(photo.uri);

        if (result.success) {
          Alert.alert("¡Éxito!", "Reconocimiento facial completado", [
            { text: "OK", onPress: () => navigation.navigate("Panel") },
          ]);
        } else {
          Alert.alert(
            "Error",
            result.message || "No se pudo reconocer tu rostro"
          );
        }
      } catch (error) {
        Alert.alert("Error", "Error al procesar la imagen");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  if (loading) {
    return <View></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="front"
        mode="picture"
      >
        <View>
          <View
            style={{
              width: 250,
              height: 250,
              borderWidth: 2,
              borderColor: COLORS.primary,
              backgroundColor: "transparent",
              borderRadius: 125,
            }}
          />

          <View>
            <TouchableOpacity
              style={[STYLES.button, isProcessing && { opacity: 0.5 }]}
              onPress={handleFacialLogin}
              disabled={isProcessing}
            >
              <Text>
                {isProcessing ? "Procesando..." : "Iniciar Sesión con Rostro"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

export default FacialLoginScreen;
