import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useAsyncStorage = <T>(key: string, defaultValue: T) => {
    const [value, setValue] = useState<T>(defaultValue);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStoredValue();
    }, []);

    const loadStoredValue = async () => {
        try {
            const storedValue = await AsyncStorage.getItem(key);
            if (storedValue !== null) {
                setValue(JSON.parse(storedValue));
            }
        } catch (error) {
            console.error(`Error loading ${key} from storage:`, error);
        } finally {
            setLoading(false);
        }
    };

    const setStoredValue = async (newValue: T) => {
        try {
            setValue(newValue);
            await AsyncStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
            console.error(`Error saving ${key} to storage:`, error);
        }
    };

    const removeStoredValue = async () => {
        try {
            setValue(defaultValue);
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from storage:`, error);
        }
    };

    return {
        value,
        setValue: setStoredValue,
        removeValue: removeStoredValue,
        loading,
    };
};