import React from "react";
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
  AtomFundoMenuBlur
} from "src/store";
import { changeRootVarAtribute, valueLabelFormat } from "src/utils/utils";
import "./styles.scss";

type Props = {
  className: string;
};

export default function ScreensSettings({ className }: Props) {
  const [boxesOpacity, setBoxesOpacity] = useAtom(AtomBoxesOpacity);
  const [fundoAppOpacity, setFundoAppOpacity] = useAtom(AtomFundoAppOpacity);
  const [fundoAppBlur, setFundoAppBlur] = useAtom(AtomFundoAppBlur);
  const [fundoMenuOpacity, setFundoMenuOpacity] = useAtom(AtomFundoMenuOpacity);
  const [fundoMenuBlur, setFundoMenuBlur] = useAtom(AtomFundoMenuBlur);
  const [btnBgColor, setBtnBgColor] = useAtom(AtomBtnBgColor);
  const [btnTextColor, setBtnTextColor] = useAtom(AtomBtnTextColor);

  return (
    <div className={`${className} settings-extern-container`}>
      <div className="settings-intern-container">
        <Box className={`settings-box-container`}>
          {/* fundo-app-opacity: */}
          <Box className="settings-input-box">
            <Typography
              id="non-linear-slider"
              gutterBottom
              className="settings-input-label"
            >
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
              size="small"
            />
          </Box>
          {/* fundo-app-blur */}
          <Box className="settings-input-box">
            <Typography
              id="non-linear-slider"
              gutterBottom
              className="settings-input-label"
            >
              Fundo-app-blur: {valueLabelFormat(fundoAppBlur, "px")}
            </Typography>
            <Slider
              value={fundoAppBlur}
              min={0}
              step={0.1}
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
              size="small"
            />
          </Box>
          {/* fundo-menu-opacity: */}
          <Box className="settings-input-box">
            <Typography
              id="non-linear-slider"
              gutterBottom
              className="settings-input-label"
            >
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
              size="small"
            />
          </Box>
          {/* fundo-menu-blur */}
          <Box className="settings-input-box">
            <Typography
              id="non-linear-slider"
              gutterBottom
              className="settings-input-label"
            >
              Fundo-menu-blur: {valueLabelFormat(fundoMenuBlur, "px")}
            </Typography>
            <Slider
              value={fundoMenuBlur}
              min={0}
              step={0.5}
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
              size="small"
            />
          </Box>
          {/* boxes-opacity: */}
          <Box className="settings-input-box">
            <Typography
              id="non-linear-slider"
              gutterBottom
              className="settings-input-label"
            >
              Login-box-opacity: {valueLabelFormat(boxesOpacity, "%")}
            </Typography>
            <Slider
              style={{}}
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
              size="small"
            />
          </Box>
          <div className="settings-input-box">
            {/* btn-bg-color */}
            <Box className="settings-color-box">
              <label className="settings-input-label">
                <span>Btn-bg-color:</span>
              </label>
              <input
                type="color"
                onChange={(evt) => {
                  const { value } = evt.target;
                  changeRootVarAtribute(value, "--btn-bg-color");
                  setBtnBgColor(value);
                }}
                defaultValue={btnBgColor}
              />
            </Box>
          </div>
          <div className="settings-input-box">
            {/* btn-text-color */}
            <Box className="settings-color-box">
              <label className="settings-input-label">
                <span>Btn-txt-color:</span>
              </label>
              <input
                type="color"
                onChange={(evt) => {
                  const { value } = evt.target;
                  changeRootVarAtribute(value, "--btn-text-color");
                  setBtnTextColor(value);
                }}
                defaultValue={btnTextColor}
              />
            </Box>
          </div>
        </Box>
      </div>
    </div>
  );
}
