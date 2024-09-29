export interface IProduct {
    id: number;
    slug: string;
    name: string;
    description: string;
    // category: string;
    price: number;
    // discountPercentage?: number;
    rating: number;
    stock: number;
    // tags: string[];
    reviews: number;
    images: string[];
    colors: string[];
    sizes: string[];
}

export interface IProductRequest {
    products: IProduct[];
    total: number;
    skip: number;
    limit: number;
}