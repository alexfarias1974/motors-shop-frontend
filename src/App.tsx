import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button text="teste" color="bg-brand1" />
    </>
  );
}

export default App;
