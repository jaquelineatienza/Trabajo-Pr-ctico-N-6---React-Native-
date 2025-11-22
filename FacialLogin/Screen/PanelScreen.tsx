import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";
import { RootStackParamList } from "../constants/types";

type PanelScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Panel"
>;

type Props = {
  navigation: PanelScreenNavigationProp;
};

const PanelScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("ProductManagement")}
        >
          <Text style={styles.menuItemText}>Gestión de Productos</Text>
          <Text style={styles.menuItemDescription}>
            Escanear códigos de barras y gestionar inventario
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("FacialRegistration")}
        >
          <Text style={styles.menuItemText}>Registro Facial</Text>
          <Text style={styles.menuItemDescription}>
            Registrar rostro para autenticación
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("FacialLogin")}
        >
          <Text style={styles.menuItemText}>Login Facial</Text>
          <Text style={styles.menuItemDescription}>
            Iniciar sesión con reconocimiento facial
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: COLORS.black,
  },
  menu: {
    gap: 15,
  },
  menuItem: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 5,
  },
  menuItemDescription: {
    fontSize: 14,
    color: COLORS.gray,
  },
});

export default PanelScreen;
