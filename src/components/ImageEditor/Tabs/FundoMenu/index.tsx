import React, { createRef, useEffect, useRef, useState } from "react";
import "cropperjs/dist/cropper.css";
import "../styles.scss";
import { Button } from "@mui/material";
import imageCompression from "browser-image-compression";
// import { ImageCompressionOptions } from "../../../../types/ImageCompression";
import { saveAs } from "file-saver";
import { useAtom } from "jotai/react";
import {
  AtomFundoMenuOriginalSize,
  AtomFundoMenuCropped,
  AtomSliderChecked,
} from "../../../../store";
import { useAppContext } from "../../../../context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import CropperWithDefaultOptions from "../../../CropperWithDefaultOptions";
import Slider from "@mui/material/Slider";

type Props = {};

const FundoMenu = (props: Props) => {
  const defaultSrc: string = `${process.env.PUBLIC_URL}foto-exemplo.png`;

  const inputRef = useRef<any>();

  const [image, setImage] = useAtom(AtomFundoMenuOriginalSize);

  const [cropData, setCropData] = useAtom(AtomFundoMenuCropped);

  const { refFundoMenuCropper: cropperRef } = useAppContext();

  const [zoomValue, setZoomValue] = useState<number>(0);
  const sliderRef = useRef<any>();
  const [sliderChecked, setSliderChecked] = useAtom(AtomSliderChecked);

  const { windowWidth } = useAppContext();

  const aspectRatio = 400 / 200;

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
    if (!files[0].type.includes("image")) {
      toast.error("Deve ser carregado um arquivo de imagem!", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
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
        saveAs(blob, "fundo_menu.png");
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
        Carregar fundo_menu
      </Button>
      <p>Recortar fundo_menu:</p>
      <CropperWithDefaultOptions
        reference={cropperRef}
        aspectRatio={aspectRatio}
        src={image ?? defaultSrc}
        onLoad={handleLoaded}
        data={cropperRef.current?.cropper.getData()}
        zoomTo={zoomValue}
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
          style={{ width: "250px", height: "125px" }}
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
        Baixar fundo_menu
      </Button>
      <ToastContainer />
    </div>
  );
};

export default FundoMenu;
