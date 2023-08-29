import React from "react";
import "./styles.scss";
import ScreenLogin from "./Screens/ScreenLogin";
import ScreenMenuAberto from "./Screens/ScreenMenuAberto";
import ScreensSettings from "./ScreensSettings";

type Props = {
  className: string;
};

const ImageVisualization = ({ className }: Props) => {
  return (
    <div className={`image-visualization-container ${className}`}>
      <p className="pre-visualization-text">Pré-visualização no app do sócio:</p>
      <div className="screens-container">
        <ScreenLogin />
        <ScreenMenuAberto />
      </div>
      <ScreensSettings />
      <h1>Prévia:</h1>
      <div className="box">
        <div
          className="logo-cab-preview"
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    </div>
  );
};

export default ImageVisualization;
