import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { LoginContext } from "../context/loginContext";
import { UserContext } from "../context/userContext";
import { ILoginDataProps } from "../interfaces/login.interface";
import { loginSchema } from "../validations/forms.validations";
import LogoMotors from "../assets/Motors shop.png";

const LoginUser = () => {
  const { handleLoginValues } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginDataProps>({ resolver: yupResolver(loginSchema) });

  const onSubmitFunction = (data: any) => {
    console.log(data);
    handleLoginValues(data);
  };

  return (
    <>
      <Header />
      <div className="bg-grey8 py-10 h-screen">
        <form
          onSubmit={handleSubmit(onSubmitFunction)}
          className="sm:w-96 m-auto bg-whiteFixed max-w-[25.75rem] p-8 flex flex-col gap-1 rounded-md font-Lexend"
        >
          <h3 className="text-[1.5rem] font-medium mb-3">Login</h3>

          <div className="flex flex-col gap-1">
            <p className="font-Inter font-medium text-[0.875rem] mb-2">
              Informações pessoais
            </p>
            <label
              htmlFor="email"
              className="font-Inter font-medium text-[0.875rem] mb-1"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Ex: Samuel Leão"
              {...register("email")}
              className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
            />
            <span className="text-alert1">{errors.email?.message}</span>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="font-Inter font-medium text-[0.875rem] mb-1"
            >
              Senha
            </label>
            <input
              type="password"
              placeholder="Ex: Samuel Leão"
              {...register("password")}
              className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-1"
            />
            <span className="text-alert1">{errors.password?.message}</span>
          </div>
          <a
            href="./forgotPassword"
            className="text-end font-Inter font-medium text-[0.875rem] text-grey2"
          >
            Esqueci minha senha
          </a>
          <div className="font-Inter font-semibold text-whiteFixed rounded-md text-[1rem] flex mt-4 justify-center bg-brand1 hover:bg-brand2 mb-4">
            <Button text={"Entrar"} type="submit" />
          </div>
          <p className="text-center font-Inter font-normal text-[0.875rem] text-grey2">
            Ainda não possui conta?
          </p>
          <div className="font-Inter font-semibold text-grey0 rounded-md text-[1rem] flex mt-4 justify-center border-solid border-2 border-grey5 bg-whiteFixed hover:bg-grey0 hover:border-grey0 hover:text-whiteFixed">
            <Button onClick="location.href='./register'" text={"Cadastrar"} />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoginUser;
