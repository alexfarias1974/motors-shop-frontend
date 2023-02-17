import * as yup from "yup";

export const registerAnnoucementSchema = yup.object().shape({
  typeAnnoucement: yup.string().required("O tipo de anuncio é obrigatório"),
  title: yup.string().required("Título é obrigatório"),
  year: yup.number().required("Ano é obrigatório"),
  mileage: yup.string().required("Quilometragem é obrigatório"),
  price: yup.string().required("Preço é obrigatório"),
  description: yup.string().required("Descrição obrigatória"),
  typeVehicle: yup.string().required("O tipo de veiculo é obrigatório"),
  image: yup.string().required("Imagem é obrigatória"),
});
