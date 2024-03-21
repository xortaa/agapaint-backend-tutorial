export interface Inventory {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  __v: number;
}

export interface InventoryData { 
  name: string;
  description: string;
  quantity: number;
}
