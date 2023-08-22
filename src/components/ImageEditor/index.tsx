import React from "react";
import "./styles.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FundoApp from "./FundoApp";
import LogoApp from "./LogoApp";
import LogoCab from "./LogoCab";
import FundoMenu from "./FundoMenu";

type Props = {
  className: string;
};

const ImageEditor = ({ className }: Props) => {
  return (
    <div className={`${className}`}>
      <Tabs className="my-5 mx-4">
        <TabList className="tablist">
          <Tab className="tab" selectedClassName="selected-tab">
            fundo_app
          </Tab>
          <Tab className="tab" selectedClassName="selected-tab">
            logo_app
          </Tab>
          <Tab className="tab" selectedClassName="selected-tab">
            logo_cab
          </Tab>
          <Tab className="tab" selectedClassName="selected-tab">
            fundo_menu
          </Tab>
        </TabList>
        <TabPanel>
          <FundoApp />
        </TabPanel>
        <TabPanel>
          <LogoApp />
        </TabPanel>
        <TabPanel>
          <LogoCab />
        </TabPanel>
        <TabPanel>
          <FundoMenu />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ImageEditor;
