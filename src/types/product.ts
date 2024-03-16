export type ProductState = {
    products: Product[],
    defaultProducts: Product[]
    cart: CartItem[],
    orders: Order[]
    currentProduct: Product | null,
}

export type Product = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    count: number;
    price: number;
}

export type CartItem = {
    product: Product;
    amount: number
}

export type Order = {
    id: string;
    date: string;
    finalPrice: number;
    items: CartItem[];
}