import React, { useState } from "react";
import "./styles.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FundoApp from "./Tabs/FundoApp";
import LogoApp from "./Tabs/LogoApp";
import LogoCab from "./Tabs/LogoCab";
import FundoMenu from "./Tabs/FundoMenu";
import ButtonDefault from "./DefaultComponents/ButtonDefault";
import DownloadIcon from "../../assets/svgComponents/DownloadIconSvg";
import { useAtom } from "jotai";
import {
  AtomWindowWidth,
  AtomFirstImageFullyLoaded,
  AtomCompressChecked,
} from "../../store";
import { calcFontSizeAccordingToWidth, downloadZip } from "../../utils/utils";
import { useAppContext } from "../../context";
import { saveAs } from "file-saver";
import { ReactCropperElement } from "react-cropper";

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
    downloadZip(data, compressChecked);
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
          text="Baixar Todos .zip"
          bgColor="#0B608F"
          // alignSelf={windowWidth >= 1330 ? "self-start" : "center"}
          onClick={
            imageFullyLoaded
              ? handleDownloadZip
              : () => {
                  return;
                }
          }
          className="btn-download-zip"
        >
          <DownloadIcon className="icon" />
        </ButtonDefault>
      </div>
    </div>
  );
};

export default ImageEditor;
