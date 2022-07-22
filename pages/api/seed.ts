// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedDB } from "../../database";
import { ProductModel, UserModel } from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "No tiene acceso a este servicio" });
  }
  try {
    await db.connect();
    await UserModel.deleteMany();
    await UserModel.insertMany(seedDB.initialData.users);
    console.log("usuarios insertados");
    await ProductModel.deleteMany();
    await ProductModel.insertMany(seedDB.initialData.products);
    console.log("productos insertadas");
    await db.disconnect();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ message: "Se inserto la data correctamente" });
}
