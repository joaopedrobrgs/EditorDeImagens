import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { getWindowWidth, hoursMinutesToString } from "../utils/utils";

const AtomFirstImageFullyLoaded = atom<boolean>(false);

//ActualTime Atom:
const AtomActualTime = atom<string>(hoursMinutesToString(new Date()));
// const AtomActualTime = atom<Date>(new Date());

//WindowWidth Atom:
const AtomWindowWidth = atom<number>(getWindowWidth());

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
const AtomBoxesOpacity = atom<number>(60);
const AtomFundoAppOpacity = atom<number>(80);
const AtomFundoAppBlur = atom<number>(2);
const AtomFundoMenuOpacity = atom<number>(80);
const AtomFundoMenuBlur = atom<number>(2);

//Stored Atoms
const getSliderChecked = (): boolean => {
  const storedState = localStorage.getItem("@sliderChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
const AtomSliderChecked = atomWithStorage<boolean>("@sliderChecked", getSliderChecked());

const getOnTouchChecked = (): boolean => {
  const storedState = localStorage.getItem("@onTouchChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
const AtomOnTouchChecked = atomWithStorage<boolean>("@onTouchChecked", getOnTouchChecked());

const getOnWheelChecked = (): boolean => {
  const storedState = localStorage.getItem("@onWheelChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return true;
};
const AtomOnWheelChecked = atomWithStorage<boolean>("@onWheelChecked", getOnWheelChecked());

const getCompressChecked = (): boolean => {
  const storedState = localStorage.getItem("@compressChecked");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return false;
};
const AtomCompressChecked = atomWithStorage<boolean>("@compressChecked", getCompressChecked());

const getMaxSizeOfImage = (): number => {
  const storedState = localStorage.getItem("@maxSizeOfImage");
  if (storedState) {
    return JSON.parse(storedState);
  }
  return 400;
};
const AtomMaxSizeOfImage = atomWithStorage<number>("@maxSizeOfImage", getMaxSizeOfImage());

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
  AtomMaxSizeOfImage
};
