import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  IContextProps,
  IUserContextProviderValues,
} from "../interfaces/user.interface";
import { LoginContext } from "./loginContext";

export const UserContext = createContext<IUserContextProviderValues>(
  {} as IUserContextProviderValues
);

const UserContextProvider = ({ children }: IContextProps) => {
  const [createVehicleModalOpen, setCreateVehicleModalOpen] =
    useState<boolean>(false);
  const [editVehicleModalOpen, setEditVehicleModalOpen] =
    useState<boolean>(false);
  const [editVehicleId, setEditVehicleId] = useState<string>("");
  const { setToken, token } = useContext(LoginContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/login", { replace: true });
  };

  // const loginData = (data: ILoginDataProps) => {
  //   api
  //     .post<ILoginDataResponse>("/login", data)
  //     .then((response) => {
  //       setUser(response.data.user);
  //       window.localStorage.clear();
  //       window.localStorage.setItem("@userToken", response.data.token);
  //       window.localStorage.setItem(
  //         "@userID",
  //         response.data.user.id.toString()
  //       );
  //       navigate("/home", { replace: true });
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const toRegister = () => {
  //   navigate("/register", { replace: true });
  // };

  // const signUp = (data: IRegisterForm) => {
  //   const { passwordConfirmation, ...infoToAPI } = data;
  //   const reqUser: IRequestRegisterForm = {
  //     name: infoToAPI.name,
  //     email: infoToAPI.email,
  //     cpf: infoToAPI.cpf,
  //     phone: infoToAPI.phone,
  //     birthdate: infoToAPI.birthdate,
  //     description: infoToAPI.description,
  //     address: {
  //       zipCode: infoToAPI.zipCode,
  //       state: infoToAPI.state,
  //       city: infoToAPI.city,
  //       street: infoToAPI.street,
  //       number: infoToAPI.number,
  //       complement: infoToAPI.complement,
  //     },
  //     accountType: infoToAPI.accountType,
  //     password: infoToAPI.password,
  //     isAdm: false,
  //   };

  //   api
  //     .post<IUser>("/users", reqUser)
  //     .then((response) => {
  //       navigate("/login", { replace: true });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <UserContext.Provider
      value={{
        logout,
        createVehicleModalOpen,
        setCreateVehicleModalOpen,
        editVehicleModalOpen,
        setEditVehicleModalOpen,
        editVehicleId,
        setEditVehicleId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
