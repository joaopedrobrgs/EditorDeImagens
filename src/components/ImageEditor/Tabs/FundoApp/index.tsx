import React, { createRef, useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./styles.scss";
import { Button } from "@mui/material";
import imageCompression from "browser-image-compression";
// import { ImageCompressionOptions } from "../../../../types/ImageCompression";
import { saveAs } from "file-saver";

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

  //Pegando imagem cortada
  // const getCropData = () => {
  // if (typeof cropperRef.current?.cropper !== "undefined") {
  //   setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
  // }
  // };

  async function handleDownload() {
    cropperRef.current?.cropper?.getCroppedCanvas().toBlob((blob) => {
      if (!!blob) {
        saveAs(blob, "fundo_app.png");
      }
    });
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
      console.log(cropperRef);
      console.log("Data: ", cropperRef.current?.cropper?.getCroppedCanvas());
    }
  }, [cropData]);

  return (
    <div className="tab-container">
      <p className="tw-font-bold tw-my-2">Recortar fundo_app:</p>
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
      <h1 className="tw-my-2 tw-font-bold">Prévia:</h1>
      <div className="box">
        <div
          className="img-preview"
          style={{width: "100%", height: "300px" }}
        />
      </div>
      <Button
        variant="contained"
        className="btn-download"
        onClick={handleDownload}
      >
        Baixar fundo_app
      </Button>
    </div>
  );
};

export default FundoApp;
