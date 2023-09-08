import React, { useState, useRef, useEffect } from "react";
import "cropperjs/dist/cropper.css";
import "../styles.scss";
import { useAtom } from "jotai/react";
import { useAppContext } from "src/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  AtomFundoAppCropped,
  AtomFundoAppOriginalSize,
  AtomWindowWidth,
  AtomFirstImageFullyLoaded,
  AtomCompressChecked,
  AtomMaxSizeOfImage,
  AtomOnTouchChecked,
  AtomOnWheelChecked,
  AtomSliderChecked,
} from "src/store";
import DownloadIcon from "src/assets/svgComponents/DownloadIconSvg";
import UploadIcon from "src/assets/svgComponents/UploadIconSvg";
import { calcFontSizeAccordingToWidth, downloadImage } from "src/utils/utils";
import CropperDefault from "src/components/Cropper";
import SliderDefault from "src/components/Slider";
import ButtonDefault from "src/components/Button";
import { useCompression } from "src/hooks/useCompression";
import { ImageCompressionOptions } from "src/types/ImageCompression";
import { saveAs } from "file-saver";

type Props = {};

const FundoApp = (props: Props) => {
  //Especific attributtes:
  const defaultSrc: string = `${process.env.PUBLIC_URL}fundo_app_sample.png`;
  const nameOfTab: string = "Fundo App";
  const previewClass: string = "fundo-app-preview";
  const outputFileName: string = "fundo_app.png";
  const aspectRatio = 500 / 889;
  const [, setCropData] = useAtom(AtomFundoAppCropped);
  const [image, setImage] = useAtom(AtomFundoAppOriginalSize);
  const { refFundoAppCropper: cropperRef } = useAppContext();

  //Generic stuff:
  const [zoomValue, setZoomValue] = useState<number>(0);
  const inputRef = useRef<any>();
  const sliderRef = useRef<any>();
  const [compressChecked] = useAtom(AtomCompressChecked);
  const [maxSizeOfImage] = useAtom(AtomMaxSizeOfImage);
  const [windowWidth] = useAtom(AtomWindowWidth);
  const [onTouchChecked] = useAtom(AtomOnTouchChecked);
  const [onWheelChecked] = useAtom(AtomOnWheelChecked);
  const [sliderChecked] = useAtom(AtomSliderChecked);

  //Services:
  const {
    response: compressingResponse,
    setResponse: setCompressingResponse,
    error: compressingError,
    setError: setCompressingError,
    isLoading: compressingIsLoading,
    setIsLoading: setCompressingIsLoading,
    fetchNext: fetchCompressing,
  } = useCompression();

  useEffect(() => {
    setZoomValue(0);
  }, [onTouchChecked, onWheelChecked, sliderChecked]);

  const [imageFullyLoaded, setImageFullyLoaded] = useAtom(
    AtomFirstImageFullyLoaded
  );

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
    const options: ImageCompressionOptions = {
      maxSizeMB: maxSizeOfImage / 1000,
      fileType: "image/png",
    };
    let blob: any = await new Promise((resolve) =>
      cropperRef.current.cropper?.getCroppedCanvas().toBlob(resolve)
    );
    if (compressChecked) {
      await fetchCompressing(blob, options, cropperRef.current.name);
      return;
    }
    saveAs(blob, cropperRef.current.name);
  }

  useEffect(() => {
    setCompressingResponse(null);
    setCompressingError(null);
    setCompressingIsLoading(false);
  }, []);

  useEffect(() => {
    if (compressingResponse) {
      console.log(compressingResponse);
      saveAs(compressingResponse, cropperRef.current.name);
      setCompressingResponse(null);
      setCompressingError(null);
    }
  }, [compressingResponse]);
  useEffect(() => {
    if (compressingError) {
      console.log(compressingError);
      setCompressingResponse(null);
      setCompressingError(null);
    }
  }, [compressingError]);

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
          <p>Recortar {nameOfTab}:</p>
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
          text={compressingIsLoading ? "Comprimindo..." : `Baixar ${nameOfTab}`}
          bgColor="#CE7828"
          alignSelf={windowWidth >= 1330 ? "self-start" : "center"}
          onClick={
            compressingIsLoading || !imageFullyLoaded
              ? () => {
                  return;
                }
              : handleDownload
          }
          className={
            compressingIsLoading || !imageFullyLoaded ? "btn-disabled" : ""
          }
        >
          <DownloadIcon className="icon" />
        </ButtonDefault>
        <ToastContainer />
      </div>
    </div>
  );
};

export default FundoApp;
