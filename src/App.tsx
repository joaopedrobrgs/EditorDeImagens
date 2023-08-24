import React from "react";
import Home from "./pages/Home";
import AppContextProvider from "./context";

function App() {
  return (
    <>
      <AppContextProvider>
        <Home />
      </AppContextProvider>
    </>
  );
}

export default App;
