import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CameraView } from "expo-camera";
import React, { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LoadingSpinner from "../components/ProductForm";
import { COLORS } from "../constants/colors";
import { STYLES } from "../constants/styles";
import { RootStackParamList } from "../constants/types";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { useFacialRecognition } from "../hooks/useFacialRecognition";

type FacialRegistrationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

type Props = {
  navigation: FacialRegistrationScreenNavigationProp;
};

const FacialRegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [cuil, setCuil] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const { registerFace, loading, error } = useFacialRecognition();
  const { setValue: setHasRegisteredFace } = useAsyncStorage(
    "hasRegisteredFace",
    false
  );

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo.uri);
      } catch (error) {
        Alert.alert("Error", "No se pudo tomar la foto");
      }
    }
  };

  const handleRegister = async () => {
    if (!cuil.trim()) {
      Alert.alert("Error", "Por favor ingresa tu CUIL");
      return;
    }

    if (!photoUri) {
      Alert.alert("Error", "Por favor toma una foto primero");
      return;
    }

    const result = await registerFace(cuil, photoUri);

    if (result.success) {
      await setHasRegisteredFace(true);
      Alert.alert("Éxito", "Rostro registrado correctamente", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert("Error", result.message || "Error en el registro");
    }
  };

  const retakePhoto = () => {
    setPhotoUri(null);
  };

  if (loading) {
    return (
      <View style={STYLES.container}>
        <LoadingSpinner message="Registrando tu rostro..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!photoUri ? (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="front"
          mode="picture"
        >
          <View style={styles.overlay}>
            <View style={styles.faceFrame} />
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Vista previa</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu CUIL"
            value={cuil}
            onChangeText={setCuil}
            keyboardType="numeric"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={retakePhoto}
            >
              <Text style={STYLES.buttonText}>Retomar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={STYLES.button} onPress={handleRegister}>
              <Text style={STYLES.buttonText}>Registrar rostro</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  faceFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: "transparent",
    borderRadius: 125,
  },
  captureButton: {
    position: "absolute",
    bottom: 50,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
  },
  previewContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  previewTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 30,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  secondaryButton: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
});

export default FacialRegistrationScreen;
