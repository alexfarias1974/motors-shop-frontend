import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { LoginContext } from "../../context/loginContext";
import { IRegisterForm, IUser } from "../../interfaces/user.interface";
import { registerUserSchema } from "../../validations/forms.validations";
import Button from "../Button";
import ModalBase from "../ModalBase";
import "./styles.css";

export const RegisterUserForm = () => {
  const [accountType, setAccountType] = useState<string>("buyer");
  const [buyerColor, setBuyerColor] = useState<string>("bg-brand1");

  const [advertiserColor, setAdvertiserColor] =
    useState<string>("bg-whiteFixed");

  useEffect(() => {
    if (accountType === "buyer") {
      setBuyerColor("bg-brand1 text-whiteFixed border-brand1");
      setAdvertiserColor("bg-whiteFixed text-grey0 border-grey5");
    } else {
      setBuyerColor("bg-whiteFixed text-grey0 border-grey5");
      setAdvertiserColor("bg-brand1 text-whiteFixed border-brand1");
    }
  }, [accountType]);

  const {
    handleRegisterValues,
    isModalSucessAccount,
    setIsModalSucessAccount,
  } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: registerReset,
  } = useForm<IRegisterForm>({
    mode: "onSubmit",
    resolver: yupResolver(registerUserSchema),
  });

  const onSubmitFunction = (data: any) => {
    const newData = {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
      birthdate: data.birthdate,
      description: data.description,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      accountType: accountType,
      address: {
        state: data.state,
        city: data.city,
        street: data.street,
        zipCode: data.zipCode,
        number: data.number,
        complement: data.complement,
      },
    };
    console.log(newData);
    handleRegisterValues(newData);
  };

  return (
    <div className="bg-grey8 py-10">
      <form
        onSubmit={handleSubmit(onSubmitFunction)}
        className="w-11/12 md:w-96 m-auto bg-whiteFixed p-8 flex flex-col gap-1 rounded-md font-Lexend  "
      >
        <div className="flex items-center justify-between ">
          <h3 className="text-[1.5rem] font-medium mb-3">Cadastro</h3>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-Inter font-medium text-[0.875rem] mb-2">
            Informações pessoais
          </p>
          <label
            htmlFor="name"
            className="font-Inter font-medium text-[0.875rem] mb-1"
          >
            Nome
          </label>
          <input
            type="text"
            placeholder="Ex: Samuel Leão"
            {...register("name")}
            className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
          />
          <span className="text-alert1">{errors.name?.message}</span>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="font-Inter font-medium text-[0.875rem] mb-2"
          >
            Email
          </label>
          <input
            type="text"
            placeholder="Ex: samuel@mail.com"
            {...register("email")}
            className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
          />
          <span className="text-alert1">{errors.email?.message}</span>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="cpf"
            className="font-Inter font-medium text-[0.875rem] mb-2"
          >
            CPF
          </label>
          <input
            type="text"
            placeholder="000.000.000-00"
            {...register("cpf")}
            className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
          />
          <span className="text-alert1">{errors.cpf?.message}</span>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="phone"
            className="font-Inter font-medium text-[0.875rem] mb-2"
          >
            Celular
          </label>
          <input
            type="text"
            placeholder="(DDD) 90000-0000"
            {...register("phone")}
            className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
          />
          <span className="text-alert1">{errors.phone?.message}</span>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="birthdate"
            className="font-Inter font-medium text-[0.875rem] mb-2"
          >
            Data de nascimento
          </label>
          <input
            type="text"
            placeholder="AAAA-DD-MM"
            {...register("birthdate")}
            className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
          />
          <span className="text-alert1">{errors.birthdate?.message}</span>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="font-Inter font-medium text-[0.875rem] mb-2"
          >
            Descrição
          </label>
          <textarea
            placeholder="Digitar descrição"
            {...register("description")}
            className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-18 focus:outline-none mb-4"
          />
          <span className="text-alert1">{errors.description?.message}</span>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-Inter font-medium text-[0.875rem] mb-2 mt-3">
            Informações de endereço
          </p>
          <label
            htmlFor="zipCode"
            className="font-Inter font-medium text-[0.875rem] mb-2"
          >
            CEP
          </label>
          <input
            type="text"
            placeholder="00000-000"
            {...register("zipCode")}
            className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
          />
          <span className="text-alert1">{errors.zipCode?.message}</span>
        </div>

        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col">
            <label
              htmlFor="state"
              className="font-Inter font-medium text-[0.875rem] mb-2"
            >
              Estado
            </label>
            <input
              type="text"
              placeholder="Digitar estado"
              {...register("state")}
              className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4 w-full"
            />
            <span className="text-alert1">{errors.state?.message}</span>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="city"
              className="font-Inter font-medium text-[0.875rem] mb-2"
            >
              Cidade
            </label>
            <input
              type="text"
              placeholder="Digitar cidade"
              {...register("city")}
              className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4 w-full"
            />
            <span className="text-alert1">{errors.city?.message}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="street"
            className="font-Inter font-medium text-[0.875rem] mb-2"
          >
            Rua
          </label>
          <input
            type="text"
            placeholder="Digitar rua"
            {...register("street")}
            className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
          />
          <span className="text-alert1">{errors.street?.message}</span>
        </div>

        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col">
            <label
              htmlFor="number"
              className="font-Inter font-medium text-[0.875rem] mb-2"
            >
              Número
            </label>
            <input
              type="number"
              placeholder="Digitar número"
              {...register("number")}
              className="appearance-none m-0 font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4 w-full"
            />
            <span className="text-alert1">{errors.number?.message}</span>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="complement"
              className="font-Inter font-medium text-[0.875rem] mb-2"
            >
              Complemento
            </label>
            <input
              type="text"
              placeholder="Ex: apart 307"
              {...register("complement")}
              className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4 w-full"
            />
            <span className="text-alert1">{errors.complement?.message}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 justify-between">
          <p className="font-Inter font-medium text-[0.875rem] mb-2 mt-3">
            Tipo de conta
          </p>
          <div className="flex flex-row gap-2 mb-4">
            <button
              className={`${buyerColor} h-12 max-md:w-[20.813rem] md:w-36 font-semibold text-base border-2 rounded-md`}
              onClick={() => {
                setAccountType("buyer");
                event?.preventDefault();
              }}
            >
              Comprador
            </button>
            <button
              className={`${advertiserColor} h-12 max-md:w-[20.813rem] md:w-36 font-semibold text-base border-2 rounded-md `}
              onClick={() => {
                setAccountType("advertiser");
                event?.preventDefault();
              }}
            >
              Anunciante
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="font-Inter font-medium text-[0.875rem] mb-2"
          >
            Senha
          </label>
          <input
            type="password"
            placeholder="Digitar senha"
            {...register("password")}
            className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
          />
          <span className="text-alert1">{errors.password?.message}</span>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="passwordConfirmation"
            className="font-Inter font-medium text-[0.875rem] mb-2"
          >
            Confirmar Senha
          </label>
          <input
            type="password"
            placeholder="Digitar senha"
            {...register("passwordConfirmation")}
            className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
          />
          <span className="text-alert1">
            {errors.passwordConfirmation?.message}
          </span>
        </div>

        <button className="font-Inter font-semibold text-whiteFixed rounded-md text-[1rem] flex mt-4 justify-center bg-brand1 hover:bg-brand2 py-[0.625rem] border-2 border-brand1">
          Finalizar Cadastro
        </button>
      </form>

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
              className="bg-brand1 text-center rounded w-28 font-inter p-2 text-[14px] text-whiteFixed font-semibold"
            >
              Ir para o login
            </Link>
          </div>
        </ModalBase>
      ) : null}
    </div>
  );
};
