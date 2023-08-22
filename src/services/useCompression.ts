import imageCompression from "browser-image-compression";
import { ImageCompressionOptions } from "../types/ImageCompression";
import { useState } from "react";

// export function useCompression() {
//   const [response, setResponse] = useState<File | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<Promise<any> | string | unknown | null>(null);

//   const fetchNext = async (file: any, options: ImageCompressionOptions) => {
//     if (!file || !options) {
//       return;
//     }
//     try {
//       setIsLoading(true);
//       await imageCompression(file, options)
//         .then((response) => {
//           setError(null);
//           setResponse(response);
//         })
//         .catch((err) => {
//           setResponse(null);
//           setError(err);
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     } catch (err) {
//       setError(err);
//       setResponse(null);
//       setIsLoading(false);
//     }
//   };
//   return {
//     response,
//     isLoading,
//     error,
//     fetchNext,
//   };
// }

export async function CompressionService(file: any) {
  const options: ImageCompressionOptions = {
    maxSizeMB: 0.1,
    fileType: "image/png",
  };
  if (!file) {
    return null;
  }
  try {
    await imageCompression(file, options)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log("Erro na compressão: ", err);
        return null;
      });
  } catch (err) {
    console.log("Erro na compressão: ", err);
    return null;
  }
}
