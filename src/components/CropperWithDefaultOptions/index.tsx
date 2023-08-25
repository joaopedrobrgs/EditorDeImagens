import React from "react";
import { Cropper } from "react-cropper";
import { ReactCropperProps } from "react-cropper";

interface Props extends ReactCropperProps {
  reference?: any;
}

const CropperWithDefaultOptions = (props: Props) => {
  return (
    <Cropper
      // zoomTo={0.5}
      ref={props.reference}
      aspectRatio={props.aspectRatio}
      // initialAspectRatio={1}
      style={{ height: 400, width: "100%", maxWidth: 750 }}
      preview=".img-preview"
      src={props.src}
      viewMode={1}
      minCropBoxHeight={10}
      minCropBoxWidth={10}
      background={true}
      responsive={true}
      // autoCropArea={1}
      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
      guides={true}
      zoomOnTouch
      zoomOnWheel
      wheelZoomRatio={0.1}
      //Verificando se imagem já esta carregada, pois isso estava ocasionando um erro:
      onLoad={props.onLoad}
      autoCrop
      //Passando o ultimo recorte para a imagem assim que renderizar novamente o componente:
      data={props.data}
    />
  );
};

export default CropperWithDefaultOptions;
