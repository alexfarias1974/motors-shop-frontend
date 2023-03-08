import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICar } from "../components/ProductCardAdvertiser";

import {
  IContextProps,
  IOwner,
  IUser,
  IUserContextProviderValues,
  IVehicle,
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

  const [owner, setOwner] = useState<IOwner>({} as IOwner);
  const [ownerCars, setOwnerCars] = useState<IVehicle[]>([]);


  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

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
        owner,
        setOwner,
        ownerCars,
        setOwnerCars,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
