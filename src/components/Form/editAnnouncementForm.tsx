import { useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../../context/userContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editAnnoucementSchema } from "../../validations/forms.validations";
import api from "../../services/api";

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
  images?: Array<string>;
}

const EditAnnounceForm = () => {
  const [sellColor, setSellColor] = useState<string>();
  const [auctionColor, setAuctionColor] = useState<string>();
  const [annoucementType, setAnnouncementType] = useState<string>("sell");
  const [carColor, setCarColor] = useState<string>();
  const [motorcycleColor, setMotorcycleColor] = useState<string>();
  const [vehicleType, setVehicleType] = useState<string>("car");
  const [images, setImages] = useState<Array<string>>([]);
  const { setEditVehicleModalOpen, editVehicleId } = useContext(UserContext);

  useEffect(() => {
    if (annoucementType == "sell") {
      setSellColor("bg-brand1 text-whiteFixed border-2 border-brand1");
      setAuctionColor(
        "bg-whiteFixed border-2 border-grey4 hover:bg-grey1 hover:border-grey11 hover:text-whiteFixed"
      );
    } else {
      setSellColor("bg-whiteFixed");
      setAuctionColor("bg-brand1");
    }
  }, [annoucementType]);

  useEffect(() => {
    if (vehicleType == "car") {
      setCarColor("bg-brand1 text-whiteFixed border-2 border-brand1");
      setMotorcycleColor(
        "bg-whiteFixed border-2 border-grey4 hover:bg-grey1 hover:border-grey11 hover:text-whiteFixed"
      );
    } else {
      setCarColor(
        "bg-whiteFixed border-2 border-grey4 hover:bg-grey1 hover:border-grey11 hover:text-whiteFixed"
      );
      setMotorcycleColor("bg-brand1 text-whiteFixed border-2 border-brand1");
    }
  }, [vehicleType]);

  const editAnnouncement = (data: SubmitFunction) => {
    console.log(images);
    data = { ...data, vehicleType };
    if (images.length > 0) {
      data = { ...data, images: [...images] };
    }

    console.log(data);

    api
      .patch(`/vehicles/${editVehicleId}`, data, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6ZmFsc2UsImlhdCI6MTY3NzYwNzcxOSwiZXhwIjoxNjc3Njk0MTE5LCJzdWIiOiIwNzczMmMwYi0wZDU3LTRkMWQtYTEyYS02YTZlODA4MmI5N2IifQ.5h-xv6qTAtrLkp4FctwEoyVKWz4E3mwj8V6xOWEKoWs`,
        },
      })
      .then((res) => {
        setEditVehicleModalOpen(false);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAnnouncement = () => {
    api
      .delete(`/vehicles/${editVehicleId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6ZmFsc2UsImlhdCI6MTY3NzYwNzcxOSwiZXhwIjoxNjc3Njk0MTE5LCJzdWIiOiIwNzczMmMwYi0wZDU3LTRkMWQtYTEyYS02YTZlODA4MmI5N2IifQ.5h-xv6qTAtrLkp4FctwEoyVKWz4E3mwj8V6xOWEKoWs`,
        },
      })
      .then((res) => {
        setEditVehicleModalOpen(false);
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
    resolver: yupResolver(editAnnoucementSchema),
  });
  const defaultValue = "";

  const addImage = async () => {
    setImages([...images, defaultValue]);
  };

  return (
    <form
      className="w-[32.5rem] m-auto bg-whiteFixed p-5 flex flex-col gap-1 rounded-md font-inter"
      onSubmit={handleSubmit(editAnnouncement)}
    >
      <div className="flex justify-between">
        <h3 className="text-[1rem] font-medium mb-3 font-lexend">
          Editar anúncio
        </h3>

        <AiOutlineClose
          className="hover:cursor-pointer text-grey3 text-[1.5rem]"
          onClick={() => setEditVehicleModalOpen(false)}
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="typeAnnouncement"
          className="font-medium text-[0.875rem] mb-4"
        >
          Tipo de anúncio
        </label>
        <div className="flex justify-between gap-3 mb-4">
          <button
            className={`${sellColor} h-12 w-full rounded font-semibold text-base border-2`}
            onClick={() => setAnnouncementType("sell")}
          >
            Venda
          </button>
          <button
            className={`${auctionColor} h-12 w-full rounded font-semibold text-base border-2`}
            onClick={() => setAnnouncementType("auction")}
          >
            Leilão
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-medium text-[0.875rem] mb-3">
          Informações do veículo
        </p>
        <label htmlFor="title" className="font-medium">
          Título
        </label>
        <input
          type="text"
          placeholder="Digitar título"
          {...register("title")}
          className="font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
        />
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex flex-col">
          <label htmlFor="year" className="font-medium mb-1">
            Ano
          </label>
          <input
            type="number"
            placeholder="2018"
            {...register("year")}
            className="font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="mileage" className="font-medium mb-1">
            Quilometragem
          </label>
          <input
            type="text"
            placeholder="0"
            {...register("mileage")}
            className="font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="font-medium mb-1">
            Preço
          </label>
          <input
            type="text"
            placeholder="50.000,00"
            {...register("price")}
            className="font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4 w-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="font-medium mb-1">
          Descrição
        </label>
        <textarea
          placeholder="Digitar descrição"
          className="font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
          {...register("description")}
        />
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <label htmlFor="typeVehicle" className="font-medium mb-1">
          Tipo de veículo
        </label>
        <div className="flex justify-between gap-3">
          <button
            className={`${carColor} h-12 w-full rounded font-semibold text-base border-2`}
            onClick={() => setVehicleType("car")}
            type="button"
          >
            Carro
          </button>
          <button
            className={`${motorcycleColor} h-12 w-full rounded font-semibold text-base border-2`}
            onClick={() => setVehicleType("motorcycle")}
            type="button"
          >
            Moto
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="image" className="font-medium">
          Imagem da Capa
        </label>
        <input
          type="text"
          placeholder="inserir URL da imagem"
          className="font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
          onBlur={(e) => images.push(e.target.value)}
        />
      </div>

      {images.map((_, index) => {
        const fieldname = `images[${index}]`;

        return (
          <div key={fieldname} className="flex flex-col gap-2">
            <label htmlFor="image" className="font-medium">
              Imagem
            </label>
            <input
              type="text"
              name={`${fieldname}`}
              placeholder="inserir URL da imagem"
              onBlur={(e) => images.push(e.target.value)}
              className="font-normal text-[1rem] rounded-md border-2 border-grey7 p-2 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-12 focus:outline-none mb-4"
            />
          </div>
        );
      })}

      <div>
        <button
          className="bg-brand4 text-brand1 font-semibold text-[0.875rem] h-10 px-3"
          type="button"
          onClick={addImage}
        >
          Adicionar campo para imagem da galeria
        </button>
      </div>

      <div className="flex mt-4 justify-end gap-3">
        <button
          className="bg-grey6 text-grey2 rounded-md p-1 h-12 max-md:w-[20.813rem] md:w-64"
          type="button"
          onClick={deleteAnnouncement}
        >
          Excluir anúncio
        </button>
        <button className="bg-brand1 text-whiteFixed rounded-md p-1 h-12 max-md:w-[20.813rem] md:w-52">
          Salvar alterações
        </button>
      </div>
    </form>
  );
};

export default EditAnnounceForm;
