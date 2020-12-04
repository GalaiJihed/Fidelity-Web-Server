import { Store } from './Store';

export interface Product {
    id: number;
    ProductName: String;
    Reference: String;
    Price: number;
    ReductionPerc : number;
    PromoPrice: number;
    FP : number;
    ProductStore: Store;
    Image: any;
  


}
