import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LoadingSpinner from "../components/LoadingSpinner";
import { COLORS } from "../constants/colors";
import { Product, ProductFormData } from "../constants/Product";

interface ProductFormProps {
  product?: Product;
  onSubmit: (
    data: ProductFormData
  ) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
  loading?: boolean;
  initialBarcode?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  loading = false,
  initialBarcode = "",
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    barcode: initialBarcode,
    name: "",
    description: "",
    price: 0,
    quantity: 1,
    category: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormData, string>>
  >({});

  useEffect(() => {
    if (product) {
      setFormData({
        barcode: product.barcode,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
      });
    } else if (initialBarcode) {
      setFormData((prev) => ({ ...prev, barcode: initialBarcode }));
    }
  }, [product, initialBarcode]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.barcode.trim()) {
      newErrors.barcode = "El código de barras es requerido";
    }

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (formData.price <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
    }

    if (formData.quantity < 0) {
      newErrors.quantity = "La cantidad no puede ser negativa";
    }

    if (!formData.category.trim()) {
      newErrors.category = "La categoría es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Error", "Por favor completa todos los campos requeridos");
      return;
    }

    const result = await onSubmit(formData);

    if (result.success) {
      Alert.alert(
        "Éxito",
        product
          ? "Producto actualizado correctamente"
          : "Producto agregado correctamente",
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        "Error",
        result.error || "Ocurrió un error al guardar el producto"
      );
    }
  };

  const handleChange = (
    field: keyof ProductFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner
          message={
            product ? "Actualizando producto..." : "Agregando producto..."
          }
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Código de Barras *</Text>
          <TextInput
            style={[styles.input, errors.barcode && styles.inputError]}
            value={formData.barcode}
            onChangeText={(value) => handleChange("barcode", value)}
            placeholder="Ingresa el código de barras"
            editable={!product} // No editable cuando se está editando
          />
          {errors.barcode && (
            <Text style={styles.errorText}>{errors.barcode}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre *</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={formData.name}
            onChangeText={(value) => handleChange("name", value)}
            placeholder="Ingresa el nombre del producto"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(value) => handleChange("description", value)}
            placeholder="Ingresa la descripción del producto"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfInput]}>
            <Text style={styles.label}>Precio *</Text>
            <TextInput
              style={[styles.input, errors.price && styles.inputError]}
              value={formData.price.toString()}
              onChangeText={(value) =>
                handleChange("price", parseFloat(value) || 0)
              }
              placeholder="0.00"
              keyboardType="decimal-pad"
            />
            {errors.price && (
              <Text style={styles.errorText}>{errors.price}</Text>
            )}
          </View>

          <View style={[styles.inputGroup, styles.halfInput]}>
            <Text style={styles.label}>Cantidad *</Text>
            <TextInput
              style={[styles.input, errors.quantity && styles.inputError]}
              value={formData.quantity.toString()}
              onChangeText={(value) =>
                handleChange("quantity", parseInt(value) || 0)
              }
              placeholder="0"
              keyboardType="numeric"
            />
            {errors.quantity && (
              <Text style={styles.errorText}>{errors.quantity}</Text>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoría *</Text>
          <TextInput
            style={[styles.input, errors.category && styles.inputError]}
            value={formData.category}
            onChangeText={(value) => handleChange("category", value)}
            placeholder="Ingresa la categoría"
          />
          {errors.category && (
            <Text style={styles.errorText}>{errors.category}</Text>
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {product ? "Actualizar" : "Agregar"} Producto
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.white,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.gray,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    flex: 2,
    backgroundColor: COLORS.accent,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductForm;
