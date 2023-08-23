import { FiGithub } from "react-icons/fi";
import { MdOutlineAddToDrive } from "react-icons/md";
import "./styles.scss";
import Header from "../../components/Header";
import React from "react";
import ImageEditor from "../../components/ImageEditor";
import ImageVisualization from "../../components/ImageVisualization";

type Props = {
  // children: JSX.Element;
};

const Home = ({}: Props) => {
  return (
    <div className="">
      <Header text="EDITOR IMAGENS APP SÓCIO" />
      <div className="tw-grid tw-grid-flow-row-dense tw-grid-cols-5 tw-grid-rows-1">
        <ImageEditor className="tw-col-span-3"/>
        <ImageVisualization className="tw-col-span-2"/>
      </div>
    </div>
  );
};

export default Home;
