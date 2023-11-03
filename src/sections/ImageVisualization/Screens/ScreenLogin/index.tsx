import React from "react";
import "./styles.scss";
import IphoneBottomLine from "src/components/IphoneBottomLine";
import { useAppContext } from "src/context";
import Smartphone from "src/components/Smartphone";
import { useAtom } from "jotai";
import {
  AtomBoxesBgColor,
  AtomBoxesTextColor,
  AtomFundoAppBlur,
  AtomFundoAppOpacity,
  AtomLogoAppIsBorderRounded,
} from "src/store";

type Props = {
  // className: string
};

const TelaInicial = ({}: Props) => {
  const { refLogoAppDomElement, refFundoAppDomElement } = useAppContext();

  const [fundoAppOpacity] = useAtom(AtomFundoAppOpacity);
  const [fundoAppBlur] = useAtom(AtomFundoAppBlur);
  const [boxesBgColor] = useAtom(AtomBoxesBgColor);
  const [boxesTextColor] = useAtom(AtomBoxesTextColor);
  

  const [isLogoAppBorderRounded] = useAtom(AtomLogoAppIsBorderRounded);

  return (
    <div className="screen-login-container">
      <div className="fundo-app-container">
        <div
          className="fundo-app-box"
          ref={refFundoAppDomElement}
          // style={{
          // opacity: `${fundoAppOpacity}%`,
          // filter: `opacity(${fundoAppOpacity})%`,
          // WebkitFilter: `opacity(${Math.floor(decimalToPercentage(watchFundoAppOpacity))})%`,
          // msFilter: `opacity(${Math.floor(decimalToPercentage(watchFundoAppOpacity))})%`,
          // }}
        >
          <div
            className="fundo-app-preview"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
      <Smartphone
        style={{
          backdropFilter: `blur(${fundoAppBlur}px)`,
          WebkitBackdropFilter: `blur(${fundoAppBlur}px)`,
        }}
      >
        {/* <div className="logo" > */}
        <div className="logo-app-box" ref={refLogoAppDomElement}>
          <div
            className="logo-app-preview"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: isLogoAppBorderRounded ? "10px" : "",
            }}
          />
        </div>
        {/* </div> */}
        <div className="center-box">
          <div className="login-box" style={{backgroundColor: `${boxesBgColor}B3`}}>
            <div className="input tw-grid tw-grid-cols-4 tw-grid-rows-1 tw-items-center">
              <span className="input-label tw-col-span-1">CPF</span>
              <div className="input-content tw-col-span-3" />
            </div>
            <div className="input tw-grid tw-grid-cols-4 tw-grid-rows-1 tw-items-center">
              <span className="input-label tw-col-span-1">SENHA</span>
              <div className="input-content tw-col-span-3" />
            </div>
            <div className="checkbox">
              <div className="checkbox-square" />
              <span className="checkbox-text">Lembrar meu CPF</span>
            </div>
            <div className="button">
              <span className="button-text">ENTRAR</span>
            </div>
          </div>
          <div className="forgot-password-box" style={{backgroundColor: `${boxesBgColor}B3`}}>
            <span>Esqueceu sua senha?</span>
          </div>
        </div>
        <div className="credits-container">
          <div className="text-container">
            <span>Desenvolvido por Quality Systems</span>
          </div>
        </div>
      </Smartphone>
    </div>
  );
};

export default TelaInicial;
