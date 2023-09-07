import React, { MouseEventHandler, ReactNode } from "react";
import { calcFontSizeAccordingToWidth } from "src/utils/utils";
import { useAtom } from "jotai";
import { AtomWindowWidth } from "src/store";
import "./styles.scss";

interface Props {
  text?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
  bgColor?: string;
  alignSelf?: string;
  className?: string;
}

const ButtonDefault = (props: Props) => {
  const [windowWidth] = useAtom(AtomWindowWidth);
  return (
    <div
      className={`btn ${props.className}`}
      onClick={props.onClick}
      style={{
        fontSize: calcFontSizeAccordingToWidth(windowWidth),
        backgroundColor: `${props.bgColor}`,
        alignSelf: `${props.alignSelf}`,
      }}
    >
      <div className="text-container">
        <span>{props.text}</span>
      </div>
      <div className="icon-container">{props.children}</div>
    </div>
  );
};

export default ButtonDefault;
