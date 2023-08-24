import React, { createRef, useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../styles.scss";
import { Button } from "@mui/material";
import imageCompression from "browser-image-compression";
// import { ImageCompressionOptions } from "../../../../types/ImageCompression";
import { saveAs } from "file-saver";
import { useAtom } from "jotai/react";
import { AtomFundoApp, AtomFundoAppNoCut } from "../../../../store";
import { useAppContext } from "../../../../context";

type Props = {};

const FundoApp = (props: Props) => {
  const defaultSrc: string = `${process.env.PUBLIC_URL}foto-exemplo.png`;

  const inputRef = useRef<any>();

  const [cropData, setCropData] = useAtom(AtomFundoApp);

  const [image, setImage] = useAtom(AtomFundoAppNoCut);

  const {refFundoAppCropper} = useAppContext();

  // const cropperRef = createRef<ReactCropperElement>();

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
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    if (!!files[0]) {
      reader.readAsDataURL(files[0]);
    }
    console.log("Files: ", files);
  };

  // Pegando imagem cortada
  const getCropData = () => {
    if (typeof refFundoAppCropper.current?.cropper !== "undefined") {
      setCropData(
        refFundoAppCropper.current?.cropper.getCroppedCanvas().toDataURL() ?? null
      );
    }
  };

  async function handleDownload() {
    refFundoAppCropper.current?.cropper?.getCroppedCanvas().toBlob((blob: any) => {
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
        className="tw-hidden"
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
      <p className="tw-font-bold tw-mb-2">Recortar fundo_app:</p>

      <Cropper
        ref={refFundoAppCropper}
        style={{ height: 400, width: "100%" }}
        zoomTo={0.5}
        aspectRatio={500 / 889}
        initialAspectRatio={1}
        preview=".img-preview"
        src={image ?? defaultSrc}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        guides={true}
        //Verificando se imagem já esta carregada, pois isso estava ocasionando um erro
        onLoad={handleLoaded}
      />
      <h1 className="tw-my-2 tw-font-bold">Prévia:</h1>
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
    </div>
  );
};

export default FundoApp;
