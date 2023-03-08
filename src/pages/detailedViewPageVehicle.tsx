import Header from "../components/Header";
import { Link } from "react-router-dom";

import { ICar } from "../components/ProductCardAdvertiser";
import { IComment } from "../interfaces/comments.interface";
import { IUser } from "../interfaces/user.interface";
import { FaTrash, FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import ModalBase from "../components/ModalBase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import api from "../services/api";
import { LoginContext } from "../context/loginContext";

const DetailedViewPageVehicle = () => {
  const [createComment, setCreateComment] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [vehicle, setVehicle] = useState<ICar>();
  const [resSendMessage, setSendResMessage] = useState<any>();
  const [listComments, setListComments] = useState<IComment[]>([]);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [idComment, setIdComment] = useState("");
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [mainImage, setMainImage] = useState<string | undefined>();

  const token = localStorage.getItem("@tokenId:token");
  const carId = localStorage.getItem("@carId:id");

  useEffect(() => {
    api.get(`/vehicles/${carId}`).then((res) => {
      setVehicle(res.data);
      setMainImage(res.data.images[0].imageUrl);
    });

    api.get("/messages").then((res) => setListComments(res.data));

    if (token) {
      api
        .get("users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUser(res.data))
        .catch((error) => console.log(error));
    }
  }, [resSendMessage]);

  const submitComment = (e: any) => {
    e.preventDefault();

    if (token) {
      api
        .post(
          `/messages/${carId}`,
          { message: createComment },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => setSendResMessage(res.data))
        .catch((error) => console.log(error));
    }

    setCreateComment("");
  };

  const fixedComment = (value: any) => {
    if (token) {
      api
        .post(
          `/messages/${carId}`,
          { message: value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => setSendResMessage(res.data))
        .catch((error) => console.log(error));
    }
  };

  const submitUpdateComment = (e: any) => {
    e.preventDefault();

    if (token) {
      api
        .patch(
          `/messages/${idComment}`,
          { message: updateComment },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setSendResMessage(res.data);
          setModalEditOpen(!modalEditOpen);
        })
        .catch((error) => console.log(error));
    }

    setUpdateComment("");
  };

  const submitDeleteComment = () => {
    if (token) {
      api
        .delete(`/messages/${idComment}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setSendResMessage(idComment);
          setModalDeleteOpen(!modalDeleteOpen);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col h-full lg:flex-row  lg:bg-brand2 lg:max-h-[34rem] lg:justify-center xl:justify-center">
        <section className="bg-grey8  flex justify-center flex-col lg:h-full mr-11">
          <div className=" bg-brand2 flex flex-col items-center text-center h-[22.2rem] lg:w-[47rem]">
            <figure className="flex justify-center bg-grey10 rounded-md w-72 p-8 mt-10 lg:w-[47rem] lg:h-[22.2rem]">
              <img
                src={mainImage}
                alt="Imagem de um carro"
                className="w-[28rem] rounded"
              />
            </figure>

            <div className="w-[100%] bg-grey10 rounded-md mt-5 flex flex-col gap-2 p-5">
              <h3 className=" font-lexend font-bold text-grey1 pt-5 ">
                {vehicle?.title}
              </h3>

              <div className="md:flex md:flex-row items-center md: justify-between">
                <div className="flex gap-1 p-2 flex-row font-inter text-sm font-medium text-brand1">
                  <span className="px-2 py-1 bg-brand4 rounded">
                    {vehicle?.year}
                  </span>
                  <span className="px-2 py-1 bg-brand4 rounded">
                    {vehicle?.mileage} KM
                  </span>
                </div>

                <h4 className="flex p-4 font-lexend font-bold text-base text-grey1">
                  {Number(vehicle?.price).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h4>
              </div>

              <button className="flex p-1 ml-4 bg-brand1 rounded px-5 text-whiteFixed w-28 items-center">
                <a
                  href={`https://wa.me/55${vehicle?.owner.phone.replace(
                    /[{()}]|-/g,
                    ""
                  )}?text=Tenho%20interesse%20em%20comprar%20seu%20carro`}
                  target="_blank"
                >
                  Comprar
                </a>
              </button>
            </div>

            <div className="mt-5 w-11/12 p-5 flex flex-col items-start gap-5  bg-grey10 rounded-md">
              <h2 className="font-lexend text-grey1 flex justify-start font-bold  text-[1.100rem]">
                Descrição
              </h2>
              <p className="text-grey2 font-inter">{vehicle?.description}</p>
            </div>

            <div className="mt-5 w-11/12 p-5 flex flex-col gap-5  bg-grey10 rounded-md lg:hidden">
              <h2 className="font-lexend text-grey1 flex justify-start ">
                Fotos
              </h2>

              <div className="flex flex-wrap gap-2 justify-center p-5">
                {vehicle?.images ? (
                  vehicle.images.map(
                    (images, index) =>
                      index >= 1 && (
                        <img
                          src={images.imageUrl}
                          className="w-16 bg-grey7 p-1"
                        />
                      )
                  )
                ) : (
                  <p>Não há fotos para este vehículo</p>
                )}
              </div>
            </div>
            <div className="mt-5 w-11/12 p-5 flex flex-col gap-5  bg-grey10 rounded-md items-center lg:hidden">
              <div className="bg-brand2 rounded-full w-10 h-10 items-center flex justify-center text-center">
                <p className="font-inter text-sm font-medium text-whiteFixed">
                  {vehicle?.owner.name && vehicle.owner.name[0]}
                </p>
              </div>
              <h2 className="font-lexend font-bold text-grey1 pt-1 ">
                {vehicle?.owner.name}
              </h2>

              <p className="text-grey2 font-inter">
                {vehicle?.owner.description}
              </p>
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

              <div className="flex flex-col items-start gap-5">
                {listComments.length > 0 ? (
                  listComments.map((comment) => (
                    <>
                      <div className="flex gap-3 items-center justify-between w-full">
                        <div className="flex justify-center items-center gap-2">
                          <p className="font-inter text-sm font-medium  text-whiteFixed bg-brand2 rounded-full w-8 h-8 items-center flex justify-center text-center">
                            {comment.owner.name[0]}
                          </p>
                          <span className="font-inter">
                            {comment.owner.name}
                          </span>
                        </div>
                        {user.id === comment.owner.id && (
                          <div>
                            <button
                              className="mr-2"
                              onClick={() => {
                                setIdComment(comment.id);
                                setModalEditOpen(!modalEditOpen);
                              }}
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => {
                                setIdComment(comment.id);
                                setModalDeleteOpen(!modalDeleteOpen);
                              }}
                            >
                              <FaTrash className="text-alert1" />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="w-full break-words">
                        <p className="font-inter text-[0.900rem] text-left">
                          {comment.message}
                        </p>
                      </div>
                    </>
                  ))
                ) : (
                  <p>Não há comentários para este vehículo</p>
                )}
              </div>
            </div>

            <div className="mt-5 w-11/12 p-5 flex flex-col gap-5  bg-grey10 rounded-md">
              <div className="flex gap-4 items-center">
                <p className="font-inter text-sm font-medium  text-whiteFixed bg-brand2 rounded-full w-8 h-8 items-center flex justify-center text-center">
                  {user?.name && user.name[0]}
                </p>
                <span className="font-inter">{user?.name}</span>
              </div>

              <div>
                <form onSubmit={submitComment}>
                  <textarea
                    id="createComment"
                    name="createComment"
                    className="resize-none font-inter text-[0.900rem] rounded-md border-2 border-grey7 p-2 pr-36 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-32 focus:outline-none w-full"
                    placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
                    value={createComment}
                    onChange={(e) => setCreateComment(e.target.value)}
                  />
                  <button className="absolute ml-[-124px] mt-[84px] p-1 bg-brand1 rounded px-5 text-whiteFixed w-28">
                    Comentar
                  </button>
                </form>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => fixedComment("Gostei muito!")}
                  className="bg-grey7 font-inter text-grey3 rounded-[1.5rem] p-1 px-3 text-[0.900rem]"
                >
                  Gostei muito!
                </button>
                <button
                  onClick={() => fixedComment("Incrível")}
                  className="bg-grey7 font-inter text-grey3 rounded-[1.5rem] p-1 px-3 text-[0.900rem]"
                >
                  Incrível
                </button>
                <button
                  onClick={() => fixedComment("Recomendarei para meus amigos!")}
                  className="bg-grey7 font-inter text-grey3 rounded-[1.5rem] p-1 px-3 text-[0.900rem]"
                >
                  Recomendarei para meus amigos!
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col justify-center">
          <div className="lg:flex lg:flex-col lg:bg-grey10 lg:rounded-md lg:w-[28rem] lg:h-[23rem] hidden p-8 mt-[18.35rem]">
            <div>
              <h2 className="font-lexend text-grey1 font-bold text-[1.25rem] mb-8">
                Fotos
              </h2>
            </div>

            <div className="flex flex-wrap gap-5">
              {vehicle?.images ? (
                vehicle.images.map(
                  (images, index) =>
                    index >= 1 && (
                      <figure className="flex justify-center items-center bg-grey7 w-[6.75rem] h-[6.75rem] rounded">
                        <img src={images.imageUrl} className="w-[6.5rem]" />
                      </figure>
                    )
                )
              ) : (
                <p>Não há fotos para este vehículo</p>
              )}
            </div>
          </div>

          <div className=" lg:mt-8 lg:w-[28rem] lg:p-9  lg:flex  lg:flex-col  lg:gap-5   lg:bg-grey10  lg:rounded-md  lg:items-center lg:mb-7 hidden">
            <div className="bg-brand2 rounded-full w-[6.5rem] h-[6.5rem] items-center flex justify-center text-center">
              <p className="font-inter text-sm font-bold text-whiteFixed text-[2.25rem]">
                {vehicle?.owner.name && vehicle.owner.name[0]}
              </p>
            </div>
            <h2 className="font-lexend font-bold text-grey1 pt-1 text-[1.25rem]">
              {vehicle?.owner.name}
            </h2>

            <div className="w-[22rem]">
              <p className="text-grey2 font-inter text-center">
                {vehicle?.owner.description}
              </p>
            </div>

            <Link
              to={"/userProfile"}
              className="bg-grey0 p-2 text-whiteFixed rounded-sm font-inter"
            >
              Ver todos os anúncios
            </Link>
          </div>
        </div>
      </main>

      {modalEditOpen && (
        <ModalBase setIs={setModalEditOpen}>
          <div className="flex flex-col justify-center items-center gap-3 w-[40rem] h-[20rem] bg-whiteFixed rounded">
            <div className="flex gap-4 justify-start items-center w-[90%]">
              <p className="font-inter text-sm font-medium  text-whiteFixed bg-brand2 rounded-full w-8 h-8 items-center flex justify-center text-center">
                {user?.name && user.name[0]}
              </p>
              <span className="font-inter">{user?.name}</span>
            </div>
            <form onSubmit={submitUpdateComment} className="w-[90%]">
              <textarea
                id="updateComment"
                name="updateComment"
                value={updateComment}
                className="resize-none font-inter text-[0.900rem] rounded border-2 border-grey7 p-2 pr-36 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-32 focus:outline-none w-[100%]"
                placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
                onChange={(e) => setUpdateComment(e.target.value)}
              />
              <button
                type="submit"
                className="absolute ml-[-124px] mt-[84px] p-1 bg-brand1 rounded px-5 text-whiteFixed w-28"
              >
                Atualizar
              </button>
            </form>
          </div>
          <button onClick={() => setModalEditOpen(!modalEditOpen)}>
            <IoClose className="absolute top-5 right-7 text-[1.4rem]" />
          </button>
        </ModalBase>
      )}

      {modalDeleteOpen && (
        <ModalBase setIs={setModalDeleteOpen}>
          <div className="flex flex-col item-center justify-between w-[33rem] h-[20rem] bg-whiteFixed rounded">
            <div className="flex w-full justify-between px-6 mt-4">
              <p className="font-bold text-grey1">Excluir comentário</p>
              <button
                className="text-[1.5rem] text-grey4"
                onClick={() => setModalDeleteOpen(!modalDeleteOpen)}
              >
                <IoClose />
              </button>
            </div>
            <div className="flex flex-col gap-4 pl-6 pr-10">
              <p className="font-bold">
                Tem certeza que deseja remover este comentário?
              </p>
              <p className="text-grey2">
                Essa ação não poderá ser desfeita. Isso excluirá permanentemente
                o seu comentário!
              </p>
            </div>
            <div className="flex justify-end gap-3 mb-4 mr-6">
              <button
                className="bg-grey6 text-grey2 px-6 py-2 rounded font-bold"
                onClick={() => setModalDeleteOpen(!modalDeleteOpen)}
              >
                Cancelar
              </button>
              <button
                className="bg-alert2 text-alert1 px-6 py-2 rounded font-bold"
                onClick={() => submitDeleteComment()}
              >
                Sim, excluir comentário
              </button>
            </div>
          </div>
        </ModalBase>
      )}
    </>
  );
};

export default DetailedViewPageVehicle;
