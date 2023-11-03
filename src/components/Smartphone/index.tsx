import React, { CSSProperties, ReactNode } from "react";
import IphoneFrontalCamera from "../IphoneFrontalCamera";
import IphoneBottomLine from "../IphoneBottomLine";

interface Props {
  children: ReactNode;
  style?: CSSProperties;
}

const Smartphone: React.FC<Props> = ({ children, style }) => {
  const _style: CSSProperties = {
    ...(style || {}),
    position: "relative",
    border: "7px solid black",
    boxSizing: "border-box",
    borderRadius: "30px",
    width: "220px",
    height: "445px",
    overflow: "hidden",
  };

  return (
    <div style={_style}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          zIndex: 100,
        }}
      >
        <IphoneFrontalCamera />
      </div>
      {children}
      <IphoneBottomLine />
    </div>
  );
};

export default Smartphone;
