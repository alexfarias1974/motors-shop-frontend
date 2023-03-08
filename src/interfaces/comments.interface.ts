import { ICar } from "../components/ProductCardAdvertiser";
import { IUser } from "./user.interface";

export interface IComment {
  id: string;
  message: string;
  owner: IUser;
  vehicle: ICar;
}
