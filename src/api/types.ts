
export type Product  = {
    id:number,
    name:string,
    price:number,
    qty:number,
}


export interface Order {
  id: number;
  products: Product[];
  created_at: string;
  updated_at: string;
  qty: number;
  paid: boolean;
}

export interface OrderFormValues {
    products: number[];
    qty: number;
    paid: boolean;
  }