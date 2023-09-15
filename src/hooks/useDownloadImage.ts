import { ReactCropperElement } from "react-cropper";
import React, { useState, ReactNode } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import imageCompression from "browser-image-compression";
import { ImageCompressionOptions } from "src/types/ImageCompression";
import domtoimage, { Options } from "dom-to-image";
import { mbsToBytes } from "src/utils/utils";
import { apiTinyPng } from "src/services/APIs";
import axios, { AxiosResponse } from "axios";

export function useDownloadImage() {
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionResponse, setCompressionResponse] =
    useState<AxiosResponse | null>();
  const [compressionError, setCompressionError] = useState<any>(null);

  const trigger = async (
    domElementBlob: any,
    // domElementPng: any,
    // domElementUrl: string,
    compressorSelected: string,
    compressChecked: boolean,
    compressionOptions: ImageCompressionOptions,
    outputFileName: string
  ) => {
    let blob: any = domElementBlob;
    // let png: any = domElementPng;
    // let url: string = domElementUrl;

    if (compressorSelected === "tiny-png") {
      // const config = {
      //   method: "post",
      //   baseURL: "https://api.tinify.com/",
      //   url: "shrink",
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //     Accept: "application/json",
      //     "Access-Control-Allow-Headers":
      //       "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token",
      //     // 'Access-Control-Allow-Headers': '*',
      //     // "Access-Control-Allow-Origin": "http://localhost:3000/",
      //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      //     // "Access-Control-Allow-Methods": "*",
      //     // "Access-Control-Max-Age": 86400,
      //     // Authorization: "Basic " + process.env.TINY_PNG_API_KEY,
      //     Authorization: "Basic " + process.env.REACT_APP_TINY_PNG_API_KEY,
      //     "Content-Type": "application/json",
      //   },
      //   data: {
      //     source: { url: "https://github.com/joaopedrobrgs.png" },
      //   },
      // };

      try {
        setIsCompressing(true);
        await apiTinyPng
          .post("shrink", {
            source: { url: "https://github.com/joaopedrobrgs.png" },
          })
        // await axios(config)
          .then((response) => {
            setCompressionError(null);
            setCompressionResponse(response);
          })
          //Se der algo errado com a requisição, retornar esse erro:
          .catch((err) => {
            setCompressionResponse(null);
            setCompressionError(err);
          })
          .finally(() => {
            setIsCompressing(false);
          });
      } catch (err) {
        setCompressionError(err);
        setCompressionResponse(null);
        setIsCompressing(false);
      }
    } else if (compressorSelected === "browser-image-compression") {
      //Comprimindo imagem (se a opção de comprimir estiver marcada e o arquivo for menor do que a quantidade de kbs que o usuário determinou):
      // console.log(outputFileName, ": ",  compressionOptions.maxSizeMB);
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
              });
          } catch (err) {
            setCompressionError(err);
            setIsCompressing(false);
          }
        }
      }
      compressionOptions.initialQuality = 1;
    }

    //Fazendo download da imagem
    saveAs(blob, outputFileName);
  };

  return {
    isCompressing,
    setIsCompressing,
    compressionError,
    setCompressionError,
    compressionResponse,
    setCompressionResponse,
    trigger,
  };
}
