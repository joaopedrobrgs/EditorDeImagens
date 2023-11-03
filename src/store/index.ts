import { Options } from "dom-to-image";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ImageCompressionOptions } from "src/types/ImageCompression";
import {
  getWindowHeight,
  getWindowWidth,
  hoursMinutesToString,
} from "src/utils/utils";

export const AtomFirstImageFullyLoaded = atom<boolean>(false);

//ActualTime Atom:
export const AtomActualTime = atom<string>(hoursMinutesToString(new Date()));
// export const AtomActualTime = atom<Date>(new Date());

//Window Atoms:
export const AtomWindowWidth = atom<number>(getWindowWidth());
export const AtomWindowHeight = atom<number>(getWindowHeight());

//Components Atoms:
export const AtomShowSettingsModal = atom<boolean>(false);

//Image Atoms:
export const AtomFundoAppOriginalSize = atom<string | null>(null);
export const AtomFundoAppCropped = atom<any>(null);
export const AtomLogoAppOriginalSize = atom<string | null>(null);
export const AtomLogoAppCropped = atom<any>(null);
export const AtomLogoCabOriginalSize = atom<string | null>(null);
export const AtomLogoCabCropped = atom<any>(null);
export const AtomFundoMenuOriginalSize = atom<string | null>(null);
export const AtomFundoMenuCropped = atom<any>(null);

//Style Atoms:
export const AtomBtnTextColor = atom<string>("#FFFFFE");
export const AtomBtnBgColor = atom<string>("#ED3237");
export const AtomBoxesOpacity = atom<number>(70);
export const AtomBoxesTextColor = atom<string>('#000000');
export const AtomBoxesBgColor = atom<string>('#ffffff');
export const AtomFundoAppOpacity = atom<number>(90);
export const AtomFundoAppBlur = atom<number>(1);
export const AtomFundoMenuOpacity = atom<number>(90);
export const AtomFundoMenuBlur = atom<number>(1);
export const AtomLogoAppIsBorderRounded = atom<boolean>(false);

//Stored Atoms
export const getSliderChecked = (): boolean => {
  const storedState = localStorage.getItem("@sliderChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
export const AtomSliderChecked = atomWithStorage<boolean>(
  "@sliderChecked",
  getSliderChecked()
);

export const getOnTouchChecked = (): boolean => {
  const storedState = localStorage.getItem("@onTouchChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
export const AtomOnTouchChecked = atomWithStorage<boolean>(
  "@onTouchChecked",
  getOnTouchChecked()
);

export const getOnWheelChecked = (): boolean => {
  const storedState = localStorage.getItem("@onWheelChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
export const AtomOnWheelChecked = atomWithStorage<boolean>(
  "@onWheelChecked",
  getOnWheelChecked()
);

export const getCompressChecked = (): boolean => {
  const storedState = localStorage.getItem("@compressChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
export const AtomCompressChecked = atomWithStorage<boolean>(
  "@compressChecked",
  getCompressChecked()
);

//Fundo app compression atoms:
export const getCompressFundoAppChecked = (): boolean => {
  const storedState = localStorage.getItem("@compressFundoAppChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
export const AtomFundoAppCompressChecked = atomWithStorage<boolean>(
  "@compressFundoAppChecked",
  getCompressFundoAppChecked()
);

export const getMaxSizeOfImageFundoApp = (): number => {
  const storedState = localStorage.getItem("@maxSizeFundoApp");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return 200;
};
export const AtomMaxSizeFundoApp = atomWithStorage<number>(
  "@maxSizeFundoApp",
  getMaxSizeOfImageFundoApp()
);

//Fundo menu compression atoms:
export const getCompressFundoMenuChecked = (): boolean => {
  const storedState = localStorage.getItem("@compressFundoMenuChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
export const AtomFundoMenuCompressChecked = atomWithStorage<boolean>(
  "@compressFundoMenuChecked",
  getCompressFundoMenuChecked()
);

export const getMaxSizeOfImageFundoMenu = (): number => {
  const storedState = localStorage.getItem("@maxSizeFundoMenu");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return 50;
};
export const AtomMaxSizeFundoMenu = atomWithStorage<number>(
  "@maxSizeFundoMenu",
  getMaxSizeOfImageFundoMenu()
);

//Logo App Compression atoms:
export const getCompressLogoAppChecked = (): boolean => {
  const storedState = localStorage.getItem("@compressLogoAppChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
export const AtomLogoAppCompressChecked = atomWithStorage<boolean>(
  "@compressLogoAppChecked",
  getCompressLogoAppChecked()
);

export const getLogoAppCompressionRate = (): number => {
  const storedState = localStorage.getItem("@compressionRateLogoApp");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return 3;
};
export const AtomLogoAppCompressionRate = atomWithStorage<number>(
  "@compressionRateLogoApp",
  getLogoAppCompressionRate()
);

// Logo Cab Compression Atoms:
export const getCompressLogoCabChecked = (): boolean => {
  const storedState = localStorage.getItem("@compressLogoCabChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
export const AtomLogoCabCompressChecked = atomWithStorage<boolean>(
  "@compressLogoCabChecked",
  getCompressLogoCabChecked()
);
export const getLogoCabCompressionRate = (): number => {
  const storedState = localStorage.getItem("@compressionRateLogoCab");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return 3;
};
export const AtomLogoCabCompressionRate = atomWithStorage<number>(
  "@compressionRateLogoCab",
  getLogoCabCompressionRate()
);

//Compression Options Atom:
// export const AtomCompressionOptions = atom<ImageCompressionOptions>({
//   maxSizeMB: (getMaxSizeOfImage() - 10) / 1000,
//   fileType: "image/png",
//   alwaysKeepResolution: true,
//   initialQuality: 1,
// });

//Dom Element Options Atoms:
export const AtomFundoAppDomElementOptions = atom<Options>({
  width: 500,
  height: 900,
  style: {
    margin: 0,
    transform: "none",
    filter: "opacity(1)",
  },
});
export const AtomFundoMenuDomElementOptions = atom<Options>({
  width: 400,
  height: 200,
  style: {
    margin: 0,
    transform: "none",
    filter: "opacity(1)",
  },
});
export const AtomLogoAppDomElementOptions = atom<Options>({
  width: 450,
  height: 250,
  style: {
    margin: 0,
    transform: "none",
  },
});
export const AtomLogoCabDomElementOptions = atom<Options>({
  width: 130,
  height: 130,
  style: {
    margin: 0,
    transform: "none",
  },
});
