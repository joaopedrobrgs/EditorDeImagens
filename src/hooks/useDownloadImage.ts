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
import { encode } from "base-64";

export function useDownloadImage() {
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionResponse, setCompressionResponse] = useState<any>();
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

    let username: string | undefined = process.env.REACT_APP_TINY_PNG_API_KEY;
    let password: string = '';

    if (compressorSelected === "tiny-png") {
      let headers = new Headers()
      headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
      try {
        setIsCompressing(true);
        await fetch("https://api.tinify.com/shrink", {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Authorization": "Basic RktTcWpaSkh4VDhjSFlka24wUTkwZ05jajZaa2NEOTg=",
            'Authorization': 'Basic ' + btoa(username + ":" + password),
            // "Access-Control-Allow-Credentials": "true",
            // "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            // "Access-Control-Allow-Headers":
            //   "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-PINGOTHER",
            // "Access-Control-Max-Age": "86400",
          },
          body: JSON.stringify({
            source: { url: "https://github.com/joaopedrobrgs.png" },
          }),
          mode: "no-cors",
        })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            console.log(response);
            setCompressionError(null);
            setCompressionResponse(response);
          })
          //Se der algo errado com a requisição, retornar esse erro:
          .catch((err) => {
            console.log(err);
            setCompressionResponse(null);
            setCompressionError(err);
          });
      } catch (err) {}

      // await fetch(
      //   "http://api.resmush.it/ws.php?img=https://github.com/joaopedrobrgs.png&qlty=10&percent=100",
      //   {
      //     method: "GET",
      //   }
      // )
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((response)=>{
      //     setCompressionResponse(response);
      //   })
      //   .catch((response) => {
      //     console.log("response", response);
      //   });

      // try {
      //   setIsCompressing(true);
      //   await apiTinyPng
      //     .post("/shrink", {
      //       source: { url: "https://github.com/joaopedrobrgs.png" },
      //     })
      //   // await axios(config)
      // .then((response) => {
      //   setCompressionError(null);
      //   setCompressionResponse(response);
      // })
      // //Se der algo errado com a requisição, retornar esse erro:
      // .catch((err) => {
      //   setCompressionResponse(null);
      //   setCompressionError(err);
      // })
      //     .finally(() => {
      //       setIsCompressing(false);
      //     });
      // } catch (err) {
      //   setCompressionError(err);
      //   setCompressionResponse(null);
      //   setIsCompressing(false);
      // }
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
