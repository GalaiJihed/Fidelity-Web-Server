import { StoreType } from './StoreType';

export interface Product {
    id: number;
    ProductName: String;
    Reference: String;
    Price: number;
    storeID: number;
    Image: String;
    ProductStore: StoreType;


}
