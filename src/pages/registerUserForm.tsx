import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginContext } from "../context/loginContext";
import { IRegisterForm, IUser } from "../interfaces/user.interface";
import { registerUserSchema } from "../validations/forms.validations";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { RegisterUserForm } from "../components/Form/registerUserForm";

export const RegisterUserPage = () => {
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
    handleRegisterValues(newData);
  };

  return (
    <>
      <Header />
      <RegisterUserForm />
      <Footer />
    </>
  );
};
