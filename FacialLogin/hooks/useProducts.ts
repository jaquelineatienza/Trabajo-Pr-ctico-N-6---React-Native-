import { useState } from 'react';
import { Product, ProductFormData } from '../constants/Product';
import { useAsyncStorage } from './useAsyncStorage';

// Datos iniciales hardcodeados
const initialProducts: Product[] = [
    {
        id: '1',
        barcode: '1234567890123',
        name: 'Laptop Gaming',
        description: 'Laptop para gaming de alta performance',
        price: 1200,
        quantity: 5,
        category: 'Electrónicos',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        barcode: '9876543210987',
        name: 'Smartphone',
        description: 'Teléfono inteligente última generación',
        price: 800,
        quantity: 10,
        category: 'Electrónicos',
        createdAt: new Date().toISOString(),
    },
];

export const useProducts = () => {
    const { value: products, setValue: setProducts, loading } = useAsyncStorage<Product[]>('products', initialProducts);
    const [operationLoading, setOperationLoading] = useState(false);
    const [operationError, setOperationError] = useState<string | null>(null);

    const addProduct = async (productData: ProductFormData) => {
        setOperationLoading(true);
        setOperationError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay

            const newProduct: Product = {
                ...productData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
            };

            const updatedProducts = [...(products || []), newProduct];
            await setProducts(updatedProducts);

            return { success: true };
        } catch (error) {
            const errorMessage = 'Error al agregar el producto';
            setOperationError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setOperationLoading(false);
        }
    };

    const updateProduct = async (id: string, productData: ProductFormData) => {
        setOperationLoading(true);
        setOperationError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay

            const updatedProducts = (products || []).map(product =>
                product.id === id
                    ? { ...productData, id, createdAt: product.createdAt }
                    : product
            );

            await setProducts(updatedProducts);
            return { success: true };
        } catch (error) {
            const errorMessage = 'Error al actualizar el producto';
            setOperationError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setOperationLoading(false);
        }
    };

    const deleteProduct = async (id: string) => {
        setOperationLoading(true);
        setOperationError(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay

            const updatedProducts = (products || []).filter(product => product.id !== id);
            await setProducts(updatedProducts);

            return { success: true };
        } catch (error) {
            const errorMessage = 'Error al eliminar el producto';
            setOperationError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setOperationLoading(false);
        }
    };

    const getProductByBarcode = (barcode: string): Product | undefined => {
        return (products || []).find(product => product.barcode === barcode);
    };

    const clearError = () => setOperationError(null);

    return {
        products: products || [],
        loading: loading || operationLoading,
        error: operationError,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductByBarcode,
        clearError,
    };
};