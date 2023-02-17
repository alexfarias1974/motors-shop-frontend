import { useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Header />
    </>
  );
}

export default App;
