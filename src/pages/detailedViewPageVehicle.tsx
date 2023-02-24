import Footer from "../components/Footer";
import Header from "../components/Header";
import carLogo from "../assets/car_picture1.png";

const DetailedViewPageVehicle = () => {
  // <section className="w-screen h-[17rem] bg-brand2 flex flex-col  items-center text-center"></section>
  return (
    <>
      <Header />
      <section className="bg-grey8  flex justify-center flex-col">
        <div className=" bg-brand2 flex flex-col items-center text-center h-72">
          <img
            src={carLogo}
            alt="Imagem de um carro"
            className=" bg-grey10 rounded-md w-72 p-8 mt-5"
          />

          <div className="w-11/12 bg-grey10 rounded-md mt-5 flex flex-col gap-2 p-5">
            <h3 className=" font-lexend font-bold text-grey1 pt-5 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h3>

            <div className="flex gap-1 p-2 flex-row font-inter text-sm font-medium text-brand1">
              <span className="px-2 py-1 bg-brand4 rounded">2013</span>
              <span className="px-2 py-1 bg-brand4 rounded">0 KM</span>
            </div>

            <h4 className="flex p-4 font-lexend font-medium text-base text-grey1">
              R$ 00.000,00
            </h4>

            <button
              className="flex p-1 ml-4
                bg-brand1  rounded  px-5 text-whiteFixed w-28
                items-center
            "
            >
              Comprar
            </button>
          </div>

          <div className="mt-5 w-11/12 p-5 flex flex-col gap-5  bg-grey10 rounded-md">
            <h2 className="font-lexend text-grey1 flex justify-start ">
              Descrição
            </h2>

            <p className="text-grey2 font-inter">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              praesentium delectus tempora, minima maxime nobis qui ut
              architecto asperiores dolorem.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailedViewPageVehicle;
