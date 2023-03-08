import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { ICar } from "../components/ProductCardAdvertiser";
import { ProductCardAuction } from "../components/ProductCardAuction";
import { ProductCardAuction2 } from "../components/ProductCardAuction/index2";
import { ProductCardAuction3 } from "../components/ProductCardAuction/index3";
import { ProductCardAuction4 } from "../components/ProductCardAuction/index4";
import "../index.css";
import api from "../services/api";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const scrollLeftCars = () => {
    document.getElementById("contentCars")!.scrollLeft -= 600;
  };

  const scrollRightCars = () => {
    document.getElementById("contentCars")!.scrollLeft += 600;
  };

  const scrollLeftMotorcycle = () => {
    document.getElementById("contentMotorcycle")!.scrollLeft -= 600;
  };

  const scrollRightMotorcycle = () => {
    document.getElementById("contentMotorcycle")!.scrollLeft += 600;
  };

  return (
    <div className="bg-grey8">
      <ToastContainer />
      <Header />
      <section className="h-[36.3rem] bg-brand2 flex flex-col justify-center items-center text-center sm:max-md:w-full">
        <div className="font-lexend flex-col flex flex-wrap">
          <div className="min-[640px]:w-[748px] max-w-[640px]:justify-center max-w-[640px]:text-center">
            <h1 className="text-[2.75rem] font-bold text-grey10 mb-6">
              Velocidade e experiência em um lugar feito para você
            </h1>
            <h4 className="font-inter text-[1rem] font-normal text-grey9 mb-10">
              Um ambiente feito para você explorar o seu melhor
            </h4>
          </div>
          <div className="flex flex-row justify-center mx-auto content-center w-[24rem] h-[3rem] gap-5 max-[640px]:flex-col">
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
      <main className="mx-[4rem] max-[640px]:mx-[1rem] flex flex-col">
        <h3
          className="font-lexend text-[1.5rem] font-semibold text-#000000 mt-[5rem]"
          id="auction"
        >
          Leilão
        </h3>
        <div>
          <div className="mt-6 mb-52 overflow-auto scrollbar-hide flex">
            <div className="inline-block mr-4 h-full animate-slide infinite">
              <ProductCardAuction />
            </div>
            <div className="inline-block mr-4 h-full animate-slide infinite">
              <ProductCardAuction2 />
            </div>
            <div className="inline-block mr-4 h-full animate-slide infinite">
              <ProductCardAuction3 />
            </div>
            <div className="inline-block mr-4 h-full animate-slide infinite">
              <ProductCardAuction4 />
            </div>
          </div>
        </div>

        <h3
          ref={carsRef}
          className="font-lexend text-[1.5rem] font-semibold text-#000000 mt-[5rem] -mb-[4.25rem] max-[640px]:-mb-[0.1rem]"
          id="cars"
        >
          Carros
        </h3>
        <div className="flex justify-end top-5">
          <button
            onClick={scrollLeftCars}
            className="p-4 text-[1.5rem] m-2 rounded-full bg-whiteFixed hover:bg-grey0 hover:text-grey10 max-[640px]:hidden"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={scrollRightCars}
            className="p-4 text-[1.5rem] m-2 rounded-full bg-whiteFixed hover:bg-grey0 hover:text-grey10 max-[640px]:hidden"
          >
            <FiChevronRight />
          </button>
        </div>
        <section
          id="contentCars"
          className="carousel snap-x w-full gap-8 mx-auto mt-2 mb-20 max-h-[26rem] flex content-center max-w-[90vw] overflow-x-auto relative scroll-smooth scrollbar-hide"
        >
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
              owner={car.owner}
            />
          ))}
          {cars.length < 1 ? (
            <p className="font-lexend items-center mt-4 text-[1rem]">
              Não há carros a venda no momento!
            </p>
          ) : null}
        </section>

        <h3
          ref={motorbikesRef}
          className="font-lexend text-[1.5rem] font-semibold text-#000000 mt-[5rem] -mb-[4.25rem] max-[640px]:-mb-[0.1rem]"
          id="motorcycles"
        >
          Motos
        </h3>
        <div className="flex justify-end top-5">
          <button
            onClick={scrollLeftMotorcycle}
            className="p-4 text-[1.5rem] m-2 rounded-full bg-whiteFixed hover:bg-grey0 hover:text-grey10 max-[640px]:hidden"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={scrollRightMotorcycle}
            className="p-4 text-[1.5rem] m-2 rounded-full bg-whiteFixed hover:bg-grey0 hover:text-grey10 max-[640px]:hidden"
          >
            <FiChevronRight />
          </button>
        </div>
        <section
          id="contentMotorcycle"
          className="carousel w-full gap-8 mx-auto mt-2 mb-40 max-h-[26rem] flex content-center max-w-[90vw] overflow-x-auto relative scroll-smooth scrollbar-hide pb-12"
        >
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
              owner={car.owner}
            />
          ))}
          {motorcycles.length < 1 ? (
            <p className="font-lexend items-center mt-4 text-[1rem]">
              Não há motos a venda no momento!
            </p>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
