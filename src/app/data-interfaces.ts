export interface IProductDetail {
    color: string;
    size: string;
    material: string;
    price: number;
    product_detail_id: number;
    product_id: number;
    stock: number;
}

export interface IProduct {
    id: number;
    slug: string;
    name: string;
    description: string;
    categories: object[];
    sub_categories: object[];
    discount_type: string;
    discount_value: number;
    price: number;
    details: IProductDetail[];
    discountPercentage?: number;
    rating: number;
    stock: number;
    reviews: string[];
    cover_image: string;
    images: string[];
}

export interface IProductRequest {
    products: IProduct[];
    total: number;
    skip: number;
    limit: number;
}

