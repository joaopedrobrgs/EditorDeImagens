import React, { useState, useRef } from "react";
import "cropperjs/dist/cropper.css";
import "../styles.scss";
import { useAtom } from "jotai/react";
import { useAppContext } from "src/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  AtomLogoAppCropped,
  AtomLogoAppOriginalSize,
  AtomWindowWidth,
  AtomCompressChecked,
  AtomMaxSizeOfImage
} from "src/store";
import DownloadIcon from "src/assets/svgComponents/DownloadIconSvg";
import UploadIcon from "src/assets/svgComponents/UploadIconSvg";
import { calcFontSizeAccordingToWidth, downloadImage } from "src/utils/utils";
import CropperDefault from "src/components/Cropper";
import SliderDefault from "src/components/Slider";
import ButtonDefault from "src/components/Button";

type Props = {};

const LogoApp = (props: Props) => {
  //Especific attributtes:
  const defaultSrc: string = `${process.env.PUBLIC_URL}logo_app_sample.png`;
  const nameOfTab: string = "Logo App";
  const previewClass: string = "logo-app-preview";
  const outputFileName: string = "logo-app.png";
  const [, setCropData] = useAtom(AtomLogoAppCropped);
  const [image, setImage] = useAtom(AtomLogoAppOriginalSize);
  const { refLogoAppCropper: cropperRef } = useAppContext();
  const aspectRatio = 450 / 250;

  //Generic stuff:
  const [zoomValue, setZoomValue] = useState<number>(0);
  const inputRef = useRef<any>();
  const sliderRef = useRef<any>();
  const [compressChecked] = useAtom(AtomCompressChecked);
  const [maxSizeOfImage] = useAtom(AtomMaxSizeOfImage);
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
    cropperRef.current.name = outputFileName;
    downloadImage(cropperRef.current, compressChecked, maxSizeOfImage);
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
          alignSelf={windowWidth >= 1330 ? "self-start" : "center"}
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

export default LogoApp;
