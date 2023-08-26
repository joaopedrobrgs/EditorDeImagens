import { FiGithub } from "react-icons/fi";
import { MdOutlineAddToDrive } from "react-icons/md";
import "./styles.scss";
import Header from "../../components/Header";
import React from "react";
import ImageEditor from "../../components/ImageEditor";
import ImageVisualization from "../../components/ImageVisualization";
import PageSettings from "../../components/PageSettings";
import { useAtom } from "jotai";
import { AtomShowSettingsModal } from "../../store";

type Props = {
  // children: JSX.Element;
};

const Home = ({}: Props) => {
  const [showSettingsModal] = useAtom(AtomShowSettingsModal);

  return (
    <div className="">
      <Header text="EDITOR IMAGENS APP SÓCIO" />
      <div className="tw-grid tw-grid-cols-2 tw-grid-rows-1 home-container">
        <ImageEditor className="tw-col-span-1" />
        <ImageVisualization className="tw-col-span-1" />
      </div>
      {showSettingsModal ? <PageSettings /> : <></>}
    </div>
  );
};

export default Home;
