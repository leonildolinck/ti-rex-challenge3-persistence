export default interface Product {
  id: string;
  name: string;
  image: string[];
  scene: string[];
  type: string;
  oldPrice: number;
  price: number;
  description: string;
  additional: string;
  size: string;
  color: string;
  SKU: string;
  category: string;
  tags: string[];
  quantity?: number;
}