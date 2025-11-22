import { BarcodeScanningResult, Camera, CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoadingSpinner from "../components/LoadingSpinner";
import { COLORS } from "../constants/colors";
import { BarcodeScannerProps } from "../constants/types";

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onBarcodeScanned,
  onClose,
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = (scanningResult: BarcodeScanningResult) => {
    if (!scanned && !isProcessing) {
      setScanned(true);
      setIsProcessing(true);

      const { data } = scanningResult;

      // Simular procesamiento
      setTimeout(() => {
        onBarcodeScanned(data);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setIsProcessing(false);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <LoadingSpinner message="Solicitando permisos de cámara..." />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Sin acceso a la cámara</Text>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "pdf417",
            "upc_e",
            "code39",
            "ean13",
            "ean8",
            "code128",
          ],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.scannerFrame}>
            <View style={[styles.corner, styles.cornerTopLeft]} />
            <View style={[styles.corner, styles.cornerTopRight]} />
            <View style={[styles.corner, styles.cornerBottomLeft]} />
            <View style={[styles.corner, styles.cornerBottomRight]} />
          </View>

          <Text style={styles.instruction}>
            Enfoca el código de barras o QR dentro del marco
          </Text>

          {isProcessing && (
            <View style={styles.processingOverlay}>
              <LoadingSpinner message="Procesando código..." />
            </View>
          )}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>

            {scanned && (
              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={resetScanner}
              >
                <Text style={styles.scanAgainButtonText}>
                  Escanear de nuevo
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </CameraView>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scannerFrame: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: "transparent",
    position: "relative",
    marginBottom: 20,
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: COLORS.primary,
  },
  cornerTopLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTopRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  instruction: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
  processingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  closeButton: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  scanAgainButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  scanAgainButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    color: COLORS.white,
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BarcodeScanner;
