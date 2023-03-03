import * as yup from "yup";

export const registerAnnoucementSchema = yup.object().shape({
  title: yup.string().required("Título é obrigatório"),
  year: yup.number().required("Ano é obrigatório"),
  mileage: yup.string().required("Quilometragem é obrigatório"),
  price: yup.string().required("Preço é obrigatório"),
  description: yup.string().required("Descrição obrigatória"),
});

export const editAnnoucementSchema = yup.object().shape({
  title: yup.lazy((value) => {
    if (value !== undefined) {
      return yup.string();
    }
    return yup.mixed().notRequired();
  }),
  year: yup.lazy((value) => {
    if (value !== undefined) {
      return yup.string();
    }
    return yup.mixed().notRequired();
  }),
  mileage: yup.lazy((value) => {
    if (value !== undefined) {
      return yup.string();
    }
    return yup.mixed().notRequired();
  }),
  price: yup.lazy((value) => {
    if (value !== undefined) {
      return yup.string();
    }
    return yup.mixed().notRequired();
  }),
  description: yup.lazy((value) => {
    if (value !== undefined) {
      return yup.string();
    }
    return yup.mixed().notRequired();
  }),
});

export const registerUserSchema = yup.object().shape({
  name: yup
    .string()
    .required("Adicione seu nome")
    .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Somente letras"),

  email: yup.string().required("Adicione seu e-mail").email("E-mail inválido"),

  cpf: yup
    .string()
    .required("Adicione seu CPF")
    .min(11, "CPF deve conter no mínimo 11 caracteres")
    .max(11, "CPF deve conter no máximo 11 caracteres"),

  phone: yup.string().required("Adicione seu telefone"),

  birthdate: yup
    .date()
    .max(new Date(), "Data de nascimento não pode ser no futuro")
    .min(new Date("01-01-1900"), "Data de nascimento inválida")
    .required("Adicione sua data de nascimento"),

  description: yup.string().required("Adicione uma descrição"),

  password: yup
    .string()
    .matches(/[A-Z]/, "deve conter ao menos 1 letra maiúscula")
    .matches(/([a-z])/, "deve conter ao menos 1 letra minúscula")
    .matches(/(\d)/, "deve conter ao menos 1 número")
    .matches(/(\W)|_/, "deve conter ao menos 1 caracter especial")
    .matches(/.{8,}/, "deve conter ao menos 8 dígitos")
    .required("Crie uma senha"),

  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null!],
      "As senhas devem corresponder entre si"
    )
    .required("Confirme sua senha"),

  state: yup.string().required("Adicione seu estado"),
  city: yup.string().required("Adicione sua cidade"),
  street: yup.string().required("Adicione sua rua"),
  zipCode: yup.string().required("Adicione seu CEP"),
  number: yup.number().notRequired(),
  complement: yup.string().notRequired(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required("Campo obrigatório").email("Email inválido!"),
  password: yup.string().required("Campo obrigatório"),
});

export const userPatchSchema = yup.object().shape({
  name: yup.lazy((value) => {
    if (value !== undefined) {
      yup.string();
    }
    return yup.mixed().notRequired();
  }),
  email: yup.lazy((value) => {
    if (value !== undefined) {
      yup.string();
    }
    return yup.mixed().notRequired();
  }),
  cpf: yup.lazy((value) => {
    if (value !== undefined) {
      yup.number();
    }
    return yup.mixed().notRequired();
  }),
  phone: yup.lazy((value) => {
    if (value !== undefined) {
      yup.number();
    }
    return yup.mixed().notRequired();
  }),
  birthdate: yup.lazy((value) => {
    if (value !== undefined) {
      yup.date();
    }
    return yup.mixed().notRequired();
  }),
  description: yup.lazy((value) => {
    if (value !== undefined) {
      yup.string();
    }
    return yup.mixed().notRequired();
  }),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string(),
  password: yup
    .string()
    .matches(/[A-Z]/, "deve conter ao menos 1 letra maiúscula")
    .matches(/([a-z])/, "deve conter ao menos 1 letra minúscula")
    .matches(/(\d)/, "deve conter ao menos 1 número")
    .matches(/(\W)|_/, "deve conter ao menos 1 caracter especial")
    .matches(/.{8,}/, "deve conter ao menos 8 dígitos")
    .required("Crie uma senha"),

  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null!],
      "As senhas devem corresponder entre si"
    )
    .required("Confirme sua senha")
})

