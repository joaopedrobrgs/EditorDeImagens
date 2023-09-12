import React, { useState, useRef, useEffect } from "react";
import "cropperjs/dist/cropper.css";
import "../styles.scss";
import { useAtom } from "jotai/react";
import { useAppContext } from "src/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  AtomLogoCabCropped,
  AtomLogoCabOriginalSize,
  AtomWindowWidth,
  AtomCompressChecked,
  AtomMaxSizeOfImage,
  AtomOnTouchChecked,
  AtomOnWheelChecked,
  AtomSliderChecked,
  AtomLogoCabDomElementOptions,
  AtomCompressionOptions,
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
import { useDownloadImage } from "src/hooks/useDownloadImage";
import { Options } from "dom-to-image";

type Props = {};

const LogoCab = (props: Props) => {
  //Especific attributtes:
  const defaultSrc: string = `${process.env.PUBLIC_URL}logo_cab_sample.png`;
  const nameOfTab: string = "Logo Cab";
  const previewClass: string = "logo-cab-preview";
  const outputFileName: string = "logo-cab.png";
  const [, setCropData] = useAtom(AtomLogoCabCropped);
  const [image, setImage] = useAtom(AtomLogoCabOriginalSize);
  const aspectRatio = 130 / 130;
  const { refLogoCabCropper: cropperRef, refLogoCabDomElement: domElementRef } =
    useAppContext();
  const [domElementOptions] = useAtom(AtomLogoCabDomElementOptions);
  const [compressionOptions] = useAtom(AtomCompressionOptions);

  //Generic stuff:
  const [zoomValue, setZoomValue] = useState<number>(0);
  const inputRef = useRef<any>();
  const sliderRef = useRef<any>();
  const [compressChecked] = useAtom(AtomCompressChecked);
  const [maxSizeOfImage] = useAtom(AtomMaxSizeOfImage);
  const [windowWidth] = useAtom(AtomWindowWidth);
  const [imageFullyLoaded, setImageFullyLoaded] = useState<boolean>(false);
  const [onTouchChecked] = useAtom(AtomOnTouchChecked);
  const [onWheelChecked] = useAtom(AtomOnWheelChecked);
  const [sliderChecked] = useAtom(AtomSliderChecked);
  const [cropDataStored, setCropDataStored] = useState(
    cropperRef.current?.cropper.getData()
  );

  //Services:
  const {
    compressionError,
    setCompressionError,
    isCompressing,
    setIsCompressing,
    trigger: triggerDownloadImage,
  } = useDownloadImage();

  useEffect(() => {
    setZoomValue(0);
  }, [onTouchChecked, onWheelChecked, sliderChecked]);

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
    // cropperRef.current.name = outputFileName;
    // domElementRef.current.name = outputFileName;
    triggerDownloadImage(
      domElementRef.current,
      domElementOptions,
      compressChecked,
      compressionOptions,
      outputFileName
    );
  }

  useEffect(() => {
    setCompressionError(null);
    setIsCompressing(false);
  }, []);

  function handleCropmoveEvent(event: any) {
    setTimeout(() => {
      setCropDataStored(cropperRef.current?.cropper.getData());
    }, 200);
  }

  function handleZoomEvent(event: any) {
    setTimeout(() => {
      setCropDataStored(cropperRef.current?.cropper.getData());
    }, 200);
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
          // aspectRatio={aspectRatio}
          initialAspectRatio={aspectRatio}
          zoomTo={zoomValue}
          // onLoad={handleLoaded}
          ready={handleLoaded}
          src={image ?? defaultSrc}
          cropmove={handleCropmoveEvent}
          zoom={handleZoomEvent}
          data={cropDataStored}
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
          text={isCompressing ? "Comprimindo..." : `Baixar ${nameOfTab}`}
          bgColor="#CE7828"
          alignSelf={windowWidth >= 1330 ? "self-start" : "center"}
          onClick={
            isCompressing || !imageFullyLoaded
              ? () => {
                  return;
                }
              : handleDownload
          }
          className={isCompressing || !imageFullyLoaded ? "btn-disabled" : ""}
        >
          <DownloadIcon className="icon" />
        </ButtonDefault>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LogoCab;
