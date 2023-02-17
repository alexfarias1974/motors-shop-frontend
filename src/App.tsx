import { useState } from "react";
import Button from "./components/Button";
import Form from "./components/Form/registerAnnoucementForm";
import ModalBase from "./components/ModalBase";

function App() {
  const [count, setCount] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsOpenModal(true);
        }}
      >
        opa
      </button>

      {isOpenModal ? (
        <ModalBase setIs={setIsOpenModal}>
          <Form accountSubmit={() => {}} />
        </ModalBase>
      ) : null}
    </>
  );
}

export default App;
