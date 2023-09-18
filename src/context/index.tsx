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

  //Cropper references (croppers):
  const refFundoAppCropper = useRef<ReactCropperElement>();
  const refFundoMenuCropper = useRef<ReactCropperElement>();
  const refLogoAppCropper = useRef<ReactCropperElement>();
  const refLogoCabCropper = useRef<ReactCropperElement>();
  
  //DOM Elements References:
  const refFundoAppDomElement = useRef<Node>();
  const refFundoMenuDomElement = useRef<Node>();
  const refLogoAppDomElement = useRef<Node>();
  const refLogoCabDomElement = useRef<Node>();

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
