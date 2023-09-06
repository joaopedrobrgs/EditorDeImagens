import { FiGithub } from "react-icons/fi";
import { MdOutlineAddToDrive } from "react-icons/md";
import "./styles.scss";
import Header from "../../components/Header";
import React, { useEffect } from "react";
import ImageEditor from "../../sections/ImageEditor";
import ImageVisualization from "../../sections/ImageVisualization";
import PageSettings from "../../sections/PageSettings";
import { useAtom } from "jotai";
import { AtomShowSettingsModal, AtomWindowWidth, AtomActualTime } from "../../store";
import ScreensSettings from "../../sections/ScreensSettings";
import { getWindowWidth, hoursMinutesToString } from "../../utils/utils";

type Props = {
  // children: JSX.Element;
};

const Home = ({}: Props) => {

  const [showSettingsModal] = useAtom(AtomShowSettingsModal);
  const [windowWidth, setWindowWidth] = useAtom(AtomWindowWidth)
  const [actualTime, setActualTime] = useAtom(AtomActualTime)

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(getWindowWidth());
    }
  
    window.addEventListener('resize', handleWindowResize);
  
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const getActualTime = setInterval(() => {
      setActualTime(hoursMinutesToString(new Date()))
    }, 1000)
    return () => {
      clearInterval(getActualTime);
    };
  }, []);

  return (
    // <div className="">
    <>
      <Header text="EDITOR DE IMAGENS APP SÓCIO" />
      <div className={`tw-grid ${windowWidth >= 1330 ? "tw-grid-cols-5" : "tw-grid-cols-8"} tw-grid-rows-1 home-container`}>
        <ImageEditor className={windowWidth >= 1330 ? "tw-col-span-2" : "tw-col-span-3"} />
        <ImageVisualization className={windowWidth >= 1330 ? "tw-col-span-2" : "tw-col-span-3"} />
        <ScreensSettings className={windowWidth >= 1330 ? "tw-col-span-1" : "tw-col-span-2"}  />
      </div>
      {showSettingsModal ? <PageSettings /> : <></>}
    </>
    // </div>
  );
};

export default Home;
