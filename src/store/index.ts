import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils"

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

//Switch Atoms
const AtomSliderChecked = atomWithStorage<boolean>("@issliderChecked", true);
const AtomOnTouchChecked = atomWithStorage<boolean>("@isonTouchChecked", true);
const AtomOnWheelChecked = atomWithStorage<boolean>("@isonWheelChecked", true);

export {
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
};
