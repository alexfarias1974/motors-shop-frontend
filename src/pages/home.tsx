import React, { useRef } from "react";
import { Link } from "react-scroll";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { ProductCardAuction } from "../components/ProductCardAuction";
import "../index.css";

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

  return (
    <>
      <Header />
      <section className="w-screen h-[36.3rem] bg-brand2 flex flex-col justify-center items-center text-center">
        <div className="font-lexend max-w-[46.7rem] flex flex-wrap justify-center">
          <div>
            <h1 className="text-[2.75rem] font-bold text-grey10 mb-6">
              Velocidade e experiência em um lugar feito para você
            </h1>
            <h4 className="font-inter text-[1rem] font-normal text-grey9 mb-10">
              Um ambiente feito para você explorar o seu melhor
            </h4>
          </div>
          <div className="flex flex-row justify-center content-center w-[24rem] h-[3rem] gap-5">
            <button
              onClick={findSectionCars}
              className="text-grey10 border-grey10 border-solid border-2 hover:text-grey0 hover:bg-whiteFixed w-full rounded"
            >
              Carros
            </button>
            <button
              onClick={findSectionMotorbikes}
              className="text-grey10 border-grey10 border-solid border-2 hover:text-grey0 hover:bg-whiteFixed w-full rounded"
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
            <div className="inline-block mr-4 animate-slide infinite">
              <ProductCard />
            </div>
            <div className="inline-block mr-4 animate-slide infinite">
              <ProductCard />
            </div>
            <div className="inline-block mr-4 animate-slide infinite">
              <ProductCard />
            </div>
            <div className="inline-block mr-4 animate-slide infinite">
              <ProductCard />
            </div>
            <div className="inline-block mr-4 animate-slide infinite">
              <ProductCard />
            </div>
            <div className="inline-block mr-4 animate-slide infinite">
              <ProductCard />
            </div>
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
      </main>
      <Footer />
    </>
  );
};

export default Home;
