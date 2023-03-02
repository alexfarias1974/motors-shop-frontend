import { FieldValues, SubmitHandler } from "react-hook-form";
import { IAddress } from "./address.interface";
import { ILoginDataProps } from "./login.interface";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { ICar } from "../components/ProductCardAdvertiser";

export interface IContextProps {
  children: ReactNode;
}

export interface IUser {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthdate: Date;
  description: string;
  address: IAddress;
  accountType: string;
  id?: string;
  isAdm?: boolean;
  password: string;
}

export interface IRegisterUserForm {
  registerUserSubmit: SubmitHandler<FieldValues>;
}

export interface IRegisterForm {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthdate: Date;
  description: string;
  zipCode: string;
  state: string;
  city: string;
  street: string;
  number?: number | null;
  complement?: string | null;
  accountType: string;
  password: string;
  passwordConfirmation: string;
}

export interface IRequestRegisterForm {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthdate: Date;
  description: string;
  address: IAddress;
  accountType: string;
  password: string;
  isAdm: boolean;
}

export interface IUserContextProviderValues {
  logout: () => void;
  // loginData: (data: ILoginDataProps) => void;
  // toRegister: () => void;
  // user: IUser | null;
  // signUp: (data: IRegisterForm) => void;
  // loading: boolean;
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  createVehicleModalOpen: boolean;
  setCreateVehicleModalOpen: Dispatch<SetStateAction<boolean>>;
  editVehicleModalOpen: boolean;
  setEditVehicleModalOpen: Dispatch<SetStateAction<boolean>>;
  editVehicleId: string;
  setEditVehicleId: Function;
  carPageId: string;
  setCarPageId: Function;
}

export interface IUserPatchForm {
  name?: string;
  email?: string;
  cpf?: number;
  phone?: number;
  birthdate?: Date;
  description?: string;
}
