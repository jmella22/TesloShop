import { rejects } from "assert";
import jwt from "jsonwebtoken";

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("No hay semilla de JWT en tu variables de entorno");
  }

  return jwt.sign(
    //Payload
    { _id, email },
    //Seed
    process.env.JWT_SECRET_SEED,

    //Opcions
    { expiresIn: "30d" }
  );
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("No hay semilla de JWT en tu variables de entorno");
  }

  if (token.length <= 10) {
    return Promise.reject("Token no valido");
  }

  return new Promise((resolve, rejects) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || "", (err, payload) => {
        if (err) return rejects("JWT no es válido");

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      console.log(error);
      return rejects("JWT no es válido");
    }
  });
};
