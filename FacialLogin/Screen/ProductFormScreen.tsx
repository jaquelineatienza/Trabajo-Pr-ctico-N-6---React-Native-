import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import ProductForm from "../components/ProductForm";
import { RootStackParamList } from "../constants/types";
import { useProducts } from "../hooks/useProducts";

type ProductFormScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ProductForm"
>;

const ProductFormScreen: React.FC<ProductFormScreenProps> = ({
  navigation,
  route,
}) => {
  const { product } = route.params || {};
  const { addProduct, updateProduct, loading } = useProducts();

  const handleSubmit = async (productData: any) => {
    if (product) {
      // Actualizar producto existente
      return await updateProduct(product.id, productData);
    } else {
      // Agregar nuevo producto
      return await addProduct(productData);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ProductForm
        product={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default ProductFormScreen;
