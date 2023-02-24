import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export interface ICar {
  id?: string;
  title: string;
  year: number;
  mileage: number;
  description: string;
  price: number;
}

export const ProductCardAdvertiser = (car: ICar) => {
  const { setEditVehicleModalOpen } = useContext(UserContext);
  return (
    <>
      <div className="mx-auto max-w-[19.5rem] flex flex-col">
        <picture className="bg-grey7 rounded-xl h-[11rem] w-[19.5rem]">
          <img
            className="mt-[-3rem]"
            src="./src/assets/car_picture1.png"
            alt="Car Picture"
          />
        </picture>
        <h3 className="font-lexend font-bold text-grey1 mt-3 mb-4">
          {car.title}
        </h3>
        <div>
          <p className="h-14 font-inter text-sm font-normal text-grey2 mb-3">
            {car.description}
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
            onClick={() => setEditVehicleModalOpen(true)}
          >
            Editar
          </button>
          <button className="border-#000 border-solid border-2 hover:bg-brand1 hover:border-brand1 rounded py-2 px-5">
            Ver como
          </button>
        </div>
      </div>
    </>
  );
};
