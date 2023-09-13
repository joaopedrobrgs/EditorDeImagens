import React from "react";
import "./styles.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FundoApp from "./Tabs/FundoApp";
import LogoApp from "./Tabs/LogoApp";
import LogoCab from "./Tabs/LogoCab";
import FundoMenu from "./Tabs/FundoMenu";
import ButtonDefault from "src/components/Button";
import DownloadIcon from "src/assets/svgComponents/DownloadIconSvg";
import { useAtom } from "jotai";
import {
  AtomWindowWidth,
  AtomFirstImageFullyLoaded,
  AtomCompressChecked,
  AtomCompressionOptions,
  AtomFundoAppDomElementOptions,
  AtomFundoMenuDomElementOptions,
  AtomLogoAppDomElementOptions,
  AtomLogoCabDomElementOptions,
} from "src/store";
import { calcFontSizeAccordingToWidth } from "src/utils/utils";
import { useAppContext } from "src/context";
import { useDownloadZip } from "src/hooks/useDownloadZip";
import { DomElementReferenceOptionsType } from "src/types/DomElement";

type Props = {
  className: string;
};

const ImageEditor = ({ className }: Props) => {
  const [windowWidth] = useAtom(AtomWindowWidth);
  const [imageFullyLoaded, setImageFullyLoaded] = useAtom(
    AtomFirstImageFullyLoaded
  );
  const [compressChecked] = useAtom(AtomCompressChecked);
  const {
    isCompressing,
    setIsCompressing,
    trigger: triggerDownloadZip,
  } = useDownloadZip();

  const {
    refFundoAppCropper,
    refFundoMenuCropper,
    refLogoAppCropper,
    refLogoCabCropper,
  } = useAppContext();

  const {
    refFundoAppDomElement,
    refFundoMenuDomElement,
    refLogoAppDomElement,
    refLogoCabDomElement,
  } = useAppContext();

  const [compressionOptions] = useAtom(AtomCompressionOptions);

  const [fundoAppOptions] = useAtom(AtomFundoAppDomElementOptions);
  const [fundoMenuOptions] = useAtom(AtomFundoMenuDomElementOptions);
  const [logoAppOptions] = useAtom(AtomLogoAppDomElementOptions);
  const [logoCabOptions] = useAtom(AtomLogoCabDomElementOptions);

  async function handleDownloadZip() {
    //Verificando se existem os arquivos cortados e colocando dentro de um array:
    const data: Array<DomElementReferenceOptionsType> = [];
    if (!!refFundoAppCropper.current) {
      // refFundoAppDomElement.current.name = "fundo-app";
      data.push({
        elementReference: refFundoAppDomElement.current,
        elementOptions: fundoAppOptions,
        elementOutputFileName: "fundo-app.png"
      });
    }
    if (!!refFundoMenuCropper.current) {
      // refFundoMenuDomElement.current.name = "fundo-menu";
      data.push({
        elementReference: refFundoMenuDomElement.current,
        elementOptions: fundoMenuOptions,
        elementOutputFileName: "fundo-menu.png"
      });
    }
    if (!!refLogoAppCropper.current) {
      // refLogoAppDomElement.current.name = "logo-app";
      data.push({
        elementReference: refLogoAppDomElement.current,
        elementOptions: logoAppOptions,
        elementOutputFileName: "logo-app.png"
      });
    }
    if (!!refLogoCabCropper.current) {
      // refLogoCabDomElement.current.name = "logo-cab";
      data.push({
        elementReference: refLogoCabDomElement.current,
        elementOptions: logoCabOptions,
        elementOutputFileName: "logo-cab.png"
      });
    }
    triggerDownloadZip(data, compressChecked, compressionOptions);
  }

  return (
    <div className={`${className} image-editor-container`}>
      <Tabs className="tabs-container" forceRenderTabPanel={false}>
        <TabList className="tab-list">
          <Tab className="tab" selectedClassName="selected-tab">
            fundo_app
          </Tab>
          <Tab className="tab" selectedClassName="selected-tab">
            logo_app
          </Tab>
          <Tab className="tab" selectedClassName="selected-tab">
            fundo_menu
          </Tab>
          <Tab className="tab" selectedClassName="selected-tab">
            logo_cab
          </Tab>
        </TabList>
        <TabPanel>
          <FundoApp />
        </TabPanel>
        <TabPanel>
          <LogoApp />
        </TabPanel>
        <TabPanel>
          <FundoMenu />
        </TabPanel>
        <TabPanel>
          <LogoCab />
        </TabPanel>
      </Tabs>
      <div
        className="btn-download-zip-container"
        style={{ fontSize: calcFontSizeAccordingToWidth(windowWidth) }}
      >
        <ButtonDefault
          // text="Baixar Todos .zip"
          text={isCompressing ? "Comprimindo..." : `Baixar Todos .zip`}
          bgColor="#0B608F"
          // alignSelf={windowWidth >= 1330 ? "self-start" : "center"}
          onClick={
            isCompressing || !imageFullyLoaded
              ? () => {
                  return;
                }
              : handleDownloadZip
          }
          className={`btn-download-zip ${
            isCompressing || !imageFullyLoaded ? "btn-disabled" : ""
          }`}
        >
          <DownloadIcon className="icon" />
        </ButtonDefault>
      </div>
    </div>
  );
};

export default ImageEditor;
