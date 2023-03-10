import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAnnoucementSchema } from "../../validations/forms.validations";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../services/api";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import ModalBase from "../ModalBase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Form = () => {
  const [sellColor, setSellColor] = useState<string>();
  const [auctionColor, setAuctionColor] = useState<string>();
  const [annoucementType, setAnnouncementType] = useState<string>("sell");
  const [carColor, setCarColor] = useState<string>();
  const [motorcycleColor, setMotorcycleColor] = useState<string>();
  const [vehicleType, setVehicleType] = useState<string>("car");
  const [images, setImages] = useState<Array<string>>([]);
  const [isModalSucess, setIsModalSucess] = useState(false);

  const { createVehicleModalOpen, setCreateVehicleModalOpen } =
    useContext(UserContext);

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

  const registerAnnouncement = (data: SubmitFunction) => {
    const filteredImages = images.filter((image, i) => {
      return images.indexOf(image) === i;
    });
    console.log(filteredImages);
    data = { ...data, vehicleType, images: filteredImages };

    api
      .post("/vehicles", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@tokenId:token")}`,
        },
      })
      .then((res) => {
        setIsModalSucess(true);
        window.location.reload();
        // setCreateVehicleModalOpen(false);
        return res.data;
      })
      .catch((err) => toast.error("Alguma coisa deu errado!"));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitFunction>({
    resolver: yupResolver(registerAnnoucementSchema),
  });

  const [imagesRender, setImagesRender] = useState<Array<string>>([]);

  const addImage = async () => {
    setImagesRender([...imagesRender, ""]);
  };

  return (
    <>
      <div className="bg-whiteFixed p-2 rounded md:w-[32.5rem] overflow-y-scroll max-sm:w-[94vw] h-[50rem]">
        <form
          onSubmit={handleSubmit(registerAnnouncement)}
          className="p-4 flex flex-col md:p-8 "
        >
          <div className="flex justify-between">
            <h3 className="text-[0.900rem] font-medium mb-3 font-lexend">
              Criar anúncio
            </h3>

            <AiOutlineClose
              onClick={() => setCreateVehicleModalOpen(false)}
              className="hover:cursor-pointer text-grey3 text-[1.25rem]"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="typeAnnoucement"
              className="font-medium text-[0.875rem] mb-6 mt-7"
            >
              Tipo de anúncio
            </label>
            <div className="flex justify-between gap-3 mb-4">
              <button
                className={`${sellColor} w-full rounded font-semibold text-base border-2 px-6 py-3`}
                type="button"
                onClick={() => setAnnouncementType("sell")}
              >
                Venda
              </button>
              <button
                className={`${auctionColor} w-full rounded font-semibold text-base border-2 px-6 py-3`}
                type="button"
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
              placeholder="Digitar Título"
              {...register("title")}
              className="font-normal text-[0.900rem] rounded border-2 border-grey7 pl-4 py-6 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
            />
          </div>

          <div className="flex justify-between w-full max-sm:flex-wrap">
            <div className="flex flex-col w-[32%] max-sm:w-[49%]">
              <label htmlFor="year" className="font-medium mb-1">
                Ano
              </label>
              <input
                type="number"
                placeholder="2018"
                {...register("year")}
                className="font-normal text-[0.900rem] rounded border-2 border-grey7 pl-4 py-6 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
              />
            </div>

            <div className="flex flex-col w-[32%] max-sm:w-[49%]">
              <label htmlFor="mileage" className="font-medium mb-1">
                Quilometragem
              </label>
              <input
                type="text"
                placeholder="0"
                {...register("mileage")}
                className="font-normal text-[0.900rem] rounded border-2 border-grey7 pl-4 py-6 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
              />
            </div>

            <div className="flex flex-col w-[32%] max-sm:w-[100%]">
              <label htmlFor="price" className="font-medium mb-1">
                Preço
              </label>
              <input
                type="text"
                placeholder="50.000,00"
                {...register("price")}
                className="font-normal text-[0.900rem] rounded border-2 border-grey7 pl-4 py-6 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-medium mb-1">
              Descrição
            </label>
            <textarea
              placeholder="Digitar descrição"
              className="resize-none font-normal text-[0.900rem] rounded border-2 border-grey7 p-4 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-24 focus:outline-none mb-4"
              {...register("description")}
            />
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <label htmlFor="typeVehicle" className="font-medium mb-1">
              Tipo de veículo
            </label>

            <div className="flex justify-between gap-3">
              <button
                className={`${carColor} w-full rounded font-semibold text-base border-2 px-6 py-3`}
                type="button"
                onClick={() => setVehicleType("car")}
              >
                Carro
              </button>
              <button
                className={`${motorcycleColor} w-full rounded font-semibold text-base border-2 px-6 py-3`}
                type="button"
                onClick={() => setVehicleType("motorcycle")}
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
              id="image"
              placeholder="inserir URL da imagem"
              className="font-normal text-[0.900rem] rounded border-2 border-grey7 pl-4 py-6 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
              onBlur={(e) => {
                images.push(e.target.value);
                setImages(images.filter((image) => image !== ""));
              }}
            />
          </div>

          {imagesRender.map((_, index) => {
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
                  className="font-normal text-[0.900rem] rounded border-2 border-grey7 pl-4 py-6 hover:bg-grey7 focus:border-brand2 focus:bg-grey7 h-8 focus:outline-none mb-4"
                  onBlur={(e) => {
                    images.push(e.target.value);
                    setImages(images.filter((image) => image !== ""));
                  }}
                />
              </div>
            );
          })}

          <div>
            <button
              className="bg-brand4 text-brand1 font-semibold text-[0.875rem] h-10 px-3 rounded mt-3 max-sm:w-[100%]"
              type="button"
              onClick={addImage}
            >
              Adicionar campo para imagem da galeria
            </button>
          </div>

          <div className="flex justify-end gap-2 mt-7 max-sm:justify-between">
            <button
              className="bg-grey6 text-grey2 rounded px-6 py-3 font-semibold"
              onClick={() => setCreateVehicleModalOpen(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-brand1 text-whiteFixed rounded px-6 py-3 font-semibold"
            >
              Criar anúncio
            </button>
          </div>
        </form>
      </div>

      {isModalSucess ? (
        <ModalBase setIs={setIsModalSucess}>
          <div className="bg-whiteFixed w-11/12 rounded-md p-3 flex flex-col gap-5 max-w-[26.568rem]">
            <div className="flex justify-between">
              <h2 className="text-[1rem] font-medium mb-3 font-lexend">
                Sucesso!
              </h2>
              <AiOutlineClose
                onClick={() => {
                  setIsModalSucess(false);
                  setCreateVehicleModalOpen(false);
                }}
                className="hover:cursor-pointer text-grey3 text-[.900rem]"
              />
            </div>

            <div>
              <p className="font-lexend font-bold text-[1rem]">
                Seu anúncio foi criado com sucesso!
              </p>
            </div>

            <div>
              <p className="font-inter text-grey2 text-[1rem]">
                Agora você poderá ver seus negócios crescendo em grande escala
              </p>
            </div>
          </div>
        </ModalBase>
      ) : null}
    </>
  );
};

export default Form;
