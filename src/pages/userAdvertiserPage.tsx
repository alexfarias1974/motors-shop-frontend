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
import { useContext, useEffect, useState, useRef } from "react";
import Form from "../components/Form/registerAnnoucementForm";
import { UserContext } from "../context/userContext";
import api from "../services/api";
import EditAnnounceForm from "../components/Form/editAnnouncementForm";
import { LoginContext } from "../context/loginContext";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { IUser } from "../interfaces/user.interface";
import { ProductCardAuction2 } from "../components/ProductCardAuction/index2";
import { ProductCardAuction3 } from "../components/ProductCardAuction/index3";
import { ProductCardAuction4 } from "../components/ProductCardAuction/index4";
import { motion } from "framer-motion";

const UserAdvertiserPage = () => {
  const carousel = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(
      carousel.current?.scrollWidth ? -carousel.current.offsetWidth : 1000
    );
  }, []);

  const [cars, setCars] = useState<ICar[]>([]);
  const [motorcycles, setMotorcycles] = useState<ICar[]>([]);
  const [userInfo, setUserInfo] = useState({} as IUser);

  useEffect(() => {
    const token = localStorage.getItem("@tokenId:token");
    if (token) {
      api
        .get("users/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res.data);
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    api
      .get("/vehicles/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@tokenId:token")}`,
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

        setMotorcycles(motorcycles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    createVehicleModalOpen,
    setCreateVehicleModalOpen,
    editVehicleModalOpen,
    setEditVehicleModalOpen,
  } = useContext(UserContext);

  const { isModalSucessAccount, setIsModalSucessAccount } =
    useContext(LoginContext);

  return (
    <>
      {createVehicleModalOpen ? (
        <ModalBase setIs={setCreateVehicleModalOpen}>
          <Form />
        </ModalBase>
      ) : null}
      {editVehicleModalOpen ? (
        <ModalBase setIs={setEditVehicleModalOpen}>
          <EditAnnounceForm />
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
                  {userInfo.name ? userInfo.name[0].toUpperCase() : ""}
                </p>
              </div>

              <div className="flex gap-6 items-center rounded-full mt-5">
                <p className="ml-11 font-lexend text-[1.25rem] font-semibold text-grey1">
                  {userInfo.name}
                </p>
                <p className="bg-brand4 p-2 font-inter text-[0.875rem] text-brand1 font-medium">
                  Anunciante
                </p>
              </div>
              <div className="ml-11 mr-11">
                <p className="font-inter text-[14px] text-grey2 font-normal mt-5">
                  {userInfo.description}
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
          <h3 className="font-lexend text-[1.5rem] font-semibold text-#000000 mt-[5rem]">
            Carros
          </h3>
          <section className="w-full mx-auto my-0 min-h-[80vh] flex content-center max-w-[90vw]">
            <motion.div
              ref={carousel}
              className="cursor-grab overflow-hidden mb-0"
              whileTap={{ cursor: "grabbing" }}
            >
              <motion.div
                className="flex gap-8"
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
              >
                {cars?.map((car) => (
                  <ProductCardAdvertiser
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
              </motion.div>
            </motion.div>
            {cars.length < 1 ? (
              <p className="font-lexend items-center mt-4 text-[1rem]">
                Não há carros a venda no momento!
              </p>
            ) : null}
          </section>
          <h3 className="font-lexend text-[1.5rem] font-semibold text-#000000">
            Motos
          </h3>
          <section className="w-full mx-auto my-0 min-h-[80vh] flex content-center max-w-[90vw]">
            <motion.div
              ref={carousel}
              className="cursor-grab overflow-hidden"
              whileTap={{ cursor: "grabbing" }}
            >
              <motion.div
                className="flex gap-8 m"
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
              >
                {motorcycles?.map((car) => (
                  <ProductCardAdvertiser
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
              </motion.div>
            </motion.div>
            {motorcycles.length < 1 ? (
              <p className="font-lexend items-center mt-4 text-[1rem]">
                Não há motos a venda no momento!
              </p>
            ) : null}
          </section>
        </main>
        <Footer />
      </div>

      {isModalSucessAccount ? (
        <ModalBase setIs={setIsModalSucessAccount}>
          <div className="bg-whiteFixed w-11/12 rounded-md p-3 flex flex-col gap-5 max-w-[26.568rem]">
            <div className="flex justify-between">
              <h2 className="text-[1rem] font-medium mb-3 font-lexend">
                Sucesso!
              </h2>
              <AiOutlineClose
                onClick={() => setIsModalSucessAccount(false)}
                className="hover:cursor-pointer text-grey3 text-[.900rem]"
              />
            </div>

            <div>
              <p className="font-lexend font-bold text-[1rem]">
                Sua conta foi criada com sucesso!
              </p>
            </div>

            <div>
              <p className="font-inter text-grey2 text-[1rem]">
                Agora você poderá ver seus negócios crescendo em grande escala
              </p>
            </div>

            <Link
              to={"/login"}
              className="border-brand1 border-2 border-solid rounded ml-11 mt-11 w-[146px] h-[48px] bg-whiteFixed font-inter text-[16px] text-brand1 font-semibold hover:bg-brand4"
            >
              Ir para o login
            </Link>
          </div>
        </ModalBase>
      ) : null}
    </>
  );
};

export default UserAdvertiserPage;
