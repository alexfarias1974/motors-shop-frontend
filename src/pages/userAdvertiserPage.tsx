import Footer from "../components/Footer";
import Header from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import {
  ICar,
  ProductCardAdvertiser,
} from "../components/ProductCardAdvertiser";
import { ProductCardAuction } from "../components/ProductCardAuction";
import "../index.css";
import ModalBase from "../components/ModalBase";
import { useContext, useEffect, useState } from "react";
import Form from "../components/Form/registerAnnoucementForm";
import { UserContext } from "../context/userContext";
import api from "../services/api";

const UserAdvertiserPage = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [motorcycles, setMotorcyles] = useState<ICar[]>([]);
  useEffect(() => {
    api
      .get("/vehicles/user", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6ZmFsc2UsImlhdCI6MTY3NzIwNTA0MiwiZXhwIjoxNjc3MjkxNDQyLCJzdWIiOiJmYjE2MjliZC05NjhhLTQxODMtOTVmOC1lYzRkM2YyYzMyYTcifQ.eVUk7I87BUSM0SNOv_HsxjApLwd5KJYO_kiNSFX5oSk`,
        },
      })
      .then((res) => {
        const cars = res.data.filter(
          (vehicle: any) => vehicle.vehicleType === "car"
        );
        setCars(cars);

        const motorcycles = res.data.filter(
          (vehicle: any) => vehicle.vehicleType === "motorcycle"
        );

        setMotorcyles(motorcycles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cars, motorcycles]);

  const { createVehicleModalOpen, setCreateVehicleModalOpen } =
    useContext(UserContext);
  return (
    <>
      {createVehicleModalOpen ? (
        <ModalBase setIs={setCreateVehicleModalOpen}>
          <Form />
        </ModalBase>
      ) : null}
      <div className="bg-grey8">
        <Header />
        <section className="w-screen h-[22.3rem] bg-brand1"></section>
        <section>
          <div className="flex items-center w-3/4 m-auto h-[25.5rem] bg-grey10 z-1 -mt-60 rounded">
            <div className="flex flex-col">
              <div className="bg-brand2 rounded-full ml-11 w-28 h-28 items-center flex justify-center text-center">
                <p className="font-Inter text-[2.25rem] font-medium text-whiteFixed">
                  SL
                </p>
              </div>

              <div className="flex gap-6 items-center rounded-full mt-5">
                <p className="ml-11 font-lexend text-[1.25rem] font-semibold text-grey1">
                  Samuel Leão
                </p>
                <p className="bg-brand4 p-2 font-inter text-[0.875rem] text-brand1 font-medium">
                  Anunciante
                </p>
              </div>
              <div className="ml-11 mr-11">
                <p className="font-inter text-[14px] text-grey2 font-normal mt-5">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
              </div>
              <div>
                <button
                  className="border-brand1 border-2 border-solid rounded ml-11 mt-11 w-[146px] h-[48px] bg-whiteFixed font-inter text-[16px] text-brand1 font-semibold hover:bg-brand4"
                  onClick={() => setCreateVehicleModalOpen(true)}
                >
                  Criar Anúncio
                </button>
              </div>
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
          <h3 className="font-lexend text-[1.5rem] font-semibold text-#000000 mt-[5rem]">
            Carros
          </h3>
          <div>
            <div className="flex mt-6 mb-52 overflow-x-hidden overflow-y-auto hover:overflow-x-scroll">
              {cars?.map((car) => (
                <ProductCardAdvertiser
                  key={car.id}
                  title={car.title}
                  description={car.description}
                  mileage={car.mileage}
                  price={car.price}
                  year={car.year}
                />
              ))}
            </div>
          </div>
          <h3 className="font-lexend text-[1.5rem] font-semibold text-#000000 mt-[5rem]">
            Motos
          </h3>
          <div>
            <div className="flex mt-6 mb-52 overflow-x-hidden overflow-y-auto hover:overflow-x-scroll">
              {motorcycles?.map((car) => (
                <ProductCardAdvertiser
                  key={car.id}
                  title={car.title}
                  description={car.description}
                  mileage={car.mileage}
                  price={car.price}
                  year={car.year}
                />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default UserAdvertiserPage;
