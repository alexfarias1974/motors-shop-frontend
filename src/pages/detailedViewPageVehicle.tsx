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

      let ownerObject = JSON.stringify(res.data.owner);

      window.localStorage.setItem("objectOwner:owner", ownerObject);
    });

    api
      .get(`/messages/vehicle/${carId}`)
      .then((res) => setListComments(res.data));

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
      <div className="flex flex-row bg-brand2 justify-center h-[34rem]">
        <div className="absolute flex">
          <section className="flex justify-center flex-col w-[45rem] my-10 max-sm:w-[95vw]">
            <figure className="flex justify-center max-sm:items-center bg-grey10 rounded p-8 w-[100%] h-[22rem]">
              <img
                src={mainImage}
                alt="Imagem de um carro"
                className="w-[28rem] rounded min-w-[50px] min-h-[50px] max-sm:h-[12rem]"
              />
            </figure>

            <div className="w-[100%] bg-grey10 rounded mt-5 flex flex-col gap-2 p-5 border-[2px] border-grey7">
              <h3 className="font-lexend font-bold text-grey1 mb-10">
                {vehicle?.title}
              </h3>

              <div className="md:flex md:flex-row items-center justify-between">
                <div className="flex gap-1 flex-row font-inter text-sm font-medium text-brand1 mb-5">
                  <span className="px-2 py-1 bg-brand4 rounded">
                    {vehicle?.year}
                  </span>
                  <span className="px-2 py-1 bg-brand4 rounded">
                    {vehicle?.mileage} KM
                  </span>
                </div>

                <h4 className="flex font-lexend font-bold text-base text-grey1">
                  {Number(vehicle?.price).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h4>
              </div>

              {token ? (
                <button className="flex p-1 bg-brand1 rounded px-5 text-whiteFixed w-28 items-center">
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
              ) : null}
            </div>

            <div className="mt-5 w-full p-5 flex flex-col items-start gap-5  bg-grey10 rounded  border-[2px] border-grey7">
              <h2 className="font-lexend text-grey1 flex justify-start font-bold  text-[1.100rem]">
                Descrição
              </h2>
              <p className="text-grey2 font-inter">{vehicle?.description}</p>
            </div>

            <div className="mt-5 p-5 flex flex-col gap-5 bg-grey10 rounded lg:hidden border-[2px] border-grey7">
              <h2 className="font-lexend text-grey1 flex justify-start font-semibold">
                Fotos
              </h2>

              <div className="flex flex-wrap gap-2">
                {vehicle?.images ? (
                  vehicle.images.map((images, index) => (
                    <figure className="flex justify-center items-center bg-grey7 w-[5.75rem] h-[5.75rem] rounded">
                      <img
                        src={images.imageUrl}
                        className="w-[5.25rem] bg-grey7 p-1"
                        onClick={() => {
                          setMainImage(images.imageUrl);
                          console.log("clicando");
                        }}
                      />
                    </figure>
                  ))
                ) : (
                  <p>Não há fotos para este vehículo</p>
                )}
              </div>
            </div>

            <div className="mt-5 p-5 flex flex-col gap-5 bg-grey10 rounded items-center lg:hidden border-[2px] border-grey7">
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

            <div className="mt-5 w-full p-5 flex flex-col gap-5  bg-grey10 rounded border-[2px] border-grey7">
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

            {token ? (
              <>
                <div className="mt-5 p-5 flex flex-col gap-5 bg-grey10 rounded w-full border-[2px] border-grey7">
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
                        className="resize-none font-inter text-[0.900rem] rounded-md border-2 border-grey7 p-2 pr-36 max-sm:pr-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-32 focus:outline-none w-full"
                        placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
                        value={createComment}
                        onChange={(e) => setCreateComment(e.target.value)}
                      />
                      <button className="absolute max-sm:relative max-sm:ml-0 max-sm:mt-3 ml-[-124px] mt-[84px] p-1 bg-brand1 rounded px-5 text-whiteFixed w-28">
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
                      onClick={() =>
                        fixedComment("Recomendarei para meus amigos!")
                      }
                      className="bg-grey7 font-inter text-grey3 rounded-[1.5rem] p-1 px-3 text-[0.900rem]"
                    >
                      Recomendarei para meus amigos!
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </section>

          <section className="flex flex-col rounded w-[28rem] mt-10 ml-10 max-sm:hidden">
            <div className="bg-whiteFixed rounded p-8">
              <div>
                <h2 className="font-lexend text-grey1 font-bold text-[1.25rem] mb-8">
                  Fotos
                </h2>
              </div>

              <div className="flex flex-wrap gap-5">
                {vehicle?.images ? (
                  vehicle.images.map((images) => (
                    <figure className="flex justify-center items-center bg-grey7 w-[6.75rem] h-[6.75rem] rounded">
                      <img
                        src={images.imageUrl}
                        className="w-[6.5rem]"
                        onClick={() => setMainImage(images.imageUrl)}
                      />
                    </figure>
                  ))
                ) : (
                  <p>Não há fotos para este vehículo</p>
                )}
              </div>
            </div>

            <div className="mt-8 w-full flex flex-col gap-5 bg-grey10 rounded items-center p-8 border-[2px] border-grey7">
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
                className="bg-grey0 py-2 px-5 text-whiteFixed rounded font-inter"
              >
                Ver todos os anúncios
              </Link>
            </div>
          </section>
        </div>
      </div>

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
