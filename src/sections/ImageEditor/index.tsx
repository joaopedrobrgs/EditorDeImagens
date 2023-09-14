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
  AtomFundoAppDomElementOptions,
  AtomFundoMenuDomElementOptions,
  AtomLogoAppDomElementOptions,
  AtomLogoCabDomElementOptions,
  AtomMaxSizeFundoApp,
  AtomMaxSizeFundoMenu,
  AtomLogoAppInitialFileSize,
  AtomLogoCabInitialFileSize,
  AtomLogoAppCompressionRate,
  AtomLogoCabCompressionRate,
} from "src/store";
import {
  bytesToMbs,
  calcFontSizeAccordingToWidth,
  maxSizeOfImageValidator,
  percentageToDecimal,
} from "src/utils/utils";
import { useAppContext } from "src/context";
import { useDownloadZip } from "src/hooks/useDownloadZip";
import { DomElementReferenceOptionsType } from "src/types/DomElement";
import { ImageCompressionOptions } from "src/types/ImageCompression";

type Props = {
  className: string;
};

const ImageEditor = ({ className }: Props) => {
  const [windowWidth] = useAtom(AtomWindowWidth);
  const [imageFullyLoaded, setImageFullyLoaded] = useAtom(
    AtomFirstImageFullyLoaded
  );
  const [compressChecked] = useAtom(AtomCompressChecked);
  const [maxSizeFundoApp] = useAtom(AtomMaxSizeFundoApp);
  const [maxSizeFundoMenu] = useAtom(AtomMaxSizeFundoMenu);
  const [initialFileSizeLogoApp] = useAtom(AtomLogoAppInitialFileSize);
  const [compressionRateLogoApp] = useAtom(AtomLogoAppCompressionRate);
  const [initialFileSizeLogoCab] = useAtom(AtomLogoCabInitialFileSize);
  const [compressionRateLogoCab] = useAtom(AtomLogoCabCompressionRate);

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
        elementOutputFileName: "fundo-app.png",
        compressionOptions: {
          maxSizeMB: maxSizeOfImageValidator(maxSizeFundoApp),
          fileType: "image/png",
          alwaysKeepResolution: true,
          initialQuality: 1,
        },
      });
    }
    if (!!refFundoMenuCropper.current) {
      // refFundoMenuDomElement.current.name = "fundo-menu";
      data.push({
        elementReference: refFundoMenuDomElement.current,
        elementOptions: fundoMenuOptions,
        elementOutputFileName: "fundo-menu.png",
        compressionOptions: {
          maxSizeMB: maxSizeOfImageValidator(maxSizeFundoMenu),
          fileType: "image/png",
          alwaysKeepResolution: true,
          initialQuality: 1,
        },
      });
    }
    if (!!refLogoAppCropper.current) {
      // refLogoAppDomElement.current.name = "logo-app";
      data.push({
        elementReference: refLogoAppDomElement.current,
        elementOptions: logoAppOptions,
        elementOutputFileName: "logo-app.png",
        compressionOptions: {
          // maxSizeMB: initialFileSizeLogoApp ? bytesToMbs(initialFileSizeLogoApp) / 2 : 0.002,
          maxSizeMB: initialFileSizeLogoApp
            ? bytesToMbs(initialFileSizeLogoApp) -
              bytesToMbs(initialFileSizeLogoApp) *
                percentageToDecimal(compressionRateLogoApp)
            : 0.002,
          fileType: "image/png",
          alwaysKeepResolution: true,
          initialQuality: 1,
        },
      });
    }
    if (!!refLogoCabCropper.current) {
      // refLogoCabDomElement.current.name = "logo-cab";
      data.push({
        elementReference: refLogoCabDomElement.current,
        elementOptions: logoCabOptions,
        elementOutputFileName: "logo-cab.png",
        compressionOptions: {
          // maxSizeMB: initialFileSizeLogoCab
          //   ? bytesToMbs(initialFileSizeLogoCab) / 2
          //   : 0.002,
          maxSizeMB: initialFileSizeLogoCab
          ? bytesToMbs(initialFileSizeLogoCab) -
            bytesToMbs(initialFileSizeLogoCab) *
              percentageToDecimal(compressionRateLogoCab)
          : 0.002,
          fileType: "image/png",
          alwaysKeepResolution: true,
          initialQuality: 1,
        },
      });
    }
    // const compressionOptions: ImageCompressionOptions = {
    //   maxSizeMB: maxSizeOfImageValidator(maxSizeOfImage),
    //   fileType: "image/png",
    //   alwaysKeepResolution: true,
    //   initialQuality: 1,
    // };
    triggerDownloadZip(data, compressChecked);
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
