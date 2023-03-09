import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/loginContext";
import { IUser, IUserPatchForm } from "../../interfaces/user.interface";
import api from "../../services/api";
import { userPatchSchema } from "../../validations/forms.validations";
import Button from "../Button";
import ModalBase from "../ModalBase";

const NavBar = (accountType: any) => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEditAddresOpen, setIsModalEditAddresOpen] = useState(false);
  const token = localStorage.getItem("@tokenId:token");
  const navigate = useNavigate();

  const patchProfile = (data: IUserPatchForm) => {
    let zipCode: string[] | undefined = data.zipCode?.split("-");
    let zipCodeStr = "";

    if (zipCode) {
      zipCodeStr = `${zipCode[0].concat(zipCode[1])}`;
    }

    const newData = {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
      birthdate: data.birthdate,
      description: data.description,
      address: {
        state: data.state,
        city: data.city,
        street: data.street,
        zipCode: zipCodeStr,
        number: data.number,
        complement: data.complement,
      },
    };

    api
      .patch("/users", newData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((_) => {
        setIsModalEditOpen(false);
        setIsModalEditAddresOpen(false);
        window.location.reload();

      });
  };

  const deleteProfile = () => {
    api
      .delete("/users", { headers: { Authorization: `Bearer ${token}` } })
      .then((_) => {
        setIsModalDelete(false);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserPatchForm>({
    resolver: yupResolver(userPatchSchema),
  });

  return (
    <>
      {accountType.accountType === "buyer" ? (
        <div className="flex flex-col justify-between p-5 w-[12.5rem] h-[10rem]  bg-grey9 rounded shadow-[0_4px_40px_-10px_rgba(0,0,0,0.25)]">
          <span
            className="text-grey2 cursor-pointer"
            onClick={() => setIsModalEditOpen(true)}
          >
            Editar Perfil
          </span>
          <span
            className="text-grey2 cursor-pointer"
            onClick={() => setIsModalEditAddresOpen(!isModalEditAddresOpen)}
          >
            Editar Endereço
          </span>
          <span
            className="text-grey2 cursor-pointer"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Sair
          </span>
        </div>
      ) : (
        <div className="flex flex-col justify-between p-5 w-[12.5rem] h-[12.5rem]  bg-grey9 rounded shadow-[0_4px_40px_-10px_rgba(0,0,0,0.25)]">
          <span
            className="text-grey2 cursor-pointer"
            onClick={() => setIsModalEditOpen(true)}
          >
            Editar Perfil
          </span>
          <span
            className="text-grey2 cursor-pointer"
            onClick={() => setIsModalEditAddresOpen(!isModalEditAddresOpen)}
          >
            Editar Endereço
          </span>
          <span
            className="text-grey2 cursor-pointer"
            onClick={() => {
              navigate("/userProfile");
              window.location.reload();
              window.localStorage.removeItem("objectOwner:owner");
            }}
          >
            Meus Anúncios
          </span>
          <span
            className="text-grey2 cursor-pointer"
            onClick={() => {
              localStorage.clear();
              navigate("/home");
              window.location.reload();
            }}
          >
            Sair
          </span>
        </div>
      )}

      {isModalEditOpen ? (
        <ModalBase setIs={setIsModalEditOpen}>
          <div className="bg-whiteFixed w-[20rem]   p-2 rounded-md md:p-0 md:w-[20rem]  md:h-[30rem] xl:h-[39rem] xl:overflow-hidden overflow-y-scroll">
            <form
              className=" p-4 flex flex-col md:p-8 "
              onSubmit={handleSubmit(patchProfile)}
            >
              <div className="flex justify-between">
                <h2 className="text-[0.900rem] font-medium mb-3 font-lexend">
                  Editar perfil
                </h2>

                <AiOutlineClose
                  onClick={() => setIsModalEditOpen(false)}
                  className="hover:cursor-pointer text-grey3 text-[0.900rem]"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-[0.875rem] mb-3">
                  Informações pessoais
                </label>
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Ex: Samuel"
                  className="font-normal text-[0.900rem] rounded-md border-2 border-grey7 p-3 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
                  {...register("name")}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="samuel@kenzie.com"
                  className="font-normal text-[0.900rem] rounded-md border-2 border-grey7 p-3 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
                  {...register("email")}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  CPF
                </label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  className="font-normal text-[0.900rem] rounded-md border-2 border-grey7 p-3 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
                  {...register("cpf")}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Celular
                </label>
                <input
                  type="text"
                  placeholder="(11) 915757419"
                  className="font-normal text-[0.900rem] rounded-md border-2 border-grey7 p-3 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
                  {...register("phone")}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium">
                  Data de Nascimento
                </label>
                <input
                  type="text"
                  placeholder="09/12/1992"
                  className="font-normal text-[0.900rem] rounded-md border-2 border-grey7 p-3 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
                  {...register("birthdate")}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Descrição</label>
                <textarea
                  placeholder="Digitar descrição"
                  className="font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-10 focus:outline-none mb-4"
                  {...register("description")}
                />
              </div>

              <div className=" flex gap-2  justify-between ">
                <button
                  className="bg-grey6 text-grey2 rounded-md h-9 p-1  text-[0.800rem]"
                  onClick={() => {
                    setIsModalEditOpen(false);
                    setIsModalDelete(true);
                  }}
                >
                  Excluir perfil
                </button>
                <button className="bg-brand1 text-whiteFixed rounded-md  h-10 p-1 text-[0.800rem] ">
                  Salvar alterações
                </button>
              </div>
            </form>
          </div>
        </ModalBase>
      ) : null}
      {isModalDelete ? (
        <ModalBase setIs={setIsModalDelete}>
          <div className="bg-whiteFixed w-11/12 rounded-md p-3 flex flex-col gap-5 max-w-[26.568rem]">
            <div className="flex justify-between">
              <h2 className="text-[0.900rem] font-medium mb-3 font-lexend">
                Excluir perfil
              </h2>
              <AiOutlineClose
                onClick={() => setIsModalDelete(false)}
                className="hover:cursor-pointer text-grey3 text-[0.900rem]"
              />
            </div>

            <div>
              <p className="font-lexend font-bold">
                Tem certeza que deseja deletar seu perfil?
              </p>
            </div>

            <div>
              <p className="font-inter text-grey2">
                Essa ação não pode ser desfeita. Isso excluirá permanentemente
                sua conta e removerá seus dados de nossos servidores.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-grey6 text-grey2 p-2 rounded-md"
                onClick={() => setIsModalDelete(false)}
              >
                Cancelar
              </button>
              <button
                className="text-alert1 bg-alert2 p-2 rounded-md"
                onClick={deleteProfile}
              >
                Sim, excluir perfil
              </button>
            </div>
          </div>
        </ModalBase>
      ) : null}

      {isModalEditAddresOpen && (
        <ModalBase setIs={setIsModalEditAddresOpen}>
          <div className="bg-whiteFixed p-2 rounded md:w-[32.5rem] xl:overflow-hidden overflow-y-scroll max-sm:w-[94vw]">
            <form
              className=" p-4 flex flex-col md:p-8 "
              onSubmit={handleSubmit(patchProfile)}
            >
              <div className="flex justify-between">
                <h2 className="text-[0.900rem] font-medium mb-3 font-lexend">
                  Editar endereço
                </h2>

                <AiOutlineClose
                  onClick={() =>
                    setIsModalEditAddresOpen(!isModalEditAddresOpen)
                  }
                  className="hover:cursor-pointer text-grey3 text-[1.25rem]"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor=""
                  className="font-medium text-[0.875rem] mb-6 mt-7"
                >
                  Informações de endereço
                </label>
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium mb-2">
                  CEP
                </label>
                <input
                  type="text"
                  placeholder="00000-000"
                  className="font-normal text-[0.900rem] rounded border-2 border-grey7 pl-4 py-6 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
                  {...register("zipCode")}
                />
              </div>

              <div className="flex justify-between w-full">
                <div className="flex flex-col w-[49%]">
                  <label htmlFor="" className="font-medium mb-2">
                    Estado
                  </label>
                  <input
                    type="text"
                    placeholder="Paraná"
                    className="font-normal text-[0.900rem] rounded border-2 border-grey7 pl-4 py-6 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
                    {...register("state")}
                  />
                </div>

                <div className="flex flex-col w-[49%]">
                  <label htmlFor="" className="font-medium mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    placeholder="Curitiba"
                    className="font-normal text-[0.900rem] rounded border-2 border-grey7 pl-4 py-6 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
                    {...register("city")}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium mb-2">
                  Rua
                </label>
                <input
                  type="text"
                  placeholder="Rua do paraná"
                  className="font-normal text-[0.900rem] rounded border-2 border-grey7 pl-4 py-6 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
                  {...register("street")}
                />
              </div>

              <div className="flex justify-between w-full">
                <div className="flex flex-col w-[49%]">
                  <label htmlFor="" className="font-medium mb-2">
                    Número
                  </label>
                  <input
                    type="text"
                    placeholder="1029"
                    className="font-normal text-[0.900rem] rounded border-2 border-grey7 pl-4 py-6 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
                    {...register("number")}
                  />
                </div>

                <div className="flex flex-col w-[49%]">
                  <label className="font-medium mb-2">Complemento</label>
                  <input
                    type="text"
                    placeholder="Apart 12"
                    className="font-normal text-[0.900rem] rounded border-2 border-grey7 pl-4 py-6 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
                    {...register("complement")}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-7 max-sm:justify-between">
                <button
                  className="bg-grey6 text-grey2 rounded px-6 py-3 font-bold"
                  onClick={() => {
                    setIsModalEditAddresOpen(!isModalEditAddresOpen);
                  }}
                >
                  Cancelar
                </button>
                <button className="bg-brand1 text-whiteFixed rounded px-6 py-3 font-bold">
                  Salvar alterações
                </button>
              </div>
            </form>
          </div>
        </ModalBase>
      )}
    </>
  );
};

export default NavBar;
