import JSZip from "jszip";
import { ReactCropperElement } from "react-cropper";
import { saveAs } from "file-saver";
import { ImageCompressionOptions } from "../types/ImageCompression";
import imageCompression from "browser-image-compression";

export function hoursMinutesToString(date: Date): string {
  // return `${date.getHours()}:${date.getMinutes()}`
  const str = date.toLocaleTimeString();
  return str.slice(0, str.length - 3);
}

export function hoursMinutesSecondsToString(date: Date): string {
  return date.toLocaleTimeString();
}

export function dateToString(date: Date): string {
  return date.toLocaleDateString();
}

export function dateTimeToString(date: Date): string {
  return date.toLocaleString();
}

export function valueLabelFormat(value: number, suffix: string) {
  return `${value}${suffix}`;
}

export function changeRootVarAtribute(
  rootStyleAtributeValue: string,
  rootStyleAtributeName: string
) {
  document.documentElement.style.setProperty(
    rootStyleAtributeName,
    rootStyleAtributeValue
  );
}

export function calcFontSizeAccordingToWidth(
  windowWidth: number,
  multiplicator: number = 1
) {
  if (windowWidth <= 275) {
    return windowWidth * 0.035 * multiplicator;
  }
  if (windowWidth <= 306) {
    return windowWidth * 0.04 * multiplicator;
  }
  if (windowWidth <= 379) {
    return windowWidth * 0.035 * multiplicator;
  }
  if (windowWidth <= 486) {
    return windowWidth * 0.03 * multiplicator;
  }
  if (windowWidth <= 549) {
    return windowWidth * 0.025 * multiplicator;
  }
  if (windowWidth <= 819) {
    return windowWidth * 0.018 * multiplicator;
  }
  if (windowWidth <= 975) {
    return windowWidth * 0.015 * multiplicator;
  }
  // if (windowWidth <= 1160) {
  //   return windowWidth * 0.014 * multiplicator;
  // }
  if (windowWidth <= 1384) {
    return windowWidth * 0.01 * multiplicator;
  }
  if (windowWidth <= 1849) {
    return windowWidth * 0.008 * multiplicator;
  } else {
    return 14 * multiplicator;
  }
}

export function getWindowWidth() {
  return window.innerWidth;
}

export async function compressImage(blob: Blob, outputFileName: string) {
  // const blob: any = await new Promise((resolve) =>
  //   imageRef.cropper?.getCroppedCanvas().toBlob(resolve)
  // );
  const file = new File([blob], outputFileName, {
    type: "image/png",
  });
  const options: ImageCompressionOptions = {
    maxSizeMB: 0.4,
    fileType: "image/png",
  };
  // const compressedImage: any = await new Promise((resolve) =>
  //   imageCompression(file, options).then(resolve)
  // );
  const compressedImage: any = await imageCompression(file, options);
  return compressedImage;
}

export async function downloadImage(
  croppedImage: ReactCropperElement,
  compressChecked: boolean
) {
  //Pegando imagem como Blob e atribuindo à variável "blob":
  let blob: any = await new Promise((resolve) =>
    croppedImage.cropper?.getCroppedCanvas().toBlob(resolve)
  );
  console.log("Image to download: ", blob);
  //Comprimindo imagem (se a opção de comprimir estiver marcada):
  if (compressChecked) {
    //Atribuindo resultado da compressão à variável "blob":
    blob = await new Promise((resolve) =>
      compressImage(blob, croppedImage.name).then(resolve)
    );
    console.log("Image to download compressed: ", blob);
  }
  //Fazendo download da imagem:
  saveAs(blob, croppedImage.name);
}

export function downloadZip(
  data: Array<ReactCropperElement>,
  compressChecked: boolean
) {
  //Criando o arquivo zip:
  var zip = new JSZip();

  //Fazendo um map no nosso array com as imagens cortadas e atribuindo a uma constante:
  const downloadZips = data.map(async (croppedImage, index) => {
    //Pegando imagens como Blob e atribuindo à variável "blob":
    let blob: any = await new Promise((resolve) =>
      croppedImage.cropper?.getCroppedCanvas().toBlob(resolve)
    );
    console.log("Image to download: ", blob);
    //Comprimindo imagem (se a opção de comprimir estiver marcada):
    if (compressChecked) {
      //Atribuindo resultado da compressão à variável "blob":
      blob = await new Promise((resolve) =>
        compressImage(blob, croppedImage.name).then(resolve)
      );
      console.log("Image to download compressed: ", blob);
    }
    //Adicionando os BLOBs no nosso arquivo zip:
    zip.file(`${croppedImage?.name}.png`, blob);
  });

  //Pegando as promisses que a nossa constante retorna e fazendo algo a partir disso:
  Promise.all(downloadZips).then(() => {
    //Pegando o resultado do nosso arquivo zipado:
    zip.generateAsync({ type: "blob" }).then((content) => {
      //Salvando o arquivo zipado no dispositivo do usuário:
      saveAs(content, "cropped-images.zip");
    });
  });
}
