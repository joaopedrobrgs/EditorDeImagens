import { ReactCropperElement } from "react-cropper";
import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import imageCompression from "browser-image-compression";
import { ImageCompressionOptions } from "src/types/ImageCompression";
import { DomElementReferenceOptionsType } from "src/types/DomElement";
import domtoimage from "dom-to-image";

export function useDownloadZip() {
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionError, setCompressionError] = useState<
    Promise<any> | string | unknown | null
  >(null);

  const trigger = async (
    data: Array<DomElementReferenceOptionsType>,
    compressChecked: boolean,
    compressionOptions: ImageCompressionOptions
  ) => {
    var loopCounter = 1;
    //Creating zip file:
    var zip = new JSZip();
    //Making a map in our array that contains the cropped images and assigning it to a constant variable:
    const downloadZips = data.map(async (domElement, index) => {
      //Getting image in Blob format and assigning it to a variable:
      let blob: any = await new Promise((resolve) =>
        domtoimage
          .toBlob(domElement.elementReference, domElement.elementOptions)
          .then(resolve)
      );
      //Compressing the image (if the "compress" option is checked):
      if (compressChecked  && (blob.size >= compressionOptions.maxSizeMB * 1000000)) {
        setIsCompressing(true);
        //Assigning compression result to the "blob" variable:
        const file = new File([blob], domElement.elementOutputFileName, {
          type: compressionOptions.fileType,
        });
        try {
          await imageCompression(file, compressionOptions)
            .then((response) => {
              blob = response;
              if (loopCounter === data.length) {
                setIsCompressing(false);
                setCompressionError(null);
              }
              console.log(domElement.elementOutputFileName, " comprimido")
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
      loopCounter++;
      //Adding Blobs to the zip file:
      zip.file(domElement.elementOutputFileName, blob);
    });
    //Taking the promises that our constant returns and doing something:
    Promise.all(downloadZips).then(() => {
      //Getting zip file result:
      zip.generateAsync({ type: "blob" }).then((content) => {
        //Saving zip file on user device:
        saveAs(content, "cropped-images.zip");
      });
    });
  };

  return {
    isCompressing,
    setIsCompressing,
    compressionError,
    setCompressionError,
    trigger,
  };
}
