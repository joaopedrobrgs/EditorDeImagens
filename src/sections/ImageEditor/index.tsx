import React, {useEffect} from "react";
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
  AtomMaxSizeOfImage,
} from "src/store";
import { calcFontSizeAccordingToWidth, downloadZip } from "src/utils/utils";
import { useAppContext } from "src/context";
import { ReactCropperElement } from "react-cropper";
import { useDownloadZip } from "src/hooks/useDownloadZip";
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
  const [maxSizeOfImage] = useAtom(AtomMaxSizeOfImage);
  const { isCompressing, setIsCompressing ,trigger: triggerDownloadZip } =
    useDownloadZip();

  const {
    refFundoAppCropper,
    refFundoMenuCropper,
    refLogoAppCropper,
    refLogoCabCropper,
  } = useAppContext();

  async function handleDownloadZip() {
    //Verificando se existem os arquivos cortados e colocando dentro de um array:
    const data: Array<ReactCropperElement> = [];
    if (!!refFundoAppCropper.current) {
      refFundoAppCropper.current.name = "fundo-app";
      data.push(refFundoAppCropper.current);
    }
    if (!!refFundoMenuCropper.current) {
      refFundoMenuCropper.current.name = "fundo-menu";
      data.push(refFundoMenuCropper.current);
    }
    if (!!refLogoAppCropper.current) {
      refLogoAppCropper.current.name = "logo-app";
      data.push(refLogoAppCropper.current);
    }
    if (!!refLogoCabCropper.current) {
      refLogoCabCropper.current.name = "logo-cab";
      data.push(refLogoCabCropper.current);
    }
    const options: ImageCompressionOptions = {
      maxSizeMB: maxSizeOfImage / 1000,
      fileType: "image/png",
    };
    triggerDownloadZip(data, compressChecked, options);
  }

  useEffect(()=>{
    console.log("Is loading? ", isCompressing)
  }, [isCompressing])

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
          className={`btn-download-zip ${isCompressing || !imageFullyLoaded ? "btn-disabled" : ""}` }
        >
          <DownloadIcon className="icon" />
        </ButtonDefault>
      </div>
    </div>
  );
};

export default ImageEditor;
