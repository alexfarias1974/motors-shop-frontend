import { AiOutlineClose } from "react-icons/ai";

const editAnnounceForm = () => {
  return (
    <form>
      <div>
        <h3>Editar anúncio</h3>

        <AiOutlineClose />
      </div>

      <div>
        <label htmlFor="typeAnnouncement">Tipo de anúncio</label>
        <div>
          <button>Venda</button>
          <button>Leilão</button>
        </div>
      </div>

      <div>
        <p>Informações do veículo</p>
        <label htmlFor="title">Título</label>
        <input type="text" placeholder="Digitar título" />
      </div>

      <div>
        <div>
          <label htmlFor="year">Ano</label>
          <input type="number" placeholder="2018" />
        </div>

        <div>
          <label htmlFor="mileage">Quilometragem</label>
          <input type="text" placeholder="0" />
        </div>

        <div>
          <label htmlFor="price">Preço</label>
          <input type="text" placeholder="50.000,00" />
        </div>
      </div>

      <div>
        <label htmlFor="description">Descrição</label>
        <textarea name="description" id="" cols={30} rows={10}></textarea>
      </div>

      <div>
        <label htmlFor="typeVehicle">Tipo de anúncio</label>
        <div>
          <button>Carro</button>
          <button>Moto</button>
        </div>
      </div>

      <div>
        <label htmlFor="image">Imagem da Capa</label>
        <input type="text" placeholder="inserir URL da imagem" />
      </div>

      <div>
        <button>Cancelar</button>
        <button>Criar anúncio</button>
      </div>
    </form>
  );
};

export default editAnnounceForm;
