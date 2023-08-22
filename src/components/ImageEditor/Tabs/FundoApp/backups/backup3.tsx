import React, { createRef, useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./styles.scss";
import { Button } from "@mui/material";
import imageCompression from "browser-image-compression";
import { ImageCompressionOptions } from "../../../../../types/ImageCompression";
import { saveAs } from 'file-saver';
import { dataURLtoFile } from "../../../../../utils/dataURLtoFile";

type Props = {};

const FundoApp = (props: Props) => {
  const defaultSrc: string =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

  const inputRef = useRef<any>();

  const [image, setImage] = useState<string>(defaultSrc);

  const [cropData, setCropData] = useState<string | null>(null);

  const cropperRef = createRef<ReactCropperElement>();

  let files: any;

  const triggerFileSelectPopup = () => {
    if (!!inputRef.current) {
      inputRef.current.click();
    }
  };

  //Comprimindo imagem:
  // const onSelectFile = async (e: any) => {
  //   e.preventDefault();
  //   const options: ImageCompressionOptions = {
  //     maxSizeMB: 0.2,
  //     fileType: "image/png",
  //   };
  //   if (!!e.target.files && e.target.files.length > 0) {
  //     const compressedFile = await imageCompression(e.target.files[0], options);
  //     //Instanciando arquivo e atribuindo a uma constante:
  //     const reader = new FileReader();
  //     //Lendo arquivo em formato URL (e não como objeto):
  //     if (!!compressedFile) {
  //       console.log("Compressão funcionou!", compressedFile)
  //       reader.readAsDataURL(compressedFile);
  //     } else {
  //       console.log("Compressão falhou!")
  //       reader.readAsDataURL(e.target.files.length[0]);
  //     }
  //     //Executando uma função assim que o arquivo for carregado (evento "load"):
  //     reader.addEventListener("load", () => {
  //       setImage(reader.result as any);
  //     });
  //     console.log("Normal: ", e.target.files[0]);
  //     console.log("Compressed: ", compressedFile);
  //     console.log("ge")
  //   }
  // };

  const onSelectFile = (e: any) => {
    e.preventDefault();
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

  //Pegando imagem cortada:
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  async function handleDownload() {
    cropperRef.current?.cropper?.getCroppedCanvas().toBlob((blob)=>{
      if(!!blob){
        saveAs(blob, "fundo_app.png")
      }
    })
  }

  useEffect(() => {
    if (!!image) {
      console.log("Image: ", image);
    }
  }, [image]);

  useEffect(() => {
    if (!!cropData) {
      console.log("CropData: ", cropData);
      console.log(
        "CropData formatted: ",
        cropperRef.current?.cropper.getCroppedCanvas()
      );
      console.log(cropperRef)
      console.log("Data: ", cropperRef.current?.cropper?.getCroppedCanvas())
    }
  }, [cropData]);

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-border tw-border-blue-200 tw-border-2 tw-rounded tw-px-2 tw-py-4 tw-box-border">
      <p className="tw-font-bold tw-mb-5">Recortar Logo APP:</p>
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
        Update fundo.app
      </Button>
      <Cropper
        ref={cropperRef}
        style={{ height: 400, width: "100%" }}
        zoomTo={0.5}
        aspectRatio={0.56 / 1}
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
      />
      <div className="tw-flex tw-justify-between tw-w-full">
        <div className="box tw-w-6/12">
          <h1>Prévia:</h1>
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>

        <div className="box tw-w-6/12" style={{ height: "300px" }}>
          <span>Imagem cortada:</span>

          {!!cropData ? (
            <img
              style={{ maxWidth: 500, maxHeight: 900 }}
              src={cropData}
              alt="cropped"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <Button variant="contained" className="btn-cut" onClick={getCropData}>
        Recortar Imagem
      </Button>
      <Button
        variant="contained"
        className="btn-download"
        onClick={handleDownload}
      >
        Baixar fundo.app
      </Button>
    </div>
  );
};

export default FundoApp;
