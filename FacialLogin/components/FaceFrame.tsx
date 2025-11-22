import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";

const FaceFrame: React.FC = () => {
  return (
    <View style={styles.faceFrame}>
      <View style={styles.cornerTopLeft} />
      <View style={styles.cornerTopRight} />
      <View style={styles.cornerBottomLeft} />
      <View style={styles.cornerBottomRight} />
    </View>
  );
};

const styles = StyleSheet.create({
  faceFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: "transparent",
    borderRadius: 20,
    position: "relative",
  },
  cornerTopLeft: {
    position: "absolute",
    top: -2,
    left: -2,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: COLORS.primary,
  },
  cornerTopRight: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: COLORS.primary,
  },
  cornerBottomLeft: {
    position: "absolute",
    bottom: -2,
    left: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: COLORS.primary,
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: COLORS.primary,
  },
});

export default FaceFrame;
