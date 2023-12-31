import React from "react";
import "./styles.scss";
import ScreenLogin from "./Screens/ScreenLogin";
import ScreenMenuAberto from "./Screens/ScreenMenuAberto";

type Props = {
  className: string;
};

const ImageVisualization = ({ className }: Props) => {
  return (
    <div className={`image-visualization-container ${className}`}>
      <p className="pre-visualization-text">Pré-visualização:</p>
      <div className="screens-container">
        <ScreenLogin />
        <ScreenMenuAberto />
      </div>
    </div>
  );
};

export default ImageVisualization;
