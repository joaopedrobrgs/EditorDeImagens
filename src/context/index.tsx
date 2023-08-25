import React, { createContext, useContext, useRef, createRef, useState, useEffect } from "react";
import { ReactCropperElement } from "react-cropper";

//Context typing with all references and states that will be stored
type AppContextType = {
  refFundoAppCropper: any;
  refFundoMenuCropper: any;
  refLogoAppCropper: any;
  refLogoCabCropper: any;
  windowWidth: number
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

  const [windowWidth, setWindowWidth] = useState<number>(getWindowWidth());

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowWidth(){
    return window.innerWidth;
  }

  return (
    <AppContext.Provider
      value={{
        refFundoAppCropper,
        refFundoMenuCropper,
        refLogoAppCropper,
        refLogoCabCropper,
        windowWidth,
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
