import React, { useContext } from "react";
import { ContextProvider, useStateContext } from "./utils/GlobalState";

const ExampleComponent = () => {
  const [state, setState] = useStateContext();

  return (
    <>
      <h2>Example Component</h2>
      <p>name: {state.name}</p>
      <p>email: {state.email}</p>
    </>
  );
};

export default ExampleComponent;
