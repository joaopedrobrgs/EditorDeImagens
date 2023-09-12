import React, { createContext, useContext, useRef, createRef, useState, useEffect, ReactNode } from "react";
import { ReactCropperElement } from "react-cropper";

//Context typing with all references and states that will be stored
type AppContextType = {
  refFundoAppCropper: any;
  refFundoMenuCropper: any;
  refLogoAppCropper: any;
  refLogoCabCropper: any;
  refLogoAppDomElement: any;
  refLogoCabDomElement: any;
  refFundoAppDomElement: any;
  refFundoMenuDomElement: any;
  // windowWidth: number
};

//Creating the context:
const AppContext = createContext<AppContextType>({} as AppContextType);

//Component that will wrap the entire application:
const AppContextProvider: React.FC<{
  //Typing the prop "children":
  children: React.ReactElement;
}> = ({ children }) => {

  //Referências aos recortes (croppers):
  const refFundoAppCropper = createRef<ReactCropperElement>();
  const refFundoMenuCropper = createRef<ReactCropperElement>();
  const refLogoAppCropper = createRef<ReactCropperElement>();
  const refLogoCabCropper = createRef<ReactCropperElement>();
  
  //Referências aos elementos DOM:
  const refFundoAppDomElement = createRef<Node>();
  const refFundoMenuDomElement = createRef<Node>();
  const refLogoAppDomElement = createRef<Node>();
  const refLogoCabDomElement = createRef<Node>();

  return (
    <AppContext.Provider
      value={{
        refFundoAppCropper,
        refFundoMenuCropper,
        refLogoAppCropper,
        refLogoCabCropper,
        refLogoAppDomElement,
        refLogoCabDomElement,
        refFundoAppDomElement,
        refFundoMenuDomElement
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook to provide access to context object
export const useAppContext = () => {
  return useContext(AppContext);
};

// Exporting the component:
export default AppContextProvider;
