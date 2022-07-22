import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { UserModel } from "../../../models";
import { jwt } from "../../../utils";

type Data =
  | {
      message: string;
    }
  | { token: string; user: { name: string; email: string; role: string } };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return checkToken(req, res);

    default:
      return res.status(400).json({ message: "bad request" });
  }
}

const checkToken = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token no valido" });
  }

  await db.connect();
  const user = await UserModel.findById(userId).lean();
  await db.disconnect();
  if (!user) {
    return res.status(400).json({ message: "No existe el usario" });
  }

  const { name, role, _id, email } = user;
  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: {
      email,
      name,
      role,
    },
  });
};
