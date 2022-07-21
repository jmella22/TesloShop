import { ISize, IGender } from ".";

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  inStock: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: IGender;
  quantity: number;
}
