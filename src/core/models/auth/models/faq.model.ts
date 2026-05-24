export interface Faq {
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