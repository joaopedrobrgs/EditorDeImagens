import { FiGithub } from "react-icons/fi";
import { MdOutlineAddToDrive } from "react-icons/md";
import "./styles.scss";
import Header from "../../components/Header";
import React, { useEffect } from "react";
import ImageEditor from "../../components/ImageEditor";
import ImageVisualization from "../../components/ImageVisualization";
import PageSettings from "../../components/PageSettings";
import { useAtom } from "jotai";
import { AtomShowSettingsModal, AtomWindowWidth } from "../../store";
import ScreensSettings from "../../components/ScreensSettings";
import { getWindowWidth } from "../../utils/utils";

type Props = {
  // children: JSX.Element;
};

const Home = ({}: Props) => {

  const [showSettingsModal] = useAtom(AtomShowSettingsModal);
  const [windowWidth, setWindowWidth] = useAtom(AtomWindowWidth)

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(getWindowWidth());
    }
  
    window.addEventListener('resize', handleWindowResize);
  
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    // <div className="">
    <>
      <Header text="EDITOR DE IMAGENS APP SÓCIO" />
      <div className="tw-grid tw-grid-cols-5 tw-grid-rows-1 home-container">
        <ImageEditor className="tw-col-span-2" />
        <ImageVisualization className="tw-col-span-2" />
        <ScreensSettings className="tw-col-span-1" />
      </div>
      {showSettingsModal ? <PageSettings /> : <></>}
    </>
    // </div>
  );
};

export default Home;
