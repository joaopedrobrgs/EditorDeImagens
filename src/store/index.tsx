import { atom } from "jotai";

const AtomFundoApp = atom<any>(null);
const AtomFundoAppNoCut = atom<string | null>(null);
const AtomLogoApp = atom<any>(null);
const AtomLogoCab = atom<any>(null);
const AtomFundoMenu = atom<any>(null);

export {
  AtomFundoApp,
  AtomFundoAppNoCut,
  AtomLogoApp,
  AtomLogoCab,
  AtomFundoMenu
}