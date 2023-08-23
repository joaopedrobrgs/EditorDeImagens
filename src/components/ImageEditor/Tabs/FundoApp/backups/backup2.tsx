//Hooks:
import React, { createRef, useEffect, useRef, useState } from "react";

//Styles:
import "./styles.scss";

//Components:
// import Cropper from "react-easy-crop";
import { Button, Slider } from "@mui/material";

//Utils:
import imageCompression from "browser-image-compression";
import { generateDownload } from "../../../../../utils/cropImage";

//Types:
import { ImageCompressionOptions } from "../../../../../types/ImageCompression";
// import { CropPosition } from "../../../../../types/ImageCrop";

type Props = {};

const FundoApp = ({}: Props) => {
  const defaultSrc: string =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

  const inputRef = useRef<any>();

  const [image, setImage] = useState<string | undefined | null>(null);
  const [croppedArea, setCroppedArea] = useState<string | null>(null);
  const [crop, setCrop] = useState<any>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const onCropComplete = (
    croppedAreaPercentage: any,
    croppedAreaPixels: any
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  const triggerFileSelectPopup = () => {
    if (!!inputRef.current) {
      inputRef.current.click();
    }
  };

  const onSelectFile = (e: any) => {
    e.preventDefault();
    //Verificando se algum arquivo foi selecionado:
    if (!!e.target.files && e.target.files.length > 0) {
      //Instanciando arquivo e atribuindo a uma constante:
      const reader = new FileReader();
      //Lendo arquivo em formato URL (e não como objeto):
      reader.readAsDataURL(e.target.files[0]);
      //Executando uma função assim que o arquivo for carregado (evento "load"):
      reader.addEventListener("load", () => {
        setImage(reader.result as any);
      });
    }
  };

  async function handleDownload() {
    generateDownload(image, croppedArea);
  }

  return (
    <div className="container">
      <p className="tw-font-bold tw-mb-5">Recortar Logo APP:</p>
      <input
        className="tw-hidden"
        type="file"
        onChange={onSelectFile}
        accept="image/*"
        ref={inputRef as any}
      />
      <div>
        <Button
          variant="contained"
          className="btn btn-upload"
          onClick={triggerFileSelectPopup}
        >
          Update fundo.app
        </Button>
      </div>
      <div className="container-cropper">
        {image ? (
          <>
            <div className="cropper">
              {/* <Cropper
                image={image as any}
                crop={crop}
                zoom={zoom}
                aspect={0.56 / 1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
              /> */}
            </div>
            <div className="slider">
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom as number)}
              />
            </div>
          </>
        ) : (
          <></>
        )}
        <Button
          variant="contained"
          className="btn-download"
          onClick={handleDownload}
        >
          Baixar fundo.app
        </Button>
      </div>
    </div>
  );
};

export default FundoApp;
