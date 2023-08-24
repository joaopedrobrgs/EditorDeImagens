import { atom } from "jotai";

const AtomFundoAppOriginalSize = atom<string | null>(null);
const AtomFundoAppCropped = atom<any>(null);
const AtomLogoAppOriginalSize = atom<string | null>(null);
const AtomLogoAppCropped = atom<any>(null);
const AtomLogoCabOriginalSize = atom<string | null>(null);
const AtomLogoCabCropped = atom<any>(null);
const AtomFundoMenuOriginalSize = atom<string | null>(null);
const AtomFundoMenuCropped = atom<any>(null);

export {
  AtomFundoAppOriginalSize,
  AtomFundoAppCropped,
  AtomLogoAppOriginalSize,
  AtomLogoAppCropped,
  AtomLogoCabOriginalSize,
  AtomLogoCabCropped,
  AtomFundoMenuOriginalSize,
  AtomFundoMenuCropped
}