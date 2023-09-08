import { ReactCropperElement } from "react-cropper";
import React, { useState } from "react";
import JSZip from "jszip";
import { compressImage, downloadImage } from "src/utils/utils";
import { saveAs } from "file-saver";
import imageCompression from "browser-image-compression";
import { ImageCompressionOptions } from "src/types/ImageCompression";

export function useDownloadImage() {
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionError, setCompressionError] = useState<Promise<any> | string | unknown | null>(
    null
  );

  const trigger = async (
    croppedImage: ReactCropperElement,
    compressChecked: boolean,
    options: ImageCompressionOptions
  ) => {


    //Getting image in Blob format and assigning it to a variable:
    let blob: any = await new Promise((resolve) =>
      croppedImage.cropper?.getCroppedCanvas().toBlob(resolve)
    );

    //Compressing the image (if the "compress" option is checked):
    if (compressChecked) {
      setIsCompressing(true);
      //Transforming Blob into File:
      const file = new File([blob], croppedImage?.name, {
        type: "image/png",
      });
      try {
        console.log(`Comprimindo ${croppedImage?.name}...`);
        //Making fetch to conversion API:
        await imageCompression(file, options)
          .then((response) => {
            console.log(`${croppedImage?.name} comprimida!`);
            //Assigning compression result to the "blob" variable:
            blob = response;
            setIsCompressing(false);
          })
          .catch((err) => {
            setCompressionError(err);
          })
          .finally(() => {});
      } catch (err) {
        setCompressionError(err);
        setIsCompressing(false);
      }
    }
    //Downloading the image:
    saveAs(blob, croppedImage.name);
  };

  return {
    isCompressing,
    setIsCompressing,
    compressionError,
    setCompressionError,
    trigger,
  };
}
