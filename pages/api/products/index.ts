import type { NextApiRequest, NextApiResponse } from "next";
import { db, SHOP_CONSTANTS } from "../../../database";
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
      return getProducts(req, res);

    default:
      return res.status(400).json({ message: "bad request" });
  }
}
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = "all" } = req.query;

  let condition = {};
  if (gender !== "all" && SHOP_CONSTANTS.validGender.includes(`${gender}`)) {
    condition = { gender };
  }
  await db.connect();
  const products = await ProductModel.find(condition)
    .select("title images price inStock slug -_id")
    .lean();
  await db.disconnect();
  return res.status(200).json(products);
};
