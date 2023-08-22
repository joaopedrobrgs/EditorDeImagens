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
      <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1">
        <ImageEditor className="col-span-2"/>
        <ImageVisualization className="col-span-1"/>
      </div>
    </div>
  );
};

export default Home;
