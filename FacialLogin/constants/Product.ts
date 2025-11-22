export interface Product {
    id: string;
    barcode: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    createdAt: string;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt'>;