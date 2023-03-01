import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { LoginContext } from "../../context/loginContext";
import { IUserPatchForm } from "../../interfaces/user.interface";
import api from "../../services/api";
import { userPatchSchema } from "../../validations/forms.validations";
import Button from "../Button";
import ModalBase from "../ModalBase";

const NavBar = () => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const { token } = useContext(LoginContext);

  const patchProfile = (data: IUserPatchForm) => {
    api
      .patch("/users", data, { headers: { Authorization: `Bearer ${token}` } })
      .then((_) => {
        setIsModalEditOpen(false);
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
      <div className="flex flex-col justify-between p-5 w-[12.5rem] h-[12.5rem]  bg-grey9 rounded shadow-[0_4px_40px_-10px_rgba(0,0,0,0.25)]">
        <span
          className="text-grey2 cursor-pointer"
          onClick={() => setIsModalEditOpen(true)}
        >
          Editar Perfil
        </span>
        <span className="text-grey2 cursor-pointer">Editar Endereço</span>
        <span className="text-grey2 cursor-pointer">Minhas Compras</span>
        <span className="text-grey2 cursor-pointer">Sair</span>
      </div>
      {isModalEditOpen ? (
        <ModalBase setIs={setIsModalEditOpen}>
          <div className="bg-whiteFixed w-[20rem]   p-2 rounded-md md:p-0 md:w-[20rem]  md:h-[30rem] xl:h-[39rem] overflow-y-scroll">
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
                className="text-alert1 bg-alert2 p-2 rounde-md"
                onClick={deleteProfile}
              >
                Sim, excluir perfil
              </button>
            </div>
          </div>
        </ModalBase>
      ) : null}
    </>
  );
};

export default NavBar;
