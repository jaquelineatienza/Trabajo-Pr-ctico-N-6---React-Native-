import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Camera, useCameraPermissions } from "expo-camera";
import { sendRecognize } from "../utils/api";

export default function FacialLoginScreen({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const takePhoto = async () => {
    if (!cameraRef) return;

    setLoading(true);

    const picture = await cameraRef.takePictureAsync();

    const res = await sendRecognize(picture.uri);

    setLoading(false);

    if (res.success) {
      navigation.replace("Dashboard");
    } else {
      alert("No se pudo reconocer el rostro");
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
        <Button title="Ingresar con rostro" onPress={takePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: { flex: 2, padding: 20, justifyContent: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
