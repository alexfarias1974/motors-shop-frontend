import Footer from "../components/Footer";
import Header from "../components/Header";
import carLogo from "../assets/car_picture1.png";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import api from "../services/api";
import { ICar } from "../components/ProductCardAdvertiser";
import { LoginContext } from "../context/loginContext";

const DetailedViewPageVehicle = () => {
  // const { carPageId } = useContext(UserContext);
  const [car, setCar] = useState<ICar>();
  const { user, setUser } = useContext(LoginContext);
  const [mainImage, setMainImage] = useState<string | undefined>();

  useEffect(() => {
    api
      .get(`/vehicles/${localStorage.getItem("@carId:id")}`)
      .then((res) => {
        setCar(res.data);
        setMainImage(res.data.images[0].imageUrl);
        console.log(car);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("@tokenId:token");
    if (token) {
      api
        .get("users/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const comments = [
    {
      name: "Thiago Santana",
      initiaLetter: "T",
      comment: "Apenas um comentário para teste, huehuehueuhehueeuhhue",
    },
    {
      name: "Thiago Santana",
      initiaLetter: "T",
      comment: "Apenas um comentário para teste, huehuehueuhehueeuhhue",
    },
    {
      name: "Thiago Santana",
      initiaLetter: "T",
      comment: "Apenas um comentário para teste, huehuehueuhehueeuhhue",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex flex-col h-full lg:flex-row  lg:bg-brand2 lg:max-h-96 lg:justify-center xl:justify-center">
        <section className="bg-grey8  flex justify-center flex-col lg:h-full">
          <div className=" bg-brand2 flex flex-col items-center text-center h-72 lg:w-[35rem]">
            <picture className="bg-grey10 rounded-md lg:min-w-[32rem] mt-5 lg:w-96 mx-4">
              <img
                src={mainImage}
                alt="Imagem de um carro"
                className="rounded min-w-full max-h-60"
              />
            </picture>

            <div className="w-11/12 bg-grey10 rounded-md mt-5 flex flex-col gap-2 p-5">
              <h3 className=" font-lexend font-bold text-grey1 pt-5 ">
                {car?.title}
              </h3>

              <div className="md:flex md:flex-row items-center md: justify-between">
                <div className="flex gap-1 p-2 flex-row font-inter text-sm font-medium text-brand1">
                  <span className="px-2 py-1 bg-brand4 rounded">
                    {car?.year}
                  </span>
                  <span className="px-2 py-1 bg-brand4 rounded">
                    {car?.mileage}
                  </span>
                </div>

                <h4 className="flex p-4 font-lexend font-bold text-base text-grey1">
                  {Number(car?.price).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h4>
              </div>

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
              <h2 className="font-lexend text-grey1 flex justify-start font-bold  text-[1.100rem]">
                Descrição
              </h2>

              <p className="text-grey2 font-inter">{car?.description}</p>
            </div>

            <div className="mt-5 w-11/12 p-5 flex flex-col gap-5  bg-grey10 rounded-md lg:hidden">
              <h2 className="font-lexend text-grey1 flex justify-start ">
                Fotos
              </h2>

              <div className="flex flex-wrap gap-2 justify-center p-5">
                {car?.images ? (
                  car.images.map((image) => (
                    <img
                      src={image.imageUrl}
                      className="w-16 bg-grey7 p-1 hover:cursor-pointer"
                      onClick={() => setMainImage(image.imageUrl)}
                    />
                  ))
                ) : (
                  <p>Não há fotos desse</p>
                )}
              </div>
            </div>

            <div className="mt-5 w-11/12 p-5 flex flex-col gap-5  bg-grey10 rounded-md items-center lg:hidden">
              <div className="bg-brand2 rounded-full w-10 h-10 items-center flex justify-center text-center">
                <p className="font-inter text-sm font-medium text-whiteFixed">
                  S
                </p>
              </div>
              <h2 className="font-lexend font-bold text-grey1 pt-1 ">
                {user?.name}
              </h2>

              <p className="text-grey2 font-inter">{user?.description}</p>

              <Link
                to={"/userProfile"}
                className="bg-grey0 p-2 text-whiteFixed rounded-sm"
              >
                Ver todos os anúncios
              </Link>
            </div>

            <div className="mt-5 w-11/12 p-5 flex flex-col gap-5  bg-grey10 rounded-md">
              <h2 className="font-lexend text-grey1 flex justify-start font-bold text-[1.100rem]">
                Comentários
              </h2>

              <div className="flex flex-col gap-5  p-5">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <>
                      <div className="flex  gap-3  items-center">
                        <p className="font-inter text-sm font-medium  text-whiteFixed bg-brand2 rounded-full w-8 h-8 items-center flex justify-center text-center">
                          {comment.initiaLetter}
                        </p>
                        <span className="font-inter">{comment.name} º</span>
                      </div>
                      <p className="font-inter text-[0.900rem]">
                        {comment.comment}
                      </p>
                    </>
                  ))
                ) : (
                  <p>Não há fotos desse</p>
                )}
              </div>
            </div>

            <div className="mt-5 w-11/12 p-5 flex flex-col gap-5  bg-grey10 rounded-md">
              <div className="flex gap-4 items-center">
                <p className="font-inter text-sm font-medium  text-whiteFixed bg-brand2 rounded-full w-8 h-8 items-center flex justify-center text-center">
                  T
                </p>
                <span className="font-inter">Thiago Santana</span>
              </div>

              <div>
                <textarea
                  className="font-inter text-[0.900rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-20 focus:outline-none mb-4 w-10/12"
                  placeholder="Carro muito confortável, foi uma ótima experiência de compra...
"
                />
              </div>
              <button
                className="flex p-1 ml-4
                bg-brand1  rounded  px-5 text-whiteFixed w-28
                items-center
            "
              >
                Comentar
              </button>

              <div className="flex flex-wrap gap-5">
                <button className="bg-grey7 font-inter text-grey3 rounded-sm p-1 text-[0.900rem]">
                  Gostei muito!
                </button>
                <button className="bg-grey7 font-inter text-grey3 rounded-sm p-1 text-[0.900rem]">
                  Recomendarei para meus amigos!
                </button>
                <button className="bg-grey7 font-inter text-grey3 rounded-sm p-1 text-[0.900rem]">
                  Incrível
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col justify-center mt-60">
          <div className="lg:mt-5  lg:flex lg:flex-col lg:gap-5  lg:bg-grey10 lg:rounded-md lg:w-[21.75rem] hidden  xl:items-center ">
            <div className="">
              <h2 className="font-lexend text-grey1 p-5 font-bold text-[1.00rem]">
                Fotos
              </h2>
            </div>

            <div className="flex flex-wrap gap-7 justify-center p-6 w-96 rounded-md">
              {car?.images ? (
                car.images.map((image) => (
                  <img
                    src={image.imageUrl}
                    className="w-16 bg-grey7 p-1 hover:cursor-pointer"
                    onClick={() => setMainImage(image.imageUrl)}
                  />
                ))
              ) : (
                <p>Não há fotos desse</p>
              )}
            </div>
          </div>

          <div className=" lg:mt-5 lg:w-[21.75rem] lg:p-5  lg:flex  lg:flex-col  lg:gap-5   lg:bg-grey10  lg:rounded-md  lg:items-center lg:mb-7 hidden   ">
            <div className="bg-brand2 rounded-full w-16 h-16 items-center flex justify-center text-center">
              <p className="font-inter text-sm font-bold text-whiteFixed text-[1.500rem]">
                S
              </p>
            </div>
            <h2 className="font-lexend font-bold text-grey1 pt-1 ">
              {user?.name}
            </h2>

            <p className="text-grey2 font-inter">{user?.description}</p>

            <Link
              to={"/userProfile"}
              className="bg-grey0 p-2 text-whiteFixed rounded-sm font-inter"
            >
              Ver todos os anúncios
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default DetailedViewPageVehicle;
