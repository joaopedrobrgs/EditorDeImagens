import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import "cropperjs/dist/cropper.css";
import "../styles.scss";
import { Button } from "@mui/material";
// import imageCompression from "browser-image-compression";
// import { ImageCompressionOptions } from "../../../../types/ImageCompression";
import { useAtom } from "jotai/react";
import { useAppContext } from "../../../context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Slider from "@mui/material/Slider";
import {
  AtomSliderChecked,
  AtomOnTouchChecked,
  AtomOnWheelChecked,
} from "../../../store";
import { Cropper, ReactCropperProps } from "react-cropper";
import UploadIcon from "../../../assets/svgComponents/UploadIconSvg";
import DownloadIcon from "../../../assets/svgComponents/DownloadIconSvg";

interface Props extends ReactCropperProps {
  cropperReference?: any;
  nameOfTab: string;
  previewClass: string;
  // inputRef: any;
  // onSelectFile: ChangeEventHandler<HTMLInputElement>;
  // defaultSrc: string
  onSelectFile: ChangeEventHandler<HTMLInputElement>;
  getCropData: MouseEventHandler<any>;
  handleDownload: MouseEventHandler<any>;
  zoomValue: number;
  setZoomValue: Function;
}

const TabComponent = (props: Props) => {
  const inputRef = useRef<any>();
  const sliderRef = useRef<any>();

  const [sliderChecked, setSliderChecked] = useAtom(AtomSliderChecked);
  const [onTouchChecked] = useAtom(AtomOnTouchChecked);
  const [onWheelChecked] = useAtom(AtomOnWheelChecked);

  const { windowWidth } = useAppContext();

  const [imageFullyLoaded, setImageFullyLoaded] = useState<boolean>(false);

  const triggerFileSelectPopup = () => {
    if (!!inputRef.current) {
      inputRef.current.click();
    }
  };

  function handleLoaded() {
    setImageFullyLoaded(true);
  }

  function calcFontSizeAccordingToWidth(multiplicator: number = 1) {
    // if (windowWidth > 1850) {
    //   return 14 * multiplicator;
    // }
    // if (windowWidth > 1385) {
    //   return windowWidth * 0.008 * multiplicator;
    // }
    // if (windowWidth > 1160) {
    //   return windowWidth * 0.01 * multiplicator;
    // }
    // if (windowWidth > 820) {
    //   return windowWidth * 0.014 * multiplicator;
    // }
    // if (windowWidth > 550) {
    //   return windowWidth * 0.018 * multiplicator;
    // }
    // if (windowWidth > 487) {
    //   return windowWidth * 0.025 * multiplicator;
    // }
    // if (windowWidth > 307) {
    //   return windowWidth * 0.03 * multiplicator;
    // } else {
    //   return windowWidth * 0.04 * multiplicator;
    // }
    if (windowWidth <= 306) {
      return windowWidth * 0.04 * multiplicator;
    }
    if (windowWidth <= 486) {
      return windowWidth * 0.03 * multiplicator;
    } 
    if (windowWidth <= 549) {
      return windowWidth * 0.025 * multiplicator;
    }
    if (windowWidth <= 819) {
      return windowWidth * 0.018 * multiplicator;
    }
    if (windowWidth <= 975) {
      return windowWidth * 0.015 * multiplicator;
    }
    // if (windowWidth <= 1160) {
    //   return windowWidth * 0.014 * multiplicator;
    // }
    if (windowWidth <= 1384) {
      return windowWidth * 0.01 * multiplicator;
    }
    if (windowWidth <= 1849) {
      return windowWidth * 0.008 * multiplicator;
    }
    else {
      return 14 * multiplicator;
    }
  }

  return (
    <div className="tab-extern-container">
      <div className="tab-intern-container">
        <input
          type="file"
          onChange={props.onSelectFile}
          accept="image/*"
          ref={inputRef as any}
        />

        <div className="tab-first-box">
          <p style={{fontSize: calcFontSizeAccordingToWidth(1.4)}}>Recortar fundo_app:</p>
          <div
            className="btn btn-upload"
            onClick={triggerFileSelectPopup}
            style={{ fontSize: calcFontSizeAccordingToWidth() }}
          >
            <div className="text-container">
              <span>Upload {props.nameOfTab}</span>
            </div>
            <div className="icon-container">
              <UploadIcon className="icon" />
            </div>
          </div>
        </div>
        <Cropper
          // zoomTo={0.5}
          // initialAspectRatio={1}
          style={{ height: 330, width: "100%", maxWidth: 750 }}
          preview={`.${props.previewClass}`}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          restore
          background={true}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={false}
          wheelZoomRatio={0.1}
          autoCrop
          movable
          dragMode="move"
          zoomOnTouch={onTouchChecked}
          zoomOnWheel={onWheelChecked}
          // ready={props.ready}
          // zoom={props.zoom}
          ref={props.cropperReference}
          aspectRatio={props.aspectRatio}
          //Passando o ultimo recorte para a imagem assim que renderizar novamente o componente:
          data={props.data}
          zoomTo={props.zoomTo}
          //Verificando se imagem já esta carregada, pois isso estava ocasionando um erro:
          onLoad={handleLoaded}
          src={props.src}
        />
        <Slider
          ref={sliderRef as any}
          value={props.zoomValue}
          style={{ maxWidth: 750 }}
          min={0}
          max={5}
          step={0.001}
          valueLabelFormat={`${props.zoomValue}`}
          onChange={(event: Event, newValue: number | number[]) => {
            if (typeof newValue === "number") {
              props.setZoomValue(newValue);
            }
          }}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
          size={windowWidth > 440 ? "medium" : "small"}
          disabled={!sliderChecked}
        />
        {/* <h1>Prévia:</h1>
      <div className="box">
        <div
          className="img-preview"
          style={{ width: "125px", height: "225.25px" }}
        />
      </div> */}
        {/* <Button
        variant="contained"
        className="btn-visualize"
        onClick={props.getCropData}
        disabled={imageFullyLoaded ? false : true}
      >
        Visualizar na tela
      </Button> */}
        <div
          className="btn btn-download"
          style={{ fontSize: calcFontSizeAccordingToWidth() }}
          onClick={
            imageFullyLoaded
              ? props.handleDownload
              : () => {
                  return;
                }
          }
          // disabled={imageFullyLoaded ? false : true}
        >
          <div className="text-container">
            <span>Baixar {props.nameOfTab}</span>
          </div>
          <div className="icon-container">
            <DownloadIcon className="icon" />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default TabComponent;
