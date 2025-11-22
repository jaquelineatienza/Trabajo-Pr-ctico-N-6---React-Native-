import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BarcodeScanner from "../components/BarcodeScanner";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductList from "../components/ProductList";
import { COLORS } from "../constants/colors";
import { Product } from "../constants/Product";
import { RootStackParamList } from "../constants/types";
import { useProducts } from "../hooks/useProducts";

type ProductManagementScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProductManagement"
>;

type Props = {
  navigation: ProductManagementScreenNavigationProp;
};

const ProductManagementScreen: React.FC<Props> = ({ navigation }) => {
  const {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductByBarcode,
    clearError,
  } = useProducts();

  const [showScanner, setShowScanner] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState("");

  const handleBarcodeScanned = (barcode: string) => {
    setScannedBarcode(barcode);
    setShowScanner(false);

    // Verificar si el producto ya existe
    const existingProduct = getProductByBarcode(barcode);

    if (existingProduct) {
      Alert.alert(
        "Producto Existente",
        `El producto "${existingProduct.name}" ya está registrado. ¿Quieres editarlo?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Editar",
            onPress: () =>
              navigation.navigate("ProductForm", { product: existingProduct }),
          },
        ]
      );
    } else {
      // Navegar al formulario con el código escaneado
      navigation.navigate("ProductForm", {
        product: undefined,
      });
    }
  };

  const handleAddProduct = () => {
    setShowScanner(true);
  };

  const handleEditProduct = (product: Product) => {
    navigation.navigate("ProductForm", { product });
  };

  const handleDeleteProduct = async (productId: string) => {
    const result = await deleteProduct(productId);

    if (result.success) {
      Alert.alert("Éxito", "Producto eliminado correctamente");
    } else {
      Alert.alert("Error", result.error || "Error al eliminar el producto");
    }
  };

  const handleAddProductSubmit = async (productData: any) => {
    const result = await addProduct(productData);
    return result;
  };

  const handleUpdateProductSubmit = async (
    productId: string,
    productData: any
  ) => {
    const result = await updateProduct(productId, productData);
    return result;
  };

  // Mostrar errores
  React.useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
      clearError();
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Productos</Text>
        <Text style={styles.subtitle}>
          {products.length} producto{products.length !== 1 ? "s" : ""}{" "}
          registrado{products.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <TouchableOpacity style={styles.scanButton} onPress={handleAddProduct}>
        <Text style={styles.scanButtonText}>Escanear Código de Barras</Text>
      </TouchableOpacity>

      {loading ? (
        <LoadingSpinner message="Cargando productos..." />
      ) : (
        <ProductList
          products={products}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          loading={loading}
        />
      )}

      <Modal
        visible={showScanner}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <BarcodeScanner
          onBarcodeScanned={handleBarcodeScanned}
          onClose={() => setShowScanner(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
  },
  scanButton: {
    backgroundColor: COLORS.primary,
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scanButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductManagementScreen;
