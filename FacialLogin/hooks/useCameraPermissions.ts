import { useCameraPermissions as useExpoCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';

export const useCameraPermissions = () => {
    const [permission, requestPermission] = useExpoCameraPermissions();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (permission) {
            setIsLoading(false);
        }
    }, [permission]);

    return {
        permission,
        requestPermission,
        isLoading,
    };
};