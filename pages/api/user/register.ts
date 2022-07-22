import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { db } from "../../../database";
import { UserModel } from "../../../models";
import { jwt, validations } from "../../../utils";

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
    case "POST":
      return registerUser(req, res);

    default:
      return res.status(400).json({ message: "bad request" });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { email: string; password: string; name: string };

  //Validaciones
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "El password debe ser de al menos 6 caracteres" });
  }

  if (name.length < 2) {
    return res
      .status(400)
      .json({ message: "El nombre debe ser de al menos 2 caracteres" });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: "El correo no es permitido" });
  }

  //revisar base de datos si existe el correo
  await db.connect();
  const user = await UserModel.findOne({ email });
  if (user) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "El correo ya se encuentra registrado" });
  }

  //Crear nuevo usario
  const newUser = new UserModel({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role: "client",
    name,
  });

  //validar nuevo usuario
  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Revisar logs del servidor" });
  }

  const token = jwt.signToken(newUser._id, newUser.email);
  return res.status(200).json({
    token,
    user: {
      email: newUser.email,
      name,
      role: "client",
    },
  });
};
