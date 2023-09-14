import { Options } from "dom-to-image";
import { ImageCompressionOptions } from "./ImageCompression";

export type DomElementReferenceOptionsType = {
  elementReference: Node;
  elementOptions: Options;
  elementOutputFileName: string;
  compressionOptions: ImageCompressionOptions
};