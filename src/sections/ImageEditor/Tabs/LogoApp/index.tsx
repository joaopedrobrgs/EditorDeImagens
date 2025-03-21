import React, { useState, useRef, useEffect } from "react";
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
  AtomOnTouchChecked,
  AtomOnWheelChecked,
  AtomSliderChecked,
  AtomLogoAppDomElementOptions,
  AtomLogoAppCompressionRate,
  AtomLogoAppCompressChecked,
  AtomLogoAppIsBorderRounded,
} from "src/store";
import DownloadIcon from "src/assets/svgComponents/DownloadIconSvg";
import UploadIcon from "src/assets/svgComponents/UploadIconSvg";
import {
  bytesToMbs,
  calcFontSizeAccordingToWidth,
  sliderNumberToPercentageInDecimalForm,
} from "src/utils/utils";
import CropperDefault from "src/components/Cropper";
import SliderDefault from "src/components/Slider";
import ButtonDefault from "src/components/Button";
import { useDownloadImage } from "src/hooks/useDownloadImage";
import { ImageCompressionOptions } from "src/types/ImageCompression";
import domtoimage from "dom-to-image";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { Button, Tooltip } from "@mui/material";

type Props = {};

const LogoApp = (props: Props) => {
  //Especific attributtes:
  const defaultSrc: string = `${process.env.PUBLIC_URL}logo_app_sample.png`;
  const nameOfTab: string = "Logo App";
  const previewClass: string = "logo-app-preview";
  const outputFileName: string = "logo_app.png";
  const [, setCropData] = useAtom(AtomLogoAppCropped);
  const [image, setImage] = useAtom(AtomLogoAppOriginalSize);
  const aspectRatio = 450 / 250;
  const { refLogoAppCropper: cropperRef, refLogoAppDomElement: domElementRef } =
    useAppContext();
  const [domElementOptions] = useAtom(AtomLogoAppDomElementOptions);
  const [compressionRate] = useAtom(AtomLogoAppCompressionRate);
  const [compressChecked] = useAtom(AtomLogoAppCompressChecked);

  //Generic stuff:
  const [zoomValue, setZoomValue] = useState<number>(0);
  const inputRef = useRef<any>();
  const sliderRef = useRef<any>();
  // const [compressChecked] = useAtom(AtomCompressChecked);
  const [windowWidth] = useAtom(AtomWindowWidth);
  const [onTouchChecked] = useAtom(AtomOnTouchChecked);
  const [onWheelChecked] = useAtom(AtomOnWheelChecked);
  const [sliderChecked] = useAtom(AtomSliderChecked);
  const [cropDataStored, setCropDataStored] = useState(
    cropperRef.current?.cropper.getData()
  );
  const [imageFullyLoaded, setImageFullyLoaded] = useState<boolean>(false);
  const mdScreen = useMediaQuery("(max-width: 976px)");
  const [isFreeAspectRatio, setIsFreeAspectRatio] = useState<boolean>(true);
  const [isBorderRounded, setIsBorderRounded] = useAtom(
    AtomLogoAppIsBorderRounded
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

  // function handleLoaded() {
  //   setImageFullyLoaded(true);
  // }

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
    let blob: any = await new Promise((resolve) =>
      domtoimage.toBlob(domElementRef.current, domElementOptions).then(resolve)
    );
    let maxSizeMB =
      bytesToMbs(blob.size) -
      bytesToMbs(blob.size) *
        sliderNumberToPercentageInDecimalForm(compressionRate);
    const compressionOptions: ImageCompressionOptions = {
      maxSizeMB: maxSizeMB,
      fileType: "image/png",
      alwaysKeepResolution: true,
      initialQuality: 1,
    };
    triggerDownloadImage(
      blob,
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
            // bgColor="#2892CE"
            style={{
              backgroundColor: "#2892CE"
            }}
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
          src={image ?? defaultSrc}
          cropmove={handleCropmoveEvent}
          zoom={handleZoomEvent}
          data={cropDataStored}
          ready={() => {
            setImageFullyLoaded(true);
            // setIsFreeAspectRatio(true);
            // setIsBorderRounded(false);
          }}
          unmountEvent={() => {
            // setImageFullyLoaded(false);
            setIsFreeAspectRatio(true);
            // setIsBorderRounded(false);
          }}
        />
        {/* <SliderDefault
          sliderRef={sliderRef}
          value={zoomValue}
          valueLabelFormat={`${zoomValue}`}
          onChange={(event: Event, newValue: number | number[]) => {
            if (typeof newValue === "number") {
              setZoomValue(newValue);
            }
          }}
        /> */}
        <div
          style={
            {
              // width: smScreen ? "75%" : "40%",
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
              // padding: smScreen ? "10px 0" : "",
            }
          }
        >
          {isFreeAspectRatio ? (
            <Tooltip
              title="Travar proporção do recorte da imagem. Funciona melhor em fundo sólido."
              aria-label="travar"
            >
              <Button
                size="small"
                // className="lock-aspect-ratio-btn"
                onClick={() => {
                  cropperRef.current?.cropper?.setAspectRatio(aspectRatio);
                  setIsFreeAspectRatio(false);
                }}
                variant="contained"
                color="primary"
                className="lock-aspect-ratio-btn"
              >
                Travar Proporção
              </Button>
            </Tooltip>
          ) : (
            <Tooltip
              title="Liberar proporção do recorte da imagem. Funciona melhor em fundo transparente."
              aria-label="liberar"
            >
              <Button
                size="small"
                className="unlock-aspect-ratio-btn"
                onClick={() => {
                  cropperRef.current?.cropper?.setAspectRatio(NaN);
                  setIsFreeAspectRatio(true);
                }}
                variant="outlined"
                color="primary"
              >
                Liberar Proporção
              </Button>
            </Tooltip>
          )}
        </div>
        <div className="round-border-switch-box">
          <span className="switch-label">Bordas arredondadas:</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isBorderRounded}
              onChange={() => {
                setIsBorderRounded(!isBorderRounded);
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="image-editor-logo-app-preview-box">
          <div className="image-editor-wireframe">
            <div className="image-editor-wireframe-linha-horizontal"></div>
            <div className="image-editor-wireframe-linha-vertical"></div>
          </div>
          <div
            className={previewClass}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <ButtonDefault
          text={isCompressing ? "Comprimindo..." : `Baixar ${nameOfTab}`}
          // bgColor="#CE7828"
          style={{
            backgroundColor: "#CE7828",
            alignSelf: mdScreen ? "center" : "self-start",
            marginTop: mdScreen ? "10px" : "0"
          }}
          // alignSelf={mdScreen ? "center" : "self-start"}
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

export default LogoApp;
