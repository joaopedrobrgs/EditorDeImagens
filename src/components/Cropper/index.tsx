import React, {useEffect, useState} from "react";
import { Cropper } from "react-cropper";
import { ReactCropperProps } from "react-cropper";
import { useAtom } from "jotai";
import {
  AtomOnTouchChecked,
  AtomOnWheelChecked,
  AtomSliderChecked,
  AtomWindowWidth
} from "src/store";

interface Props extends ReactCropperProps {
  cropperReference?: any;
}

const CropperDefault = (props: Props) => {

  const [onTouchChecked] = useAtom(AtomOnTouchChecked);
  const [onWheelChecked] = useAtom(AtomOnWheelChecked);
  const [sliderChecked] = useAtom(AtomSliderChecked);
  const [windowWidth] = useAtom(AtomWindowWidth)

  // function cropperSizeAcorddingToScreen(windowWidth: number): any{
  //   if(windowWidth >= 340){
  //     return { height: 320, width: 280 };
  //   }
  //   else{
  //     return { height: 150, width: 131.25 };
  //   }
  // }

  const [key, setKey] = useState(0)

  useEffect(()=>{
    setKey(key + 1)
  }, [onTouchChecked, onWheelChecked, sliderChecked, windowWidth])

  return (
    <Cropper
      //Default Options:
      className="cropper"
      // style={{ height: 320, width: 280 }}
      viewMode={1}
      minCropBoxHeight={10}
      minCropBoxWidth={10}
      background={true}
      responsive={false}
      restore={false}
      autoCropArea={1}
      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
      guides={true}
      wheelZoomRatio={0.1}
      autoCrop
      movable
      dragMode="move"
      zoomOnTouch={onTouchChecked}
      zoomOnWheel={onWheelChecked}
      //Props:
      key={`${props.preview}-${key}`}
      ready={props.ready}
      ref={props.cropperReference}
      aspectRatio={props.aspectRatio}
      initialAspectRatio={props.initialAspectRatio}
      //Passando o ultimo recorte para a imagem assim que renderizar novamente o componente:
      data={props.data}
      zoomTo={props.zoomTo}
      //Verificando se imagem já esta carregada, pois isso estava ocasionando um erro:
      onLoad={props.onLoad}
      src={props.src}
      preview={`.${props.preview}`}
      cropmove={props.cropmove}
      zoom={props.zoom}
    />
  );
};

export default CropperDefault;