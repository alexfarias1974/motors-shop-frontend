import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAnnoucementSchema } from "../../validations/forms.validations";
import { AiOutlineClose } from "react-icons/ai";

export interface IForm {
  accountSubmit: SubmitHandler<FieldValues>;
}

export interface SubmitFunction {
  typeAnnoucement?: string;
  title?: string;
  year?: number;
  mileage?: string;
  price?: string;
  description?: string;
  typeVehicle?: string;
  image?: string;
}

const Form = ({ accountSubmit }: IForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitFunction>({
    resolver: yupResolver(registerAnnoucementSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(accountSubmit)}
      className="w-11/12 md:w-96 m-auto bg-whiteFixed p-8 flex flex-col gap-1 rounded-md font-lexend  "
    >
      <div className="flex items-center justify-between ">
        <h3>Criar anúncio</h3>

        <AiOutlineClose />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="typeAnnoucement" className="font-bold">
          Tipo de anúncio
        </label>
        <select
          {...register("typeAnnoucement")}
          className="rounded-md border-2 border-grey4 p-1 hover:border-grey4"
        >
          <option value="">Selecionar Tipo</option>
          <option value="Compra">Compra</option>
          <option value="Leilão">Leilão</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <p>Informações do veículo</p>
        <label htmlFor="title" className="font-bold">
          Título
        </label>
        <input
          type="text"
          placeholder="Digitar Título"
          {...register("title")}
          className="rounded-md border-2 border-grey4 p-1 hover:border-grey4"
        />
      </div>

      <div className="flex gap-1 flex-wrap md:justify-between">
        <div className="flex flex-col">
          <label htmlFor="year" className="font-bold">
            Ano
          </label>
          <input
            type="number"
            placeholder="2018"
            {...register("year")}
            className="rounded-md border-2 border-grey4 p-1 hover:border-grey4 w-16 md:w-20"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="mileage" className="font-bold">
            Quilometragem
          </label>
          <input
            type="text"
            placeholder="0"
            {...register("mileage")}
            className="rounded-md border-2 border-grey4 p-1 hover:border-grey4  w-28  md:w-28"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="font-bold">
            Preço
          </label>
          <input
            type="text"
            placeholder="50.000,00"
            {...register("price")}
            className="rounded-md border-2 border-grey4 p-1 hover:border-grey4 w-20 md:w-20"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-bold">
          Descrição
        </label>
        <input
          type="text"
          placeholder="Digitar descrição"
          className="rounded-md border-2 border-grey4 p-1 hover:border-grey4 "
          {...register("description")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="typeVehicle" className="font-bold">
          Tipo de anúncio
        </label>
        <select
          className="rounded-md border-2 border-grey4 p-1 hover:border-grey4"
          {...register("typeVehicle")}
        >
          <option value="">Selecionar Tipo</option>
          <option value="Carro">Carro</option>
          <option value="Moto">Moto</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="image" className="font-bold">
          Imagem da Capa
        </label>
        <input
          type="text"
          placeholder="inserir URL da imagem"
          className="rounded-md border-2 border-grey4 p-1 hover:border-grey4"
          {...register("image")}
        />
      </div>
      <div className="flex mt-4 justify-between">
        <button className="bg-grey6 text-grey2 rounded-md p-1 ">
          Cancelar
        </button>
        <button className="bg-brand1 text-whiteFixed rounded-md p-1 ">
          Criar anúncio
        </button>
      </div>
    </form>
  );
};

export default Form;
