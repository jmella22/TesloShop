import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interface";
import { ProductModel } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return searchProducts(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}
const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { q = "" } = req.query;

  if (q.length === 0) {
    return res
      .status(400)
      .json({ message: "debe especificar el query de busqueda" });
  }

  q = q.toString().toLowerCase();

  await db.connect();
  const products = await ProductModel.find({ $text: { $search: q } })
    .select("title images price inStock slug -_id")
    .lean();
  await db.disconnect();
  res.status(200).json(products);
};
