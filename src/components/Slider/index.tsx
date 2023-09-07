import { Slider, SliderProps } from "@mui/material";
import { useAtom } from "jotai";
import { AtomSliderChecked, AtomWindowWidth } from "src/store";

import React from "react";

interface Props extends SliderProps {
  sliderRef: any;
}

const SliderDefault = (props: Props) => {
  const [sliderChecked] = useAtom(AtomSliderChecked);
  const [windowWidth] = useAtom(AtomWindowWidth);

  return (
    <Slider

      //Default Options:
      style={{ maxWidth: 750 }}
      min={0}
      max={5}
      step={0.001}
      valueLabelDisplay="auto"
      aria-labelledby="non-linear-slider"
      size={windowWidth > 440 ? "medium" : "small"}
      disabled={!sliderChecked}
      className="zoom-slider"

      //Props:
      ref={props.sliderRef}
      value={props.value}
      valueLabelFormat={props.valueLabelFormat}
      onChange={props.onChange}
      
    />
  );
};

export default SliderDefault;
