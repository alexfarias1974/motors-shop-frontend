import * as yup from "yup";

export const registerAnnoucementSchema = yup.object().shape({
  typeAnnoucement: yup.string(),
  title: yup.string(),
  year: yup.number(),
  mileage: yup.string(),
  price: yup.string(),
  description: yup.string(),
  typeVehicle: yup.string(),
  image: yup.string(),
});
