export interface Card {
    title: string,
    content: string
}

export interface Column {
    pos: number,
    title: string
};

export enum BUTTON_TYPES {
    OK,
    NO
};