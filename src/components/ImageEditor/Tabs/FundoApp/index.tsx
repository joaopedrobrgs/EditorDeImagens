import React, { createRef, useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../styles.scss";
import { Button, Switch } from "@mui/material";
import imageCompression from "browser-image-compression";
// import { ImageCompressionOptions } from "../../../../types/ImageCompression";
import { saveAs } from "file-saver";
import { useAtom } from "jotai/react";
import {
  AtomFundoAppCropped,
  AtomFundoAppOriginalSize,
  AtomSliderChecked,
  AtomOnTouchChecked,
  AtomOnWheelChecked,
} from "../../../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import CropperWithDefaultOptions from "../../../CropperWithDefaultOptions";
import Slider from "@mui/material/Slider";
import { valueLabelFormat } from "../../../../utils/utils";
import { useAppContext } from "../../../../context";

type Props = {};
type ZoomType = {
  oldRatio: number;
  ratio: number;
  originalEvent: ZoomEventType;
};
type ZoomEventType = {
  clientX: number;
  clientY: number;
  layerX: number;
  layerY: number;
  offsetX: number;
  offsetY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
};

const FundoApp = (props: Props) => {
  const defaultSrc: string = `${process.env.PUBLIC_URL}foto-exemplo.png`;

  const inputRef = useRef<any>();

  const [cropData, setCropData] = useAtom(AtomFundoAppCropped);

  const [image, setImage] = useAtom(AtomFundoAppOriginalSize);

  const { refFundoAppCropper: cropperRef } = useAppContext();

  // const [getZoomInitialValue, setGetZoomInitialValue] = useState<number>(0)
  // const [zoomInitialValue, setZoomInitialValue] = useState<number>(0)
  const [zoomValue, setZoomValue] = useState<number>(0);
  const sliderRef = useRef<any>();

  const [sliderChecked, setSliderChecked] = useAtom(AtomSliderChecked);

  // useEffect(()=>{
  //   console.log("onWheelState first render: ", onWheelChecked)
  // }, [])

  // useEffect(()=>{
  //   console.log("onWheelState on change: ", onWheelChecked)
  // }, [onWheelChecked])

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setZoomInitialValue(zoomValue)
  //   }, 1000)
  // }, [])

  useEffect(() => {
    console.log(zoomValue);
  }, [zoomValue]);

  const { windowWidth } = useAppContext();

  const aspectRatio = 500 / 889;

  const [imageFullyLoaded, setImageFullyLoaded] = useState<boolean>(false);

  const triggerFileSelectPopup = () => {
    if (!!inputRef.current) {
      inputRef.current.click();
    }
  };

  const onSelectFile = (e: any) => {
    e.preventDefault();
    let files: any;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if (!!files[0] && !files[0].type.includes("image")) {
      toast.error("Deve ser carregado um arquivo de imagem!", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
      setZoomValue(0);
    };
    if (!!files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };

  // Pegando imagem cortada
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL() ?? null
      );
    }
  };

  async function handleDownload() {
    cropperRef.current?.cropper?.getCroppedCanvas().toBlob((blob: any) => {
      if (!!blob) {
        saveAs(blob, "fundo_app.png");
      }
    });
  }

  function handleLoaded() {
    setImageFullyLoaded(true);
  }

  return (
    <div className="tab-container">
      <input
        type="file"
        onChange={onSelectFile}
        accept="image/*"
        ref={inputRef as any}
      />
      <Button
        variant="contained"
        className="btn-upload"
        onClick={triggerFileSelectPopup}
      >
        Carregar fundo_app
      </Button>
      <p>Recortar fundo_app:</p>
      <CropperWithDefaultOptions
        reference={cropperRef}
        aspectRatio={aspectRatio}
        src={image ?? defaultSrc}
        onLoad={handleLoaded}
        ready={(e) => {
          console.log(e);
        }}
        data={cropperRef.current?.cropper.getData()}
        // zoom={(e) => {
        //   setZoomValue(e.detail.ratio);
        // }}
        zoomTo={zoomValue}
        // zoomOnTouch={onTouchChecked}
        // zoomOnWheel={onWheelChecked}
      />
      <Slider
        ref={sliderRef as any}
        value={zoomValue}
        style={{ maxWidth: 750 }}
        min={0}
        max={5}
        step={0.001}
        valueLabelFormat={`${zoomValue}`}
        onChange={(event: Event, newValue: number | number[]) => {
          if (typeof newValue === "number") {
            setZoomValue(newValue);
          }
        }}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
        size={windowWidth > 440 ? "medium" : "small"}
        disabled={!sliderChecked}
      />
      <h1>Prévia:</h1>
      <div className="box">
        <div
          className="img-preview"
          style={{ width: "125px", height: "225.25px" }}
        />
      </div>
      <Button
        variant="contained"
        className="btn-visualize"
        onClick={getCropData}
        disabled={imageFullyLoaded ? false : true}
      >
        Visualizar na tela
      </Button>
      <Button
        variant="contained"
        className="btn-download"
        onClick={handleDownload}
        disabled={imageFullyLoaded ? false : true}
      >
        Baixar fundo_app
      </Button>
      <ToastContainer />
    </div>
  );
};

export default FundoApp;
