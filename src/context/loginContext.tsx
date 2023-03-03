import { createContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import {
  loginSchema,
  registerUserSchema,
} from "../validations/forms.validations";
import {
  IForgotPasswordForm,
  ILoginContextValues,
  ILoginDataProps,
} from "../interfaces/login.interface";
import { IContextProps, IUser } from "../interfaces/user.interface";

export const LoginContext = createContext<ILoginContextValues>(
  {} as ILoginContextValues
);

const LoginProvider = ({ children }: IContextProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("@tokenId:token")
  );

  const [user, setUser] = useState<IUser | null>(null);

  const [isModalSucessAccount, setIsModalSucessAccount] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

 
  const {
    register: login,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
  } = useForm<ILoginDataProps>({
    resolver: yupResolver(loginSchema),
  });

  const handleRegisterValues = (data: IUser) => {
    console.log("entrando na func");
    api
      .post("/users", data)

      .then((res) => {
        console.log(res);
        navigate("/login");
        setIsModalSucessAccount(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleForgotPasswordValues = (data: IForgotPasswordForm) => {
    api
      .patch("/forgotPassword", data)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleLoginValues = (data: ILoginDataProps) => {
    console.log("entrando na func");
    api
      .post("/login", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("@tokenId:token", res.data.token);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoginContext.Provider
      value={{
        login,
        // register,
        handleLoginValues,
        handleRegisterValues,
        loginErrors,
        // registerErrors,
        handleForgotPasswordValues,
        token,
        setToken,
        user,
        loading,
        isModalSucessAccount,
        setIsModalSucessAccount,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
