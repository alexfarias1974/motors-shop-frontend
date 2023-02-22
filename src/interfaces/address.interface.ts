export interface IAddress {
    zipCode: string;
    state: string;
    city: string;
    street: string;
    number?: number | null;
    complement?: string | null;
}