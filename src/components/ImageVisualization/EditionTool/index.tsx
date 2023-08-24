import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { useAtom } from "jotai";
import {
  AtomBtnTextColor,
  AtomBtnBgColor,
  AtomBoxesOpacity,
  AtomFundoAppOpacity,
  AtomFundoAppBlur,
  AtomFundoMenuOpacity,
  AtomFundoMenuBlur,
} from "../../../store";
import { changeRootVarAtribute, valueLabelFormat } from "../../../utils/utils";

// function valueLabelFormat(value: number) {
//   const units = ['KB', 'MB', 'GB', 'TB'];

//   let unitIndex = 0;
//   let scaledValue = value;

//   while (scaledValue >= 1024 && unitIndex < units.length - 1) {
//     unitIndex += 1;
//     scaledValue /= 1024;
//   }

//   return `${scaledValue} ${units[unitIndex]}`;
// }

// function calculateValue(value: number) {
//   return 2 ** value;
// }

export default function EditionTool() {
  const [boxesOpacity, setBoxesOpacity] = useAtom(AtomBoxesOpacity);
  const [fundoAppOpacity, setFundoAppOpacity] = useAtom(AtomFundoAppOpacity);
  const [fundoAppBlur, setFundoAppBlur] = useAtom(AtomFundoAppBlur);
  const [fundoMenuOpacity, setFundoMenuOpacity] = useAtom(AtomFundoMenuOpacity);
  const [fundoMenuBlur, setFundoMenuBlur] = useAtom(AtomFundoMenuBlur);

  return (
    <>
      {/* boxes-opacity: */}
      <Box sx={{ width: "50%" }}>
        <Typography id="non-linear-slider" gutterBottom>
          Login-box-opacity: {valueLabelFormat(boxesOpacity, "%")}
        </Typography>
        <Slider
          value={boxesOpacity}
          min={0}
          step={1}
          max={100}
          // scale={calculateValue}
          // getAriaValueText={(value: number) => {
          //   return `${value}px`;
          // }}
          valueLabelFormat={valueLabelFormat(boxesOpacity, "%")}
          onChange={(event: Event, newValue: number | number[]) => {
            if (typeof newValue === "number") {
              setBoxesOpacity(newValue);
              changeRootVarAtribute(`${newValue}%`, "--boxes-opacity");
            }
          }}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </Box>
      {/* fundo-app-opacity: */}
      <Box sx={{ width: "50%" }}>
        <Typography id="non-linear-slider" gutterBottom>
          Fundo-app-opacity: {valueLabelFormat(fundoAppOpacity, "%")}
        </Typography>
        <Slider
          value={fundoAppOpacity}
          min={0}
          step={1}
          max={100}
          valueLabelFormat={valueLabelFormat(fundoAppOpacity, "%")}
          onChange={(event: Event, newValue: number | number[]) => {
            if (typeof newValue === "number") {
              setFundoAppOpacity(newValue);
              changeRootVarAtribute(`${newValue}%`, "--fundo-app-opacity");
            }
          }}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </Box>
      {/* fundo-app-blur */}
      <Box sx={{ width: "50%" }}>
        <Typography id="non-linear-slider" gutterBottom>
          Fundo-app-blur: {valueLabelFormat(fundoAppBlur, "px")}
        </Typography>
        <Slider
          value={fundoAppBlur}
          min={0}
          step={1}
          max={10}
          valueLabelFormat={valueLabelFormat(fundoAppBlur, "px")}
          onChange={(event: Event, newValue: number | number[]) => {
            if (typeof newValue === "number") {
              setFundoAppBlur(newValue);
              changeRootVarAtribute(`${newValue}px`, "--fundo-app-blur");
            }
          }}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </Box>
      {/* fundo-menu-opacity: */}
      <Box sx={{ width: "50%" }}>
        <Typography id="non-linear-slider" gutterBottom>
          Fundo-menu-opacity: {valueLabelFormat(fundoMenuOpacity, "%")}
        </Typography>
        <Slider
          value={fundoMenuOpacity}
          min={0}
          step={1}
          max={100}
          valueLabelFormat={valueLabelFormat(fundoMenuOpacity, "%")}
          onChange={(event: Event, newValue: number | number[]) => {
            if (typeof newValue === "number") {
              setFundoMenuOpacity(newValue);
              changeRootVarAtribute(`${newValue}%`, "--fundo-menu-opacity");
            }
          }}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </Box>
      {/* fundo-menu-blur */}
      <Box sx={{ width: "50%" }}>
        <Typography id="non-linear-slider" gutterBottom>
          Fundo-app-blur: {valueLabelFormat(fundoMenuBlur, "px")}
        </Typography>
        <Slider
          value={fundoMenuBlur}
          min={0}
          step={1}
          max={10}
          valueLabelFormat={valueLabelFormat(fundoMenuBlur, "px")}
          onChange={(event: Event, newValue: number | number[]) => {
            if (typeof newValue === "number") {
              setFundoMenuBlur(newValue);
              changeRootVarAtribute(`${newValue}px`, "--fundo-menu-blur");
            }
          }}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </Box>
    </>
  );
}
