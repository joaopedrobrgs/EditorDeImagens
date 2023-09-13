import { Options } from "dom-to-image";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ImageCompressionOptions } from "src/types/ImageCompression";
import {
  getWindowHeight,
  getWindowWidth,
  hoursMinutesToString,
} from "src/utils/utils";

const AtomFirstImageFullyLoaded = atom<boolean>(false);

//ActualTime Atom:
const AtomActualTime = atom<string>(hoursMinutesToString(new Date()));
// const AtomActualTime = atom<Date>(new Date());

//Window Atoms:
const AtomWindowWidth = atom<number>(getWindowWidth());
const AtomWindowHeight = atom<number>(getWindowHeight());

//Components Atoms:
const AtomShowSettingsModal = atom<boolean>(false);

//Image Atoms:
const AtomFundoAppOriginalSize = atom<string | null>(null);
const AtomFundoAppCropped = atom<any>(null);
const AtomLogoAppOriginalSize = atom<string | null>(null);
const AtomLogoAppCropped = atom<any>(null);
const AtomLogoCabOriginalSize = atom<string | null>(null);
const AtomLogoCabCropped = atom<any>(null);
const AtomFundoMenuOriginalSize = atom<string | null>(null);
const AtomFundoMenuCropped = atom<any>(null);

//Style Atoms:
const AtomBtnTextColor = atom<string>("#FFFFFE");
const AtomBtnBgColor = atom<string>("#ED3237");
const AtomBoxesOpacity = atom<number>(70);
const AtomFundoAppOpacity = atom<number>(90);
const AtomFundoAppBlur = atom<number>(1);
const AtomFundoMenuOpacity = atom<number>(90);
const AtomFundoMenuBlur = atom<number>(1);

//Stored Atoms
const getSliderChecked = (): boolean => {
  const storedState = localStorage.getItem("@sliderChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
const AtomSliderChecked = atomWithStorage<boolean>(
  "@sliderChecked",
  getSliderChecked()
);

const getOnTouchChecked = (): boolean => {
  const storedState = localStorage.getItem("@onTouchChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
const AtomOnTouchChecked = atomWithStorage<boolean>(
  "@onTouchChecked",
  getOnTouchChecked()
);

const getOnWheelChecked = (): boolean => {
  const storedState = localStorage.getItem("@onWheelChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
const AtomOnWheelChecked = atomWithStorage<boolean>(
  "@onWheelChecked",
  getOnWheelChecked()
);

//*Compress Checked:
const getCompressChecked = (): boolean => {
  const storedState = localStorage.getItem("@compressChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
const AtomCompressChecked = atomWithStorage<boolean>(
  "@compressChecked",
  getCompressChecked()
);
// const AtomCompressChecked = atom<boolean>(true);

//*Max size of image:
const getMaxSizeOfImage = (): number => {
  const storedState = localStorage.getItem("@maxSizeOfImage");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return 200;
};
const AtomMaxSizeOfImage = atomWithStorage<number>(
  "@maxSizeOfImage",
  getMaxSizeOfImage()
);

//Compression Options Atom:
const AtomCompressionOptions = atom<ImageCompressionOptions>({
  maxSizeMB: (getMaxSizeOfImage() - 10) / 1000,
  fileType: "image/png",
  alwaysKeepResolution: true,
  initialQuality: 1,
});

//Dom Element Options Atoms:
const AtomFundoAppDomElementOptions = atom<Options>({
  width: 500,
  height: 900,
  style: {
    margin: 0,
    transform: "none",
    filter: "opacity(1)",
  },
});
const AtomFundoMenuDomElementOptions = atom<Options>({
  width: 400,
  height: 200,
  style: {
    margin: 0,
    transform: "none",
    filter: "opacity(1)",
  },
});
const AtomLogoAppDomElementOptions = atom<Options>({
  width: 450,
  height: 250,
  style: {
    margin: 0,
    transform: "none",
  },
});
const AtomLogoCabDomElementOptions = atom<Options>({
  width: 130,
  height: 130,
  style: {
    margin: 0,
    transform: "none",
  },
});

export {
  AtomShowSettingsModal,
  AtomFundoAppOriginalSize,
  AtomFundoAppCropped,
  AtomLogoAppOriginalSize,
  AtomLogoAppCropped,
  AtomLogoCabOriginalSize,
  AtomLogoCabCropped,
  AtomFundoMenuOriginalSize,
  AtomFundoMenuCropped,
  AtomBtnTextColor,
  AtomBtnBgColor,
  AtomBoxesOpacity,
  AtomFundoAppOpacity,
  AtomFundoAppBlur,
  AtomFundoMenuOpacity,
  AtomFundoMenuBlur,
  AtomSliderChecked,
  AtomOnTouchChecked,
  AtomOnWheelChecked,
  AtomWindowWidth,
  AtomActualTime,
  AtomFirstImageFullyLoaded,
  AtomCompressChecked,
  AtomWindowHeight,
  AtomCompressionOptions,
  AtomFundoAppDomElementOptions,
  AtomFundoMenuDomElementOptions,
  AtomLogoAppDomElementOptions,
  AtomLogoCabDomElementOptions,
  AtomMaxSizeOfImage,
};
