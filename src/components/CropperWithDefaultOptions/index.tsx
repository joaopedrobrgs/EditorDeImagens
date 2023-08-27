import React, {useEffect, useState} from "react";
import { Cropper } from "react-cropper";
import { ReactCropperProps } from "react-cropper";
import { useAtom } from "jotai";
import {
  AtomOnTouchChecked,
  AtomOnWheelChecked,
} from "../../store";

interface Props extends ReactCropperProps {
  reference?: any;
}

const CropperWithDefaultOptions = (props: Props) => {

  const [onTouchChecked] = useAtom(AtomOnTouchChecked);
  const [onWheelChecked] = useAtom(AtomOnWheelChecked);

  // const [onTouchChecked] = useState<boolean>(() => {
  //   const storedState = localStorage.getItem("@onTouchChecked");
  //   if (storedState) {
  //     return JSON.parse(storedState);
  //   }
  //   return true;
  // });
  // const [onWheelChecked] = useState<boolean>(() => {
  //   const storedState = localStorage.getItem("@onWheelChecked");
  //   if (storedState) {
  //     return JSON.parse(storedState);
  //   }
  //   return true;
  // });

  useEffect(()=>{
    console.log("onWheelState first render: ", onWheelChecked)
  }, [])

  useEffect(()=>{
    console.log("onWheelState on change: ", onWheelChecked)
  }, [onWheelChecked])

  return (
    <Cropper
      // zoomTo={0.5}

      // initialAspectRatio={1}
      style={{ height: 400, width: "100%", maxWidth: 750 }}
      preview=".img-preview"
      viewMode={1}
      minCropBoxHeight={10}
      minCropBoxWidth={10}
      background={true}
      responsive={true}
      autoCropArea={1}
      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
      guides={true}
      wheelZoomRatio={0.1}
      autoCrop
      movable
      dragMode="move"
      // ready={props.ready}
      // zoom={props.zoom}
      ref={props.reference}
      aspectRatio={props.aspectRatio}
      //Passando o ultimo recorte para a imagem assim que renderizar novamente o componente:
      data={props.data}
      zoomOnTouch={onTouchChecked}
      zoomOnWheel={onWheelChecked}
      zoomTo={props.zoomTo}
      //Verificando se imagem já esta carregada, pois isso estava ocasionando um erro:
      onLoad={props.onLoad}
      src={props.src}
    />
  );
};

export default CropperWithDefaultOptions;
