import React, {useEffect, useRef, useState} from "react";
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
import "./styles.scss";
import { useAppContext } from "../../../context";

export default function ScreensSettings() {
  const [boxesOpacity, setBoxesOpacity] = useAtom(AtomBoxesOpacity);
  const [fundoAppOpacity, setFundoAppOpacity] = useAtom(AtomFundoAppOpacity);
  const [fundoAppBlur, setFundoAppBlur] = useAtom(AtomFundoAppBlur);
  const [fundoMenuOpacity, setFundoMenuOpacity] = useAtom(AtomFundoMenuOpacity);
  const [fundoMenuBlur, setFundoMenuBlur] = useAtom(AtomFundoMenuBlur);
  const [btnBgColor, setBtnBgColor] = useAtom(AtomBtnBgColor);
  const [btnTextColor, setBtnTextColor] = useAtom(AtomBtnTextColor);

  const {windowWidth} = useAppContext();

  // useEffect(()=>{
  //   console.log(windowWidth);
  // }, [windowWidth])

  return (
    <>
      <Box className="tw-grid tw-grid-cols-2 tw-grid-rows-4 settings-container">
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
            size= {windowWidth > 440 ? "medium" : "small"}
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
            size= {windowWidth > 440 ? "medium" : "small"}
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
            size= {windowWidth > 440 ? "medium" : "small"}
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
            size= {windowWidth > 440 ? "medium" : "small"}
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
            size= {windowWidth > 440 ? "medium" : "small"}
          />
        </Box>
        <div className="settings-input-box">
          {/* btn-bg-color */}
          <Box className="color-container">
            <label className="settings-input-label">
              <span>Button-background-color:</span>
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
          {/* btn-text-color */}
          <Box className="color-container">
            <label className="settings-input-label">
              <span>Button-text-color:</span>
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
    </>
  );
}
