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
  ILoginContextValues,
  ILoginDataProps,
  ITokenHeaders,
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

  useEffect(() => {
    const loadUser = () => {
      if (token) {
        api.defaults.headers = {
          Authorization: `Bearer ${token}`,
        } as ITokenHeaders;

        api.get<IUser>("/user").then(({ data }) => {
          setUser(data);
          navigate("/home", { replace: true });
        });
      }

      setLoading(false);
    };

    loadUser();
  }, [token]);

  const {
    register,
    handleSubmit: handleRegister,
    formState: { errors: registerErrors },
    reset: registerReset,
  } = useForm<IUser>({
    resolver: yupResolver(registerUserSchema),
  });

  const {
    register: login,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
    reset: loginReset,
  } = useForm<ILoginDataProps>({
    resolver: yupResolver(loginSchema),
  });

  const handleRegisterValues = handleRegister((data: IUser) => {
    api
      .post("/users", data)
      .then(({ data }) => {
        setIsModalSucessAccount(true);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleLoginValues = handleLogin((data: ILoginDataProps) => {
    api
      .post<{ token: string }>("/login", data)
      .then(({ data }) => {
        localStorage.setItem("@tokenId:token", data.token);
        setToken(localStorage.getItem("@tokenId:token"));
      })
      .catch((err) => console.log(err));

    loginReset();
  });

  return (
    <LoginContext.Provider
      value={{
        login,
        register,
        handleLoginValues,
        handleRegisterValues,
        loginErrors,
        registerErrors,
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
