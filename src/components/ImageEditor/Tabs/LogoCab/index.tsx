import React, { useState } from "react";
import "cropperjs/dist/cropper.css";
import "../styles.scss";
// import imageCompression from "browser-image-compression";
// import { ImageCompressionOptions } from "../../../../types/ImageCompression";
import { saveAs } from "file-saver";
import { useAtom } from "jotai/react";
import { useAppContext } from "../../../../context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import TabComponent from "..";
import { AtomLogoCabCropped, AtomLogoCabOriginalSize } from "../../../../store";

type Props = {};

const LogoCab = (props: Props) => {
  const defaultSrc: string = `${process.env.PUBLIC_URL}logo_cab_sample.png`;

  const [zoomValue, setZoomValue] = useState<number>(0);

  const [cropData, setCropData] = useAtom(AtomLogoCabCropped);

  const [image, setImage] = useAtom(AtomLogoCabOriginalSize);

  const { refLogoCabCropper: cropperRef } = useAppContext();

  const aspectRatio = 130 / 130;

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
        saveAs(blob, "logo_cab.png");
      }
    });
  }

  return (
    <>
      <TabComponent
        nameOfTab="Logo Cab"
        src={image ?? defaultSrc}
        cropperReference={cropperRef}
        aspectRatio={aspectRatio}
        data={cropperRef.current?.cropper.getData()}
        zoomTo={zoomValue}
        zoomValue={zoomValue}
        setZoomValue={setZoomValue}
        onSelectFile={onSelectFile}
        getCropData={getCropData}
        handleDownload={handleDownload}
        previewClass="logo-cab-preview"
      />
      {/* <h1>Prévia:</h1>
      <div className="box">
        <div
          className="logo-cab-preview"
          style={{ width: "200px", height: "200px" }}
        />
      </div> */}
    </>
  );
};

export default LogoCab;
