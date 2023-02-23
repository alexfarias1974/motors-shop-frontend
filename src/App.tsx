import { useState } from "react";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Form from "./components/Form/registerAnnoucementForm";
import Header from "./components/Header";
import ModalBase from "./components/ModalBase";
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Header />
      <Form />

      <Footer />
    </>
  );
}

export default App;
