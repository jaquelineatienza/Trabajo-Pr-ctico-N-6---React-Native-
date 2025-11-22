import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Procesando...",
  size = "large",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={COLORS.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
  },
});

export default LoadingSpinner;
