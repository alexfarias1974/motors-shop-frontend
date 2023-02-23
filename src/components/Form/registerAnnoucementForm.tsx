import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAnnoucementSchema } from "../../validations/forms.validations";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../services/api";
import { useEffect, useState } from "react";

export interface IForm {
  accountSubmit: SubmitHandler<FieldValues>;
}

export interface SubmitFunction {
  typeAnnoucement?: string;
  title?: string;
  year?: number;
  mileage?: number;
  price?: number;
  description?: string;
  vehicleType?: string;
  image?: string;
}

const Form = ({ accountSubmit }: IForm) => {
  const [sellColor, setSellColor] = useState<string>();
  const [auctionColor, setAuctionColor] = useState<string>();
  const [annoucementType, setAnnouncementType] = useState<string>("sell");
  const [carColor, setCarColor] = useState<string>();
  const [motorcycleColor, setMotorcycleColor] = useState<string>();
  const [vehicleType, setVehicleType] = useState<string>("car");

  useEffect(() => {
    if (annoucementType == "sell") {
      setSellColor("bg-brand1 text-whiteFixed border-2 border-brand1");
      setAuctionColor("bg-whiteFixed border-2 border-grey4");
    } else {
      setSellColor("bg-whiteFixed");
      setAuctionColor("bg-brand1");
    }
  }, [annoucementType]);

  useEffect(() => {
    if (vehicleType == "car") {
      setCarColor("bg-brand1 text-whiteFixed border-2 border-brand1");
      setMotorcycleColor("bg-whiteFixed border-2 border-grey4");
    } else {
      setCarColor("bg-whiteFixed");
      setMotorcycleColor("bg-brand1");
    }
  }, [vehicleType]);

  const registerAnnoucement = (data: SubmitFunction) => {
    data = { ...data, vehicleType };
    api
      .post("/vehicles", data, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6ZmFsc2UsImlhdCI6MTY3NzE3MDEzMywiZXhwIjoxNjc3MjU2NTMzLCJzdWIiOiJjNjk3OWI4MS1mODRhLTQ0NDQtYTViZS04NGUyOGM5NmIxNGQifQ.KFcW3J_5IpK2lxTEagntVthhUDIVgsPonnlWpoF0qrQ`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitFunction>({
    resolver: yupResolver(registerAnnoucementSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(registerAnnoucement)}
      className="w-11/12 md:w-96 m-auto bg-whiteFixed p-8 flex flex-col gap-1 rounded-md font-Lexend"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[1rem] font-medium mb-3">Criar anúncio</h3>

        <AiOutlineClose />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="typeAnnoucement"
          className="font-medium text-[0.875rem]"
        >
          Tipo de anúncio
        </label>
        <div className="flex justify-between">
          <button
            className={`${sellColor} h-12 max-md:w-[20.813rem] md:w-36 rounded font-semibold text-base border-2`}
            onClick={() => setAnnouncementType("sell")}
          >
            Venda
          </button>
          <button
            className={`${auctionColor} h-12 max-md:w-[20.813rem] md:w-36 rounded font-semibold text-base border-2`}
            onClick={() => setAnnouncementType("auction")}
          >
            Leilão
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-medium text-[1rem]">Informações do veículo</p>
        <label htmlFor="title" className="font-medium">
          Título
        </label>
        <input
          type="text"
          placeholder="Digitar Título"
          {...register("title")}
          className="rounded-md border-2 border-grey4 p-1 hover:border-grey4 h-12 "
        />
      </div>

      <div className="flex gap-1 flex-wrap md:justify-between">
        <div className="flex flex-col">
          <label htmlFor="year" className="font-medium">
            Ano
          </label>
          <input
            type="number"
            placeholder="2018"
            {...register("year")}
            className="rounded-md border-2 border-grey4 p-1 hover:border-grey4 w-16 md:w-20 h-12"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="mileage" className="font-medium">
            Quilometragem
          </label>
          <input
            type="text"
            placeholder="0"
            {...register("mileage")}
            className="rounded-md border-2 border-grey4 p-1 hover:border-grey4  w-28  md:w-28 h-12"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="font-medium">
            Preço
          </label>
          <input
            type="text"
            placeholder="50.000,00"
            {...register("price")}
            className="rounded-md border-2 border-grey4 p-1 hover:border-grey4 w-20 md:w-20 h-12"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-medium">
          Descrição
        </label>
        <input
          type="text"
          placeholder="Digitar descrição"
          className="rounded-md border-2 border-grey4 p-1 hover:border-grey4 h-12"
          {...register("description")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="typeVehicle" className="font-medium">
          Tipo de veículo
        </label>

        <div className="flex justify-between">
          <button
            className={`${carColor} h-12 max-md:w-[20.813rem] md:w-36 rounded font-semibold text-base border-2`}
            onClick={() => setVehicleType("car")}
          >
            Carro
          </button>
          <button
            className={`${motorcycleColor} h-12 max-md:w-[20.813rem] md:w-36 rounded font-semibold text-base border-2`}
            onClick={() => setVehicleType("motorcycle")}
          >
            Moto
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="image" className="font-medium">
          Imagem da Capa
        </label>
        <input
          type="text"
          placeholder="inserir URL da imagem"
          className="rounded-md border-2 border-grey4 p-1 hover:border-grey4 h-12"
          {...register("image")}
        />
      </div>
      <div className="flex mt-4 justify-end gap-3">
        <button className="bg-grey6 text-grey2 rounded-md p-1 h-12 max-md:w-[20.813rem] md:w-24">
          Cancelar
        </button>
        <button className="bg-brand1 text-whiteFixed rounded-md p-1 h-12 max-md:w-[20.813rem] md:w-36">
          Criar anúncio
        </button>
      </div>
    </form>
  );
};

export default Form;
