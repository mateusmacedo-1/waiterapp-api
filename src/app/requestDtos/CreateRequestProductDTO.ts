export interface CreateRequestProductDTO {
    name: string;
    description: string;
    image: File;
    price: number;
    category: string;
    ingredients: {
        icon: string;
        name: string;
    }[];
}