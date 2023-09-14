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
  AtomFundoAppCompressChecked,
  AtomFundoMenuCompressChecked,
  AtomLogoAppCompressChecked,
  AtomLogoCabCompressChecked,
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
  // const [compressChecked] = useAtom(AtomCompressChecked);

  //Fundo app states:
  const [maxSizeFundoApp] = useAtom(AtomMaxSizeFundoApp);
  const [fundoAppCompressChecked] = useAtom(AtomFundoAppCompressChecked);
  const [fundoAppOptions] = useAtom(AtomFundoAppDomElementOptions);

  //Fundo menu states
  const [maxSizeFundoMenu] = useAtom(AtomMaxSizeFundoMenu);
  const [fundoMenuCompressChecked] = useAtom(AtomFundoMenuCompressChecked);
  const [fundoMenuOptions] = useAtom(AtomFundoMenuDomElementOptions);

  //Logo app states
  const [initialFileSizeLogoApp] = useAtom(AtomLogoAppInitialFileSize);
  const [logoAppCompressChecked] = useAtom(AtomLogoAppCompressChecked);
  const [compressionRateLogoApp] = useAtom(AtomLogoAppCompressionRate);
  const [logoAppOptions] = useAtom(AtomLogoAppDomElementOptions);

  //Logo cab states:

  const [initialFileSizeLogoCab] = useAtom(AtomLogoCabInitialFileSize);
  const [compressionRateLogoCab] = useAtom(AtomLogoCabCompressionRate);
  const [logoCabCompressChecked] = useAtom(AtomLogoCabCompressChecked);
  const [logoCabOptions] = useAtom(AtomLogoCabDomElementOptions);

  const {
    refFundoAppCropper,
    refFundoMenuCropper,
    refLogoAppCropper,
    refLogoCabCropper,
    refFundoAppDomElement,
    refFundoMenuDomElement,
    refLogoAppDomElement,
    refLogoCabDomElement,
  } = useAppContext();


  const {
    isCompressing,
    setIsCompressing,
    trigger: triggerDownloadZip,
  } = useDownloadZip();

  async function handleDownloadZip() {
    //Verificando se existem os arquivos cortados e colocando dentro de um array:
    const data: Array<DomElementReferenceOptionsType> = [];
    if (!!refFundoAppCropper.current) {
      // refFundoAppDomElement.current.name = "fundo-app";
      data.push({
        elementReference: refFundoAppDomElement.current,
        elementOptions: fundoAppOptions,
        elementOutputFileName: "fundo-app.png",
        compressChecked: fundoAppCompressChecked,
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
        compressChecked: fundoMenuCompressChecked,
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
        compressChecked: logoAppCompressChecked,
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
        compressChecked: logoCabCompressChecked,
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
    triggerDownloadZip(data);
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
