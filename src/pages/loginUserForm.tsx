import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import { ILoginDataProps } from "../interfaces/login.interface";
import { loginSchema } from "../validations/forms.validations";

const LoginUser = () => {
  const { toRegister, loginData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginDataProps>({ resolver: yupResolver(loginSchema) });

  return (
    <div>
      <form onSubmit={handleSubmit(loginData)}>
        <h3>Login</h3>

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
            className="font-Inter font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
          />
          <span className="text-alert1">{errors.password?.message}</span>
        </div>

        <button type="submit" onClick={() => handleSubmit}>
            Entrar
        </button>

      </form>
    </div>
  );
};

export default LoginUser;
