import { ReactCropperElement } from "react-cropper";
import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import imageCompression from "browser-image-compression";
import { ImageCompressionOptions } from "src/types/ImageCompression";
import { DomElementReferenceOptionsType } from "src/types/DomElement";
import domtoimage from "dom-to-image";
import { mbsToBytes } from "src/utils/utils";

export function useDownloadZip() {
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionError, setCompressionError] = useState<
    Promise<any> | string | unknown | null
  >(null);

  const trigger = async (
    data: Array<DomElementReferenceOptionsType>,
    // compressChecked: boolean,
    // compressionOptions: ImageCompressionOptions
  ) => {
    var loopCounter = 1;
    //Criando um arquivo zip:
    var zip = new JSZip();
    //Fazendo um map no array de DOM Elements que nós montamos para trabalhar com imagem por imagem:
    const downloadZips = data.map(async (domElement, index) => {
      //Pegando elemento do DOM, transformando em imagem no formato BLOB e atribuindo a uma variável:
      let blob: any = await new Promise((resolve) =>
        domtoimage
          .toBlob(domElement.elementReference, domElement.elementOptions)
          .then(resolve)
      );
      console.log(domElement.elementOutputFileName, ": ",  domElement.compressionOptions.maxSizeMB);
      //Comprimindo imagem (se a opção de comprimir estiver marcada e o arquivo for menor do que a quantidade de kbs que o usuário determinou):
      if (domElement.compressChecked) {
        if (blob.size >= mbsToBytes(domElement.compressionOptions.maxSizeMB)) {
          while (
            blob.size >= mbsToBytes(domElement.compressionOptions.maxSizeMB) &&
            domElement.compressionOptions.initialQuality >= 0.01
          ) {
            setIsCompressing(true);
            //Transformando BLOB em arquivo (file):
            const file = new File([blob], domElement.elementOutputFileName, {
              type: domElement.compressionOptions.fileType,
            });
            try {
              //Utilizando a API de compressão de arquivos:
              await imageCompression(file, domElement.compressionOptions)
                .then((response) => {
                  //Atribuindo o resultado da compressão à variável "blob":
                  blob = response;
                  if (loopCounter === data.length) {
                    setIsCompressing(false);
                    setCompressionError(null);
                  }
                })
                .catch((err) => {
                  setCompressionError(err);
                });
                domElement.compressionOptions.initialQuality =
                domElement.compressionOptions.initialQuality - 0.3;
            } catch (err) {
              setCompressionError(err);
              setIsCompressing(false);
            }
          }

        } else {
          setIsCompressing(true);
          //Transformando BLOB em arquivo (file):
          const file = new File([blob], domElement.elementOutputFileName, {
            type: domElement.compressionOptions.fileType,
          });
          try {
            //Utilizando a API de compressão de arquivos:
            await imageCompression(file, domElement.compressionOptions)
              .then((response) => {
                //Atribuindo o resultado da compressão à variável "blob":
                blob = response;
                if (loopCounter === data.length) {
                  setIsCompressing(false);
                  setCompressionError(null);
                }
              })
              .catch((err) => {
                setCompressionError(err);
              });
          } catch (err) {
            setCompressionError(err);
            setIsCompressing(false);
          }
        }
      }
      loopCounter++;
      domElement.compressionOptions.initialQuality = 1;
      //Adicionando os arquivos BLOBs ao arquivo zip:
      zip.file(domElement.elementOutputFileName, blob);
    });
    //Pegando a promise que o nosso arquivo zip retorna e fazendo algo a partir disso:
    Promise.all(downloadZips).then(() => {
      //Pegando o resultado desse zip:
      zip.generateAsync({ type: "blob" }).then((content) => {
        //Fazendo download do arquivo zip:
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
