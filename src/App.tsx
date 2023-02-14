import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button text="Teste" color="bg-brand1" textColor="text-whiteFixed" />
    </>
  );
}

export default App;
