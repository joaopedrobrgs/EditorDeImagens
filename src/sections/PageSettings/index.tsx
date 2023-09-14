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
  AtomLogoAppCompressChecked,
  AtomFundoAppCompressChecked,
  AtomFundoMenuCompressChecked,
  AtomLogoCabCompressChecked,
  // AtomCompressionOptions,
} from "src/store";
import { Slider } from "@mui/material";
import { valueLabelFormat } from "src/utils/utils";

type Props = {};

const PageSettings = (props: Props) => {

  //Generic states:
  const [sliderChecked, setSliderChecked] = useAtom(AtomSliderChecked);
  const [onWheelChecked, setOnWheelChecked] = useAtom(AtomOnWheelChecked);
  const [onTouchChecked, setOnTouchChecked] = useAtom(AtomOnTouchChecked);
  // const [compressChecked, setCompressChecked] = useAtom(AtomCompressChecked);

  //Fundo app states:
  const [fundoAppCompressChecked, setFundoAppCompressChecked] = useAtom(
    AtomFundoAppCompressChecked
  );
  const [maxSizeFundoApp, setMaxSizeFundoApp] = useAtom(AtomMaxSizeFundoApp);
  const [maxSizeFundoAppTemporaryValue, setMaxSizeFundoAppTemporaryValue] =
    useState<number>(maxSizeFundoApp ?? 200);

  //Fundo menu states:
  const [fundoMenuCompressChecked, setFundoMenuCompressChecked] = useAtom(
    AtomFundoMenuCompressChecked
  );
  const [maxSizeFundoMenu, setMaxSizeFundoMenu] = useAtom(AtomMaxSizeFundoMenu);
  const [maxSizeFundoMenuTemporaryValue, setMaxSizeFundoMenuTemporaryValue] =
    useState<number>(maxSizeFundoMenu ?? 200);

  //Logo app states:
  const [logoAppCompressChecked, setLogoAppCompressChecked] = useAtom(AtomLogoAppCompressChecked);
  const [logoAppCompressionRate, setLogoAppCompressionRate] = useAtom(
    AtomLogoAppCompressionRate
  );

  //Logo cab states:
  const [logoCabCompressChecked, setLogoCabCompressChecked] = useAtom(AtomLogoCabCompressChecked);
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
                checked={fundoAppCompressChecked}
                onChange={() => {
                  setFundoAppCompressChecked(!fundoAppCompressChecked);
                }}
              />
              Comprimir Fundo App
            </label>
            <div
              className={`input-number-container ${
                fundoAppCompressChecked ? "" : "input-number-disabled"
              }`}
            >
              <span>Tamanho esperado:</span>
              <div>
                <input
                  type="number"
                  value={maxSizeFundoAppTemporaryValue ?? undefined}
                  onChange={(e) => {
                    setMaxSizeFundoAppTemporaryValue(
                      parseFloat(e.target.value)
                    );
                  }}
                  disabled={fundoAppCompressChecked ? false : true}
                  min={1}
                />
                <span>kbs</span>
              </div>
            </div>
            <label
              style={{
                alignSelf: "center",
              }}
            >
              <input
                type="checkbox"
                checked={fundoMenuCompressChecked}
                onChange={() => {
                  setFundoMenuCompressChecked(!fundoMenuCompressChecked);
                }}
              />
              Comprimir Fundo Menu
            </label>
            <div
              className={`input-number-container ${
                fundoMenuCompressChecked ? "" : "input-number-disabled"
              }`}
            >
              <span>Tamanho esperado:</span>
              <div>
                <input
                  type="number"
                  value={maxSizeFundoMenuTemporaryValue ?? undefined}
                  onChange={(e) => {
                    setMaxSizeFundoMenuTemporaryValue(
                      parseFloat(e.target.value)
                    );
                  }}
                  disabled={fundoMenuCompressChecked ? false : true}
                  min={1}
                />
                <span>kbs</span>
              </div>
            </div>
            <label
              style={{
                alignSelf: "center",
              }}
            >
              <input
                type="checkbox"
                checked={logoAppCompressChecked}
                onChange={() => {
                  setLogoAppCompressChecked(!logoAppCompressChecked);
                }}
              />
              Comprimir Logo App
            </label>
            <div
              className={`input-slider-container ${
                logoAppCompressChecked ? "" : "input-number-disabled"
              }`}
            >
              <span>Taxa de compressão:</span>
              <Slider
                //Default Options:
                style={{ maxWidth: "50%" }}
                min={1}
                max={99}
                step={1}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
                size={"small"}
                disabled={!logoAppCompressChecked}
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
            <label
              style={{
                alignSelf: "center",
              }}
            >
              <input
                type="checkbox"
                checked={logoCabCompressChecked}
                onChange={() => {
                  setLogoCabCompressChecked(!logoCabCompressChecked);
                }}
              />
              Comprimir Logo Cab
            </label>
            <div
              className={`input-slider-container ${
                logoCabCompressChecked ? "" : "input-number-disabled"
              }`}
            >
              <span>Taxa de compressão:</span>
              <Slider
                //Default Options:
                style={{ maxWidth: "50%" }}
                min={1}
                max={99}
                step={1}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
                size={"small"}
                disabled={!logoCabCompressChecked}
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
