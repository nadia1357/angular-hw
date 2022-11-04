export const sortParams = ['Name', 'Date', 'Number of Tasks'];
export const orderParams = ['ASC', 'DESC'];
export type sorts = 'Name' | 'Date' | 'Number of Tasks';
export type orders = 'ASC' | 'DESC';
export interface selectParams {
    name: string,
    sort: sorts,
    order: orders
}