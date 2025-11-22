import { API_CONFIG } from '../constants/api';

export interface FacialAuthResponse {
    success: boolean;
    message?: string;
    cuil?: string;
}

export class FacialAuthService {
    static async registerWithFace(cuil: string, imageUri: string): Promise<FacialAuthResponse> {
        try {
            const formData = new FormData();
            formData.append('cuil', cuil);
            formData.append('image', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'face.jpg',
            } as any);

            const response = await fetch(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`,
                {
                    method: 'POST',
                    headers: {
                        ...API_CONFIG.HEADERS,
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return { success: true, ...data };
        } catch (error) {
            console.error('Error en registro facial:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Error desconocido'
            };
        }
    }

    static async loginWithFace(imageUri: string): Promise<FacialAuthResponse> {
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'face.jpg',
            } as any);

            const response = await fetch(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RECOGNIZE}`,
                {
                    method: 'POST',
                    headers: {
                        ...API_CONFIG.HEADERS,
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return { success: true, ...data };
        } catch (error) {
            console.error('Error en login facial:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Error desconocido'
            };
        }
    }
}