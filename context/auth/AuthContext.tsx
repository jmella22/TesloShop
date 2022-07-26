import { createContext } from "react";
import { IUser } from "../../interface";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  //Methods
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;
  loguotUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);
