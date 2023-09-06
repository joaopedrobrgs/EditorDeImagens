import React from "react";
import Home from "./pages/Home";
import AppContextProvider from "./context";
import './App.scss'

function App() {
  return (
    <div>
      <AppContextProvider>
        <Home />
      </AppContextProvider>
      </div>
  );
}

export default App;
