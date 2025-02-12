export default interface Product {
  id: string;
  name: string;
  image: string;
  type: string;
  old_price: number;
  actual_price: number;
  description: string;
  additional: string;
  size: string;
  color: string;
  SKU: string;
  category: string;
  tags: string[];
  quantity?: number;
}