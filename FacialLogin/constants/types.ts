import { CameraType } from 'expo-camera';
import { StyleProp, ViewStyle } from 'react-native';
import { Product } from '../constants/Product';

export type RootStackParamList = {
    Login: undefined;
    Welcome: undefined;
    FacialRegistration: undefined;
    FacialLogin: undefined;
    Panel: undefined;
    ProductManagement: undefined;
    ProductForm: { product?: Product };
    BarcodeScanner: { onBarcodeScanned: (barcode: string) => void };
};

export interface CameraComponentProps {
    facing: CameraType;
    onCameraReady?: () => void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export interface BarcodeScannerProps {
    onBarcodeScanned: (barcode: string) => void;
    onClose: () => void;
}