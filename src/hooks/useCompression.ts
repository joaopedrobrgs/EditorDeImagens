import imageCompression from "browser-image-compression";
import { ImageCompressionOptions } from "../types/ImageCompression";
import { useState } from "react";

export function useCompression() {
  const [response, setResponse] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Promise<any> | string | unknown | null>(null);

  const fetchNext = async (blob: Blob, options: ImageCompressionOptions, outputFileName: string) => {
    if (!blob || !options) {
      return;
    }
    const file = new File([blob], outputFileName, {
      type: "image/png",
    });
    try {
      setIsLoading(true);
      await imageCompression(file, options)
        .then((response) => {
          setError(null);
          setResponse(response);
        })
        .catch((err) => {
          setResponse(null);
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      setError(err);
      setResponse(null);
      setIsLoading(false);
    }
  };
  return {
    response,
    setResponse,
    isLoading,
    setIsLoading,
    error,
    setError,
    fetchNext,
  };
}