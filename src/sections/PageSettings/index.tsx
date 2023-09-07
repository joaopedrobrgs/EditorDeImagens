import React, { useState } from "react";
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

  const [sliderCheckedTemporaryState, setSliderCheckedTemporaryState] =
    useState(sliderChecked);
  const [onWheelCheckedTemporaryState, setOnWheelCheckedTemporaryState] =
    useState(onWheelChecked);
  const [onTouchCheckedTemporaryState, setOnTouchCheckedTemporaryState] =
    useState(onTouchChecked);

  const [compressCheckedTemporaryState, setCompressCheckedTemporaryState] =
    useState(compressChecked);
  const [maxSizeOfImageTemporaryState, setMaxSizeOfImageTemporaryState] =
    useState<number>(maxSizeOfImage);

  const [showSettingsModal, setShowSettingsModal] = useAtom(
    AtomShowSettingsModal
  );

  function handleSaveChanges() {
    setCompressChecked(compressCheckedTemporaryState);
    setMaxSizeOfImage(maxSizeOfImageTemporaryState);
    setSliderChecked(sliderCheckedTemporaryState);
    if (onWheelCheckedTemporaryState !== onWheelChecked) {
      setOnWheelChecked(onWheelCheckedTemporaryState);
    }
    if (onTouchCheckedTemporaryState !== onTouchChecked) {
      setOnTouchChecked(onTouchCheckedTemporaryState);
    }
    setShowSettingsModal(false);
    // window.location.reload();
  }

  function handleCancelChanges(e: any) {
    if (
      e.target.className.includes("page-settings-modal") ||
      e.target.className.includes("page-settings-cancel-btn")
    ) {
      setSliderCheckedTemporaryState(sliderChecked);
      setOnWheelCheckedTemporaryState(onWheelChecked);
      setOnTouchCheckedTemporaryState(onTouchChecked);
      setCompressCheckedTemporaryState(compressChecked);
      setMaxSizeOfImageTemporaryState(maxSizeOfImage);
      setShowSettingsModal(false);
    }
  }

  return (
    <div className="page-settings-modal" onClick={handleCancelChanges}>
      <div className="page-settings-container">
        <div className="option-container">
          <div className="zoom-options-title">
            <p>Opções de Zoom:</p>
            <p className="observation-text">
              (alterações aqui podem causar mudanças no recorte)
            </p>
          </div>
          <div className="option-content">
            <label>
              <input
                type="checkbox"
                checked={sliderCheckedTemporaryState}
                onChange={() => {
                  setSliderCheckedTemporaryState(!sliderCheckedTemporaryState);
                }}
              />
              Controle Deslizante
            </label>
            <label>
              <input
                type="checkbox"
                checked={onWheelCheckedTemporaryState}
                onChange={() => {
                  setOnWheelCheckedTemporaryState(
                    !onWheelCheckedTemporaryState
                  );
                }}
              />
              Roda do Mouse
            </label>
            <label>
              <input
                type="checkbox"
                checked={onTouchCheckedTemporaryState}
                onChange={() => {
                  setOnTouchCheckedTemporaryState(
                    !onTouchCheckedTemporaryState
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
                checked={compressCheckedTemporaryState}
                onChange={() => {
                  setCompressCheckedTemporaryState(
                    !compressCheckedTemporaryState
                  );
                }}
              />
              Comprimir imagens
            </label>
            <div
              className={`input-number-container ${
                compressCheckedTemporaryState ? "" : "input-number-disabled"
              }`}
            >
              <span>Tamanho máximo:</span>
              <div>
                <input
                  type="number"
                  value={maxSizeOfImageTemporaryState}
                  onChange={(e) => {
                    setMaxSizeOfImageTemporaryState(parseFloat(e.target.value));
                  }}
                  disabled={compressCheckedTemporaryState ? false : true}
                />
                <span>kbs</span>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <Button
            variant="contained"
            className="page-settings-confirm-btn"
            onClick={handleSaveChanges}
          >
            Confirmar
          </Button>
          <Button
            variant="contained"
            className="page-settings-cancel-btn"
            onClick={handleCancelChanges}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageSettings;
