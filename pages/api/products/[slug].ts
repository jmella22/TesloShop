import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interface";
import { ProductModel } from "../../../models";

type Data = { message: string } | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({ message: "bad request" });
  }
}
const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { slug } = req.query;

  await db.connect();
  const product = await ProductModel.findOne({ slug }).lean();
  await db.disconnect();
  if (!product) {
    res.status(404).json({ message: "articulo no encontrado" });
  }
  return res.status(200).json(product as IProduct);
};
