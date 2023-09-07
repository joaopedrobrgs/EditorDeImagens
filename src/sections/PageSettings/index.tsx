import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useAtom } from "jotai";
import {
  AtomShowSettingsModal,
  AtomOnTouchChecked,
  AtomOnWheelChecked,
  AtomSliderChecked,
  AtomCompressChecked,
  AtomMaxSizeOfImage,
} from "src/store";
import { Button } from "@mui/material";

type Props = {};

const PageSettings = (props: Props) => {
  const [sliderChecked, setSliderChecked] = useAtom(AtomSliderChecked);
  const [onWheelChecked, setOnWheelChecked] = useAtom(AtomOnWheelChecked);
  const [onTouchChecked, setOnTouchChecked] = useAtom(AtomOnTouchChecked);
  const [compressChecked, setCompressChecked] = useAtom(AtomCompressChecked);
  const [maxSizeOfImage, setMaxSizeOfImage] = useAtom(AtomMaxSizeOfImage);

  const [, setShowSettingsModal] = useAtom(
    AtomShowSettingsModal
  );

  function handleCloseModal(e: any) {
    if (
      e.target.className.includes("page-settings-modal")
    ) {
      setShowSettingsModal(false);
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
                  setOnWheelChecked(
                    !onWheelChecked
                  );
                }}
              />
              Roda do Mouse
            </label>
            <label>
              <input
                type="checkbox"
                checked={onTouchChecked}
                onChange={() => {
                  setOnTouchChecked(
                    !onTouchChecked
                  );
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
                  setCompressChecked(
                    !compressChecked
                  );
                }}
              />
              Comprimir imagens
            </label>
            <div
              className={`input-number-container ${
                compressChecked ? "" : "input-number-disabled"
              }`}
            >
              <span>Tamanho máximo:</span>
              <div>
                <input
                  type="number"
                  value={maxSizeOfImage}
                  onChange={(e) => {
                    setMaxSizeOfImage(parseFloat(e.target.value));
                  }}
                  disabled={compressChecked ? false : true}
                />
                <span>kbs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSettings;
