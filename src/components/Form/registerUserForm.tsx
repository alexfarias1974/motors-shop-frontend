import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginContext } from "../../context/loginContext";
import { IRegisterForm, IUser } from "../../interfaces/user.interface";
import { registerUserSchema } from "../../validations/forms.validations";
import Button from "../Button";
import "./styles.css";

export const RegisterUserForm = () => {
  // const [divClasses, setDivClasses] = useState({
  //   buyer: "color1",
  //   advertiser: "color2",
  //   lastClicked: null,
  // });

  // const handleClick = (div: any) => {
  //   const newClasses = { ...divClasses };
  //   if (div === newClasses.lastClicked) {
  //     newClasses[div] = newClasses[div] ? "color2" : "color1";
  //     newClasses[div === "buyer" ? "advertiser" : "buyer"] = newClasses[
  //       div === "buyer" ? "advertiser" : "buyer"
  //     ]
  //       ? "color2"
  //       : "color1";
  //   } else {
  //     newClasses[div] = "color1";
  //     newClasses[div === "buyer" ? "advertiser" : "buyer"] = "color2";
  //   }
  //   newClasses.lastClicked = div;
  //   setDivClasses(newClasses);
  // };
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

  const { handleRegisterValues } = useContext(LoginContext);

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
    <div className="bg-grey8">
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
          {/* <span className="text-alert1">{registerErrors.name?.message}</span> */}
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
          {/* <span className="text-alert1">{registerErrors.email?.message}</span> */}
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
          {/* <span className="text-alert1">{registerErrors.cpf?.message}</span> */}
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
          {/* <span className="text-alert1">{registerErrors.phone?.message}</span> */}
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
          {/* <span className="text-alert1">{registerErrors.birthdate?.message}</span> */}
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
          {/* <span className="text-alert1">{registerErrors.description?.message}</span> */}
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
            {/* <span className="text-alert1">{registerErrors.state?.message}</span> */}
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
            {/* <span className="text-alert1">{registerErrors.city?.message}</span> */}
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
          {/* <span className="text-alert1">{registerErrors.street?.message}</span> */}
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
            {/* <span className="text-alert1">{registerErrors.number?.message}</span> */}
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
            {/* <span className="text-alert1">{registerErrors.complement?.message}</span> */}
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
          {/* <span className="text-alert1">{registerErrors.password?.message}</span> */}
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
          {/* <span className="text-alert1"> */}
          {/* {registerErrors.passwordConfirmation?.message} */}
          {/* </span> */}
        </div>

        <div className="font-Inter font-semibold text-whiteFixed rounded-md text-[1rem] flex mt-4 justify-center bg-brand1 hover:bg-brand2">
          <Button text={"Finalizar Cadastro"} type="submit" />
        </div>
      </form>
    </div>
  );
};
