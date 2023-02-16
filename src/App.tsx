import { useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Button text="Teste" color="bg-brand1" textColor="text-whiteFixed" />
    </>
  );
}

export default App;
