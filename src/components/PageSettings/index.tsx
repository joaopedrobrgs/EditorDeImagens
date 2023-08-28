import React, { useState } from "react";
import "./styles.scss";
import { useAtom } from "jotai";
import {
  AtomShowSettingsModal,
  AtomOnTouchChecked,
  AtomOnWheelChecked,
  AtomSliderChecked,
} from "../../store";
import { Button } from "@mui/material";

type Props = {};

const PageSettings = (props: Props) => {

  const [sliderChecked, setOnSliderChecked] = useAtom(AtomSliderChecked);
  const [onWheelChecked, setOnWheelChecked] = useAtom(AtomOnWheelChecked);
  const [onTouchChecked, setOnTouchChecked] = useAtom(AtomOnTouchChecked);

  const [sliderCheckedTemporaryState, setSliderCheckedTemporaryState] =
    useState(sliderChecked);
  const [onWheelCheckedTemporaryState, setOnWheelCheckedTemporaryState] =
    useState(onWheelChecked);
  const [onTouchCheckedTemporaryState, setOnTouchCheckedTemporaryState] =
    useState(onTouchChecked);

  const [showSettingsModal, setShowSettingsModal] = useAtom(AtomShowSettingsModal);

  function handleSaveChanges() {
    setOnSliderChecked(sliderCheckedTemporaryState);
    setOnWheelChecked(onWheelCheckedTemporaryState);
    setOnTouchChecked(onTouchCheckedTemporaryState);
    setShowSettingsModal(false);
    window.location.reload();
  }

  function handleCancelChanges(e: any){
    if(e.target.className.includes("page-settings-modal") || e.target.className.includes("page-settings-cancel-btn")){
      setSliderCheckedTemporaryState(sliderChecked)
      setOnWheelCheckedTemporaryState(onWheelChecked)
      setOnTouchCheckedTemporaryState(onTouchChecked)
      setShowSettingsModal(false);
    }
  }

  return (
    <div className="page-settings-modal" onClick={handleCancelChanges}>
      <div className="page-settings-container">
        <div className="option-container">
          <p>Opções de Zoom:</p>
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
