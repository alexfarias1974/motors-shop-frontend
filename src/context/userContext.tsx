import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

  useEffect(() => {
    const token = localStorage.getItem("@tokenId:token");
    if (token) {
      const timerWarning = setTimeout(() => {
        toast.error("Seu login está prestes a expirar!");
      }, 42900000);

      const timerOut = setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, 43000000);
      return () => {
        clearTimeout(timerOut);
        clearTimeout(timerWarning);
      };
    }
  }, []);

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
