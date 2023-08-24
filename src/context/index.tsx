import React, { createContext, useContext, useRef, createRef } from "react";
import { ReactCropperElement } from "react-cropper";

//Context typing with all references and states that will be stored
type AppContextType = {
  refFundoAppCropper: any;
  refFundoMenuCropper: any;
  refLogoAppCropper: any;
  refLogoCabCropper: any;
};

//Creating the context:
const AppContext = createContext<AppContextType>({} as AppContextType);

//Component that will wrap the entire application:
const AppContextProvider: React.FC<{
  //Typing the prop "children":
  children: React.ReactElement;
}> = ({ children }) => {
  const refFundoAppCropper = createRef<ReactCropperElement>();
  const refFundoMenuCropper = createRef<ReactCropperElement>();
  const refLogoAppCropper = createRef<ReactCropperElement>();
  const refLogoCabCropper = createRef<ReactCropperElement>();

  return (
    <AppContext.Provider
      value={{
        refFundoAppCropper,
        refFundoMenuCropper,
        refLogoAppCropper,
        refLogoCabCropper,
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
