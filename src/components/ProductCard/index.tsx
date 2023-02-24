export const ProductCard = () => {
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
          Product title stays here - max 1 line
        </h3>
        <div>
          <p className="h-12 font-inter text-sm font-normal text-grey2 mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
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
            <h4 className="px-2 py-1 bg-brand4 rounded">0KM</h4>
            <h4 className="px-2 py-1 ml-3 bg-brand4 rounded">2019</h4>
          </div>
          <div className="font-lexend font-medium text-base text-grey1">
            <h4>R$ 00.000,00</h4>
          </div>
        </div>
      </div>
    </>
  );
};
