import React, { useState, useRef } from "react";
import "cropperjs/dist/cropper.css";
import "../styles.scss";
// import imageCompression from "browser-image-compression";
// import { ImageCompressionOptions } from "../../../../types/ImageCompression";
import { saveAs } from "file-saver";
import { useAtom } from "jotai/react";
import { useAppContext } from "../../../../context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  AtomFundoMenuCropped,
  AtomFundoMenuOriginalSize,
  AtomOnTouchChecked,
  AtomOnWheelChecked,
  AtomSliderChecked,
  AtomWindowWidth,
} from "../../../../store";
import { Cropper } from "react-cropper";
import DownloadIcon from "../../../../assets/svgComponents/DownloadIconSvg";
import { Slider } from "@mui/material";
import UploadIcon from "../../../../assets/svgComponents/UploadIconSvg";
import { calcFontSizeAccordingToWidth } from "../../../../utils/utils";
import CropperDefault from "../../DefaultComponents/CropperDefault";
import SliderDefault from "../../DefaultComponents/SliderDefault";
import ButtonDefault from "../../DefaultComponents/ButtonDefault";

type Props = {};

const FundoMenu = (props: Props) => {
  //Especific attributtes:
  const defaultSrc: string = `${process.env.PUBLIC_URL}fundo_menu_sample.png`;
  const nameOfTab: string = "Fundo Menu";
  const previewClass: string = "fundo-menu-preview";
  const outputFileName: string = "fundo_menu.png";
  const [cropData, setCropData] = useAtom(AtomFundoMenuCropped);
  const [image, setImage] = useAtom(AtomFundoMenuOriginalSize);
  const { refFundoMenuCropper: cropperRef } = useAppContext();
  const aspectRatio = 400 / 200;

  //Generic stuff:
  const [zoomValue, setZoomValue] = useState<number>(0);
  const inputRef = useRef<any>();
  const sliderRef = useRef<any>();
  const [sliderChecked, setSliderChecked] = useAtom(AtomSliderChecked);
  const [onTouchChecked] = useAtom(AtomOnTouchChecked);
  const [onWheelChecked] = useAtom(AtomOnWheelChecked);
  const [windowWidth] = useAtom(AtomWindowWidth);
  const [imageFullyLoaded, setImageFullyLoaded] = useState<boolean>(false);

  const triggerFileSelectPopup = () => {
    if (!!inputRef.current) {
      inputRef.current.click();
    }
  };

  function handleLoaded() {
    setImageFullyLoaded(true);
  }

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
        className: "toast",
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
        saveAs(blob, outputFileName);
      }
    });
  }

  return (
    <div className="tab-extern-container">
      <div className="tab-intern-container">
        <input
          type="file"
          onChange={onSelectFile}
          accept="image/*"
          ref={inputRef as any}
        />

        <div className="tab-first-box">
          <p
            style={{ fontSize: calcFontSizeAccordingToWidth(windowWidth, 1.3) }}
          >
            Recortar {nameOfTab}:
          </p>
          <ButtonDefault
            text={`Upload ${nameOfTab}`}
            bgColor="#2892CE"
            onClick={triggerFileSelectPopup}
          >
            <UploadIcon className="icon" />
          </ButtonDefault>
        </div>
        <CropperDefault
          preview={previewClass}
          cropperReference={cropperRef}
          aspectRatio={aspectRatio}
          data={cropperRef.current?.cropper.getData()}
          zoomTo={zoomValue}
          onLoad={handleLoaded}
          src={image ?? defaultSrc}
        />
        <SliderDefault
          sliderRef={sliderRef}
          value={zoomValue}
          valueLabelFormat={`${zoomValue}`}
          onChange={(event: Event, newValue: number | number[]) => {
            if (typeof newValue === "number") {
              setZoomValue(newValue);
            }
          }}
        />
        <ButtonDefault
          text={`Baixar ${nameOfTab}`}
          bgColor="#CE7828"
          alignSelf="self-start"
          onClick={
            imageFullyLoaded
              ? handleDownload
              : () => {
                  return;
                }
          }
        >
          <DownloadIcon className="icon" />
        </ButtonDefault>
        <ToastContainer />
      </div>
    </div>
  );
};

export default FundoMenu;
