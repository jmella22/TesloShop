import React, { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import Cookie from "js-cookie";
import { tesloApi } from "../../api";
import { IUser } from "../../interface";
import { authReducer, AuthContext } from "./";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITAL_STATE);
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      console.log(data.user);
      // dispatch({ type: "AUTH_LOGIN", payload: data.user as IUser });
    }
  }, [status, data]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async () => {
    if (!Cookie.get("token")) {
      return;
    }
    try {
      const { data } = await tesloApi.get("/user/validate-token");
      const { token, user } = data;
      Cookie.set("token", token);
      dispatch({ type: "AUTH_LOGIN", payload: user });
    } catch (error) {
      Cookie.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;
      Cookie.set("token", token);
      dispatch({ type: "AUTH_LOGIN", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };
  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("/user/registre", {
        email,
        password,
        name,
      });
      const { token, user } = data;
      Cookie.set("token", token);
      dispatch({ type: "AUTH_LOGIN", payload: user });
      return {
        hasError: false,
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        return {
          hasError: true,
          message: error.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo crear el usuario intente de nuevo ",
      };
    }
  };

  const loguotUser = () => {
    Cookie.remove("token");
    Cookie.remove("cart");
    Cookie.remove("firstname");
    Cookie.remove("lastName");
    Cookie.remove("address");
    Cookie.remove("address2");
    Cookie.remove("city");
    Cookie.remove("country");
    Cookie.remove("zip");
    Cookie.remove("phone");

    router.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //Methods
        loginUser,
        registerUser,
        loguotUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
