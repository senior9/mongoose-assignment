
export type Tvariant =  {
    type: string;
    value: string;
}
export type Tinventory = {
    quantity: number;
    inStock: boolean;
}

export type Tproduct = {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: Tvariant[];
    inventory: Tinventory;
    isDelete ?:boolean;
}

// Define a nested type for updating inventory properties
export type TproductUpdate = Partial<Omit<Tproduct, 'inventory'>> & {
    inventory?: Partial<Tinventory>;
};