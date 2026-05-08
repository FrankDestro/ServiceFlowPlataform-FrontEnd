export type SubCategoryTicketDTO = {
    id: number;
    name: string;
    description: string | null;
    active: boolean;
    categoryId: number;
    categoryName: string;
};

export type SubCategoryTicketFormDTO = {
    name: string;
    description: string | null;
    categoryId: number;
};

export type SubCategoryTicketSimpleDTO = {
    id: number;
    name: string;
};