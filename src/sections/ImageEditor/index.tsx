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
  sliderNumberToPercentageInDecimalForm,
} from "src/utils/utils";
import { useAppContext } from "src/context";
import { useDownloadZip } from "src/hooks/useDownloadZip";
import { DomElementReferenceOptionsType } from "src/types/DomElement";
import { ImageCompressionOptions } from "src/types/ImageCompression";
import domtoimage from "dom-to-image";

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
  const [logoAppCompressChecked] = useAtom(AtomLogoAppCompressChecked);
  const [compressionRateLogoApp] = useAtom(AtomLogoAppCompressionRate);
  const [logoAppOptions] = useAtom(AtomLogoAppDomElementOptions);

  //Logo cab states:

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
      let blob: any = await new Promise((resolve) =>
        domtoimage
          .toBlob(refFundoAppDomElement.current, fundoAppOptions)
          .then(resolve)
      );
      data.push({
        blob,
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
      let blob: any = await new Promise((resolve) =>
        domtoimage
          .toBlob(refFundoMenuDomElement.current, fundoMenuOptions)
          .then(resolve)
      );
      data.push({
        blob,
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
      let blob: any = await new Promise((resolve) =>
        domtoimage
          .toBlob(refLogoAppDomElement.current, logoAppOptions)
          .then(resolve)
      );
      let maxSizeMB =
        bytesToMbs(blob.size) -
        bytesToMbs(blob.size) *
          sliderNumberToPercentageInDecimalForm(compressionRateLogoApp);
      const compressionOptions: ImageCompressionOptions = {
        maxSizeMB: maxSizeMB,
        fileType: "image/png",
        alwaysKeepResolution: true,
        initialQuality: 1,
      };
      data.push({
        blob,
        elementOutputFileName: "logo-app.png",
        compressChecked: logoAppCompressChecked,
        compressionOptions: compressionOptions,
      });
    }
    if (!!refLogoCabCropper.current) {
      let blob: any = await new Promise((resolve) =>
        domtoimage
          .toBlob(refLogoCabDomElement.current, logoCabOptions)
          .then(resolve)
      );
      let maxSizeMB =
        bytesToMbs(blob.size) -
        bytesToMbs(blob.size) *
          sliderNumberToPercentageInDecimalForm(compressionRateLogoCab);
      const compressionOptions: ImageCompressionOptions = {
        maxSizeMB: maxSizeMB,
        fileType: "image/png",
        alwaysKeepResolution: true,
        initialQuality: 1,
      };
      data.push({
        blob,
        elementOutputFileName: "logo-cab.png",
        compressChecked: logoCabCompressChecked,
        compressionOptions: compressionOptions,
      });
    }
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
          // bgColor="#0B608F"
          // alignSelf={windowWidth >= 1330 ? "self-start" : "center"}
          style={{
            backgroundColor: "#0B608F"
          }}
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
