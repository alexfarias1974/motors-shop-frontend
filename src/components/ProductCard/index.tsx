import { ICar } from "../ProductCardAdvertiser";

export const ProductCard = (car: ICar) => {
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
          {car.title}
        </h3>
        <div>
          <p className="h-12 font-inter text-sm font-normal text-grey2 mb-4">
            {car.description}
          </p>
        </div>
        <div className="flex flex-row items-center">
          <div className="bg-brand2 rounded-full w-8 h-8 items-center flex justify-center text-center">
            <p className="font-inter text-sm font-medium text-whiteFixed">R</p>
          </div>
          <div>
            <p className="font-medium text-grey2 ml-4">Anunciante</p>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-4 items-center">
          <div className="flex flex-row font-inter text-sm font-medium text-brand1">
            <h4 className="px-2 py-1 bg-brand4 rounded">{car.mileage}</h4>
            <h4 className="px-2 py-1 ml-3 bg-brand4 rounded">{car.year}</h4>
          </div>
          <div className="font-lexend font-medium text-base text-grey1">
            <h4>
              {Number(car.price).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};
