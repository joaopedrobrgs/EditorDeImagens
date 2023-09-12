import { ReactCropperElement } from "react-cropper";
import React, { useState, ReactNode } from "react";
import JSZip from "jszip";
import { compressImage, downloadImage } from "src/utils/utils";
import { saveAs } from "file-saver";
import imageCompression from "browser-image-compression";
import { ImageCompressionOptions } from "src/types/ImageCompression";
import domtoimage, { Options } from "dom-to-image";

export function useDownloadImage() {
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionError, setCompressionError] = useState<
    Promise<any> | string | unknown | null
  >(null);

  const trigger = async (
    // cropperRef: ReactCropperElement,
    domElementRef: Node,
    domElementOptions: Options,
    compressChecked: boolean,
    compressionOptions: ImageCompressionOptions,
    outputFileName: string
  ) => {
    let blob: any;

    //Dom to Image:
    blob = await new Promise((resolve) =>
      domtoimage.toBlob(domElementRef, domElementOptions).then(resolve)
    );

    // console.log("Blob size: ", blob.size);
    // console.log("Compression size: ", compressionOptions.maxSizeMB * 1000000)

    //Cropper to image:
    // else {
    //   //Getting image in Blob format and assigning it to a variable:
    //   blob = await new Promise((resolve) =>
    //     cropperRef.cropper?.getCroppedCanvas().toBlob(resolve)
    //   );
    //   // documentName = cropperRef?.name;
    // }

    //Compressing the image (if the "compress" option is checked and the size is bigger than 200kbs):
    if (compressChecked && (blob.size >= compressionOptions.maxSizeMB * 1000000)) {
      setIsCompressing(true);
      //Transforming Blob into File:
      const file = new File([blob], outputFileName, {
        type: "image/png",
      });
      try {
        //Making fetch to conversion API:
        await imageCompression(file, compressionOptions)
          .then((response) => {
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
    saveAs(blob, outputFileName);
  };

  return {
    isCompressing,
    setIsCompressing,
    compressionError,
    setCompressionError,
    trigger,
  };
}
