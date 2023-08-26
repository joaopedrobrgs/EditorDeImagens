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

  function handleCancelChanges(){
    setSliderCheckedTemporaryState(sliderChecked)
    setOnWheelCheckedTemporaryState(onWheelChecked)
    setOnTouchCheckedTemporaryState(onTouchChecked)
    setShowSettingsModal(false);
  }

  return (
    <div className="page-settings-modal">
      <div className="page-settings-container">
        <div className="option-container">
          <p>Zoom options:</p>
          <div className="option-content">
            <label>
              <input
                type="checkbox"
                checked={sliderCheckedTemporaryState}
                onChange={() => {
                  setSliderCheckedTemporaryState(!sliderCheckedTemporaryState);
                }}
              />
              Zoom on slider
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
              Zoom on wheel
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
              Zoom on touch
            </label>
          </div>
        </div>
        <div className="btn-container">
          <Button
            variant="contained"
            className="page-settings-confirm-btn"
            onClick={handleSaveChanges}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            className="page-settings-cancel-btn"
            onClick={handleCancelChanges}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageSettings;
