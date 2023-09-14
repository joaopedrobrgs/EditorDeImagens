import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useAtom } from "jotai";
import {
  AtomShowSettingsModal,
  AtomOnTouchChecked,
  AtomOnWheelChecked,
  AtomSliderChecked,
  AtomCompressChecked,
  AtomMaxSizeFundoApp,
  AtomMaxSizeFundoMenu,
  AtomLogoAppCompressionRate,
  AtomLogoCabCompressionRate,
  // AtomCompressionOptions,
} from "src/store";
import { Slider } from "@mui/material";
import { valueLabelFormat } from "src/utils/utils";

type Props = {};

const PageSettings = (props: Props) => {
  const [sliderChecked, setSliderChecked] = useAtom(AtomSliderChecked);
  const [onWheelChecked, setOnWheelChecked] = useAtom(AtomOnWheelChecked);
  const [onTouchChecked, setOnTouchChecked] = useAtom(AtomOnTouchChecked);
  const [compressChecked, setCompressChecked] = useAtom(AtomCompressChecked);
  const [maxSizeFundoApp, setMaxSizeFundoApp] = useAtom(AtomMaxSizeFundoApp);
  const [maxSizeFundoAppTemporaryValue, setMaxSizeFundoAppTemporaryValue] =
    useState<number>(maxSizeFundoApp ?? 200);
  const [maxSizeFundoMenu, setMaxSizeFundoMenu] = useAtom(AtomMaxSizeFundoMenu);
  const [maxSizeFundoMenuTemporaryValue, setMaxSizeFundoMenuTemporaryValue] =
    useState<number>(maxSizeFundoMenu ?? 200);
  const [logoAppCompressionRate, setLogoAppCompressionRate] = useAtom(
    AtomLogoAppCompressionRate
  );
  const [logoCabCompressionRate, setLogoCabCompressionRate] = useAtom(
    AtomLogoCabCompressionRate
  );

  const [, setShowSettingsModal] = useAtom(AtomShowSettingsModal);

  function handleCloseModal(e: any) {
    if (e.target.className.includes("page-settings-modal")) {
      setShowSettingsModal(false);
      if (
        !!maxSizeFundoAppTemporaryValue ||
        maxSizeFundoAppTemporaryValue === 0
      ) {
        if (maxSizeFundoAppTemporaryValue >= 100000) {
          setMaxSizeFundoApp(99999);
        } else if (maxSizeFundoAppTemporaryValue >= 1) {
          setMaxSizeFundoApp(maxSizeFundoAppTemporaryValue);
        } else {
          setMaxSizeFundoApp(1);
        }
      }
      if (
        !!maxSizeFundoMenuTemporaryValue ||
        maxSizeFundoMenuTemporaryValue === 0
      ) {
        if (maxSizeFundoMenuTemporaryValue >= 100000) {
          setMaxSizeFundoMenu(99999);
        } else if (maxSizeFundoMenuTemporaryValue >= 1) {
          setMaxSizeFundoMenu(maxSizeFundoMenuTemporaryValue);
        } else {
          setMaxSizeFundoMenu(1);
        }
      }
      setMaxSizeFundoAppTemporaryValue(maxSizeFundoApp);
      setMaxSizeFundoMenuTemporaryValue(maxSizeFundoMenu);
    }
  }

  return (
    <div className="page-settings-modal" onClick={handleCloseModal}>
      <div className="page-settings-container">
        <div className="option-container">
          <div className="zoom-options-title">
            <p>Opções de Zoom:</p>
            <p className="observation-text">
              (alterações aqui interferem no zoom atual)
            </p>
          </div>
          <div className="option-content">
            <label>
              <input
                type="checkbox"
                checked={sliderChecked}
                onChange={() => {
                  setSliderChecked(!sliderChecked);
                }}
              />
              Controle Deslizante
            </label>
            <label>
              <input
                type="checkbox"
                checked={onWheelChecked}
                onChange={() => {
                  setOnWheelChecked(!onWheelChecked);
                }}
              />
              Roda do Mouse
            </label>
            <label>
              <input
                type="checkbox"
                checked={onTouchChecked}
                onChange={() => {
                  setOnTouchChecked(!onTouchChecked);
                }}
              />
              Touch (Celulares)
            </label>
          </div>
        </div>
        <div className="option-container">
          <p>Opções de Compressão:</p>
          <div className="option-content">
            <label
              style={{
                alignSelf: "center",
              }}
            >
              <input
                type="checkbox"
                checked={compressChecked}
                onChange={() => {
                  setCompressChecked(!compressChecked);
                }}
              />
              Comprimir imagens
            </label>
            <div
              className={`input-number-container ${
                compressChecked ? "" : "input-number-disabled"
              }`}
            >
              <span>Fundo_app (tamanho):</span>
              <div>
                <input
                  type="number"
                  value={maxSizeFundoAppTemporaryValue ?? undefined}
                  onChange={(e) => {
                    setMaxSizeFundoAppTemporaryValue(
                      parseFloat(e.target.value)
                    );
                  }}
                  disabled={compressChecked ? false : true}
                  min={1}
                />
                <span>kbs</span>
              </div>
            </div>
            <div
              className={`input-number-container ${
                compressChecked ? "" : "input-number-disabled"
              }`}
            >
              <span>Fundo_menu (tamanho):</span>
              <div>
                <input
                  type="number"
                  value={maxSizeFundoMenuTemporaryValue ?? undefined}
                  onChange={(e) => {
                    setMaxSizeFundoMenuTemporaryValue(
                      parseFloat(e.target.value)
                    );
                  }}
                  disabled={compressChecked ? false : true}
                  min={1}
                />
                <span>kbs</span>
              </div>
            </div>
            <div
              className={`input-slider-container ${
                compressChecked ? "" : "input-number-disabled"
              }`}
            >
              <span>Logo_app (taxa de compressão):</span>
              <Slider
                //Default Options:
                style={{ maxWidth: "80%" }}
                min={1}
                max={99}
                step={1}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
                size={"small"}
                disabled={!compressChecked}
                className="logoapp-compression-slide"
                //Props:
                value={logoAppCompressionRate}
                valueLabelFormat={valueLabelFormat(logoAppCompressionRate, "%")}
                onChange={(event: Event, newValue: number | number[]) => {
                  if (typeof newValue === "number") {
                    setLogoAppCompressionRate(newValue);
                  }
                }}
              />
            </div>
            <div
              className={`input-slider-container ${
                compressChecked ? "" : "input-number-disabled"
              }`}
            >
              <span>Logo_cab (taxa de compressão):</span>
              <Slider
                //Default Options:
                style={{ maxWidth: "80%" }}
                min={1}
                max={99}
                step={1}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
                size={"small"}
                disabled={!compressChecked}
                className="logoapp-compression-slide"
                //Props:
                value={logoCabCompressionRate}
                valueLabelFormat={valueLabelFormat(logoCabCompressionRate, "%")}
                onChange={(event: Event, newValue: number | number[]) => {
                  if (typeof newValue === "number") {
                    setLogoCabCompressionRate(newValue);
                  }
                }}
              />
            </div>
            {/* <p className="observation-text">(valor padrão: 200kbs)</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSettings;
