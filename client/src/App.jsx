import React from "react";
import Layout from "./components/Layout";

export const Context = React.createContext();
function App() {
  return (
    <Context.Provider>
      <Layout />
    </Context.Provider>
  );
}

export default App;
