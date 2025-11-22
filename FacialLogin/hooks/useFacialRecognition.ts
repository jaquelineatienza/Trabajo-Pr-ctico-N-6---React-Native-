import { useState } from 'react';
import { FacialAuthResponse, FacialAuthService } from '../services/facialAuthService';

export const useFacialRecognition = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const registerFace = async (cuil: string, imageUri: string): Promise<FacialAuthResponse> => {
        setLoading(true);
        setError(null);

        try {
            const result = await FacialAuthService.registerWithFace(cuil, imageUri);
            if (!result.success) {
                setError(result.message || 'Error en el registro facial');
            }
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error de conexión';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const loginWithFace = async (imageUri: string): Promise<FacialAuthResponse> => {
        setLoading(true);
        setError(null);

        try {
            const result = await FacialAuthService.loginWithFace(imageUri);
            if (!result.success) {
                setError(result.message || 'Error en el reconocimiento facial');
            }
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error de conexión';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    return {
        registerFace,
        loginWithFace,
        loading,
        error,
        clearError,
    };
};