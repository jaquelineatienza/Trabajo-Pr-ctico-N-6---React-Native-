import { CameraType } from 'expo-camera';
import { StyleProp, ViewStyle } from 'react-native';

export type RootStackParamList = {
    Login: undefined;
    Welcome: undefined;
    FacialRegistration: undefined;
    FacialLogin: undefined;
    Panel: undefined;
};

export interface CameraComponentProps {
    facing: CameraType;
    onCameraReady?: () => void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}