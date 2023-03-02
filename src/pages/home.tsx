import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { ICar } from "../components/ProductCardAdvertiser";
import { ProductCardAuction } from "../components/ProductCardAuction";
import "../index.css";
import api from "../services/api";

const Home = () => {
  const carsRef: any = useRef(null);
  const motorbikesRef: any = useRef(null);

  const findSectionCars = () => {
    carsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const findSectionMotorbikes = () => {
    motorbikesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const [cars, setCars] = useState<ICar[]>([]);
  const [motorcycles, setMotorcycles] = useState<ICar[]>([]);
  useEffect(() => {
    api
      .get("/vehicles")
      .then((res) => {
        const cars = res.data.filter(
          (vehicle: any) => vehicle.vehicleType === "car"
        );
        setCars(cars);

        const motorcycles = res.data.filter(
          (vehicle: any) => vehicle.vehicleType === "motorcycle"
        );

        setMotorcycles(motorcycles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <section className="w-screen h-[36.3rem] bg-brand2 flex flex-col justify-center items-center text-center sm:max-md:w-full">
        <div className="font-lexend max-w-[46.7rem] flex flex-wrap justify-center">
          <div>
            <h1 className="text-[2.75rem] font-bold text-grey10 mb-6">
              Velocidade e experiência em um lugar feito para você
            </h1>
            <h4 className="font-inter text-[1rem] font-normal text-grey9 mb-10">
              Um ambiente feito para você explorar o seu melhor
            </h4>
          </div>
          <div className="flex flex-row justify-center content-center w-[24rem] h-[3rem] gap-5 max-[640px]:flex-col">
            <button
              onClick={findSectionCars}
              className="text-grey10 border-grey10 border-solid border-2 hover:text-grey0 hover:bg-whiteFixed rounded w-[80%] min-h-[48px] self-center"
            >
              Carros
            </button>
            <button
              onClick={findSectionMotorbikes}
              className="text-grey10 border-grey10 border-solid border-2 hover:text-grey0 hover:bg-whiteFixed rounded w-[80%] min-h-[48px] self-center"
            >
              Motos
            </button>
          </div>
        </div>
      </section>
      <main className="ml-[4rem] mr-[4rem] flex flex-col">
        <h3 className="font-lexend text-[1.5rem] font-semibold text-#000000 mt-[5rem]">
          Leilão
        </h3>
        <div>
          <div className="mt-6 mb-52 overflow-auto scrollbar-hide flex">
            <div className="inline-block mr-4 h-full animate-slide infinite">
              <ProductCardAuction />
            </div>
            <div className="inline-block mr-4 h-full animate-slide infinite">
              <ProductCardAuction />
            </div>
            <div className="inline-block mr-4 h-full animate-slide infinite">
              <ProductCardAuction />
            </div>
            <div className="inline-block mr-4 h-full animate-slide infinite">
              <ProductCardAuction />
            </div>
            <div className="inline-block mr-4 h-full animate-slide infinite">
              <ProductCardAuction />
            </div>
            <div className="inline-block mr-4 h-full animate-slide infinite">
              <ProductCardAuction />
            </div>
            <div className="inline-block mr-4 h-full animate-slide infinite">
              <ProductCardAuction />
            </div>
            <div className="inline-block mr-4 h-full animate-slide infinite">
              <ProductCardAuction />
            </div>
          </div>
        </div>
        <h3
          ref={carsRef}
          className="font-lexend text-[1.5rem] font-semibold text-#000000 mt-[5rem]"
        >
          Carros
        </h3>
        <div>
          <div className="flex mt-6 mb-52 overflow-auto scrollbar-hide">
            {cars?.map((car) => (
              <ProductCard
                key={car.id}
                id={car.id}
                title={car.title}
                description={car.description}
                mileage={car.mileage}
                price={car.price}
                year={car.year}
                images={car.images}
              />
            ))}
          </div>
        </div>
        <h3
          ref={motorbikesRef}
          className="font-lexend text-[1.5rem] font-semibold text-#000000 mt-[5rem]"
        >
          Motos
        </h3>
        <div>
          <div className="mt-6 mb-52 overflow-auto scrollbar-hide whitespace-nowrap">
            {motorcycles?.map((car) => (
              <ProductCard
                key={car.id}
                id={car.id}
                title={car.title}
                description={car.description}
                mileage={car.mileage}
                price={car.price}
                year={car.year}
                images={car.images}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
