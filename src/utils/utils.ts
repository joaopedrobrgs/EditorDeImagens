import JSZip from "jszip";
import { ReactCropperElement } from "react-cropper";
import { saveAs } from "file-saver";
import { ImageCompressionOptions } from "src/types/ImageCompression";
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

export function getWindowHeight() {
  return window.innerHeight;
}

// export async function compressImage(
//   blob: Blob,
//   outputFileName: string,
//   maxSizeOfImage: number
// ) {
//   //Transforming Blob into File:
//   const file = new File([blob], outputFileName, {
//     type: "image/png",
//   });
//   //Options that will be passed in the requisition:
//   const options: ImageCompressionOptions = {
//     maxSizeMB: maxSizeOfImage / 1000,
//     fileType: "image/png",
//   };
//   // const compressedImage: any = await new Promise((resolve) =>
//   //   imageCompression(file, options).then(resolve)
//   // );
//   //Making a requisition to the API:
//   const compressedImage: any = await imageCompression(file, options);
//   //Returning the response of the requisition:
//   return compressedImage;
// }

// export async function downloadImage(
//   croppedImage: ReactCropperElement,
//   compressChecked: boolean,
//   maxSizeOfImage: number
// ) {
//   //Getting image in Blob format and assigning it to a variable:
//   let blob: any = await new Promise((resolve) =>
//     croppedImage.cropper?.getCroppedCanvas().toBlob(resolve)
//   );
//   console.log("Image to download: ", blob);
//   //Compressing the image (if the "compress" option is checked):
//   if (compressChecked) {
//     //Assigning compression result to the "blob" variable:
//     blob = await new Promise((resolve) =>
//       compressImage(blob, croppedImage.name, maxSizeOfImage).then(resolve)
//     );
//     console.log("Image to download compressed: ", blob);
//   }
//   //Downloading the image:
//   saveAs(blob, croppedImage.name);
// }

// export function downloadZip(
//   data: Array<ReactCropperElement>,
//   compressChecked: boolean,
//   maxSizeOfImage: number
// ) {
//   //Creating zip file:
//   var zip = new JSZip();

//   //Making a map in our array that contains the cropped images and assigning it to a constant variable:
//   const downloadZips = data.map(async (croppedImage, index) => {
//     //Getting image in Blob format and assigning it to a variable:
//     let blob: any = await new Promise((resolve) =>
//       croppedImage.cropper?.getCroppedCanvas().toBlob(resolve)
//     );
//     console.log("Image to download: ", blob);
//     //Compressing the image (if the "compress" option is checked):
//     if (compressChecked) {
//       //Assigning compression result to the "blob" variable:
//       blob = await new Promise((resolve) =>
//         compressImage(blob, croppedImage.name, maxSizeOfImage).then(resolve)
//       );
//       console.log("Image to download compressed: ", blob);
//     }
//     //Adding Blobs to the zip file:
//     zip.file(`${croppedImage?.name}.png`, blob);
//   });

//   //Taking the promises that our constant returns and doing something:
//   Promise.all(downloadZips).then(() => {
//     //Getting zip file result:
//     zip.generateAsync({ type: "blob" }).then((content) => {
//       //Saving zip file on user device:
//       saveAs(content, "cropped-images.zip");
//     });
//   });
// }
