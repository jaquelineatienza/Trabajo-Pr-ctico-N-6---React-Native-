import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { sendRegister } from "../utils/api";
import { setFacialRegistered } from "../utils/storage";

export default function FacialRegisterScreen({ navigation }: any) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [cuil, setCuil] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const takePhoto = async () => {
    if (!cameraRef) return;

    setLoading(true);

    const picture = await cameraRef.takePictureAsync({ base64: false });

    const res = await sendRegister(cuil, picture.uri);

    setLoading(false);

    if (res.success) {
      await setFacialRegistered(true);
      alert("Rostro registrado correctamente.");
      navigation.goBack();
    } else {
      alert("Error registrando rostro: " + res.message);
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text>Debe permitir usar la cámara.</Text>
        <Button title="Permitir" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      <Camera style={{ flex: 4 }} ref={(ref) => setCameraRef(ref)} />
      <View style={styles.bottom}>
        <TextInput
          placeholder="Ingrese CUIL"
          style={styles.input}
          value={cuil}
          onChangeText={setCuil}
        />

        <Button title="Registrar rostro" onPress={takePhoto} disabled={!cuil} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flex: 2,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
