import { motion } from "framer-motion";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { IUser } from "../../interfaces/user.interface";

export interface ICar {
  id: string;
  title: string;
  year: number;
  mileage: number;
  description: string;
  price: number;
  images: [{ id: string; imageUrl: string }];
  owner: IUser;
}

export const ProductCardAdvertiser = (car: ICar) => {
  const { setEditVehicleModalOpen, setEditVehicleId } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="mx-auto max-w-[19.5rem] flex flex-col">
        <picture className="bg-grey7 rounded-xl h-[11rem] w-[19.5rem]">
          <img
            className="h-[11rem] w-[19.5rem] rounded"
            src={`${car.images[0].imageUrl}`}
            alt="Car Picture"
          />
        </picture>
        <h3 className="font-lexend font-bold text-grey1 mt-3 mb-4">
          {car.title.length > 31 ? `${car.title.slice(0, 31)}...` : car.title}
        </h3>
        <div className="flex flex-wrap break-word">
          <p className="h-12 font-inter text-sm font-normal text-grey2 mb-3">
            {car.description.length > 80
              ? `${car.description.slice(0, 80)}...`
              : car.description}
          </p>
        </div>

        <div className="flex flex-row justify-between mt-4 items-center">
          <div className="flex flex-row font-inter text-sm font-medium text-brand1">
            <h4 className="px-2 py-1 bg-brand4 rounded">{car.mileage} KM</h4>
            <h4 className="px-2 py-1 ml-3 bg-brand4 rounded">{car.year}</h4>
          </div>
          <div className="font-lexend font-medium text-base text-grey1 mr-3">
            <h4>
              {Number(car.price).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </h4>
          </div>
        </div>
        <div className="flex font-inter text-sm font-semibold text-grey1 gap-3 mt-6">
          <button
            className="border-#000 border-solid border-2 hover:bg-brand1 hover:border-brand1 rounded py-2 px-5"
            onClick={() => {
              setEditVehicleModalOpen(true);
              setEditVehicleId(car.id);
            }}
          >
            Editar
          </button>
          <button
            className="border-#000 border-solid border-2 hover:bg-brand1 hover:border-brand1 rounded py-2 px-5"
            onClick={() => {
              localStorage.setItem("@carId:id", car.id);
              navigate("/detailed-vehicle");
            }}
          >
            Ver como
          </button>
        </div>
      </div>
    </>
  );
};
