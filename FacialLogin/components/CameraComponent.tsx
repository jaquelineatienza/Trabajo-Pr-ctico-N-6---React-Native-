import { CameraView } from "expo-camera";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { CameraComponentProps } from "../constants/types";
import FaceFrame from "./FaceFrame";

const CameraComponent: React.FC<CameraComponentProps> = ({
  facing,
  onCameraReady,
  style,
  children,
}) => {
  const cameraRef = useRef<CameraView>(null);

  return (
    <CameraView
      ref={cameraRef}
      style={[styles.camera, style]}
      facing={facing}
      mode="picture"
      onCameraReady={onCameraReady}
    >
      <View style={styles.overlay}>
        <FaceFrame />
        {children}
      </View>
    </CameraView>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraComponent;
