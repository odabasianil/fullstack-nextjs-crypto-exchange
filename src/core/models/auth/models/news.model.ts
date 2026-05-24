export interface NewsItem {
    id: number;
    tenantId: string;
    createdDate?: string;
    createDate?: string;
    status: boolean;
    title: string;
    content: string;
    order?: number;
    image?: string;
    categoryId?: number;
    url?: string;
}

export interface News {
    data?: NewsItem[];
}