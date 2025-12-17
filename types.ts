export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  category: 'floral' | 'woody' | 'oriental' | 'fresh' | 'citrus';
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  SHOP = 'SHOP',
  PRODUCT_DETAILS = 'PRODUCT_DETAILS'
}
