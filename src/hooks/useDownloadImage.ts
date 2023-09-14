import { ReactCropperElement } from "react-cropper";
import React, { useState, ReactNode } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import imageCompression from "browser-image-compression";
import { ImageCompressionOptions } from "src/types/ImageCompression";
import domtoimage, { Options } from "dom-to-image";
import { mbsToBytes } from "src/utils/utils";

export function useDownloadImage() {
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionError, setCompressionError] = useState<
    Promise<any> | string | unknown | null
  >(null);

  const trigger = async (
    // cropperRef: ReactCropperElement,
    // domElementRef: Node,
    // domElementOptions: Options,
    domElementBlob: any,
    compressChecked: boolean,
    compressionOptions: ImageCompressionOptions,
    outputFileName: string
  ) => {
    let blob: any = domElementBlob;
    //Pegando elemento do DOM, transformando em imagem no formato BLOB e atribuindo a uma variável:
    // blob = await new Promise((resolve) =>
    //   domtoimage.toBlob(domElementRef, domElementOptions).then(resolve)
    // );
    //Comprimindo imagem (se a opção de comprimir estiver marcada e o arquivo for menor do que a quantidade de kbs que o usuário determinou):
    console.log(outputFileName, ": ",  compressionOptions.maxSizeMB);
    if (compressChecked) {
      if (blob.size >= mbsToBytes(compressionOptions.maxSizeMB)) {
        while (
          blob.size >= mbsToBytes(compressionOptions.maxSizeMB) &&
          compressionOptions.initialQuality >= 0.01
        ) {
          setIsCompressing(true);
          //Transformando BLOB em arquivo (file):
          const file = new File([blob], outputFileName, {
            type: "image/png",
          });
          try {
            //Utilizando a API de compressão de arquivos:
            await imageCompression(file, compressionOptions)
              .then((response) => {
                //Atribuindo o resultado da compressão à variável "blob":
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
          compressionOptions.initialQuality =
            compressionOptions.initialQuality - 0.3;
        }
      } else {
        setIsCompressing(true);
        //Transformando BLOB em arquivo (file):
        const file = new File([blob], outputFileName, {
          type: "image/png",
        });
        try {
          //Utilizando a API de compressão de arquivos:
          await imageCompression(file, compressionOptions)
            .then((response) => {
              //Atribuindo o resultado da compressão à variável "blob":
              blob = response;
              setIsCompressing(false);
            })
            .catch((err) => {
              setCompressionError(err);
            })
        } catch (err) {
          setCompressionError(err);
          setIsCompressing(false);
        }
      }
    }

    compressionOptions.initialQuality = 1;

    //Fazendo download da imagem
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
