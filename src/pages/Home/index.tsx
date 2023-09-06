import { FiGithub } from "react-icons/fi";
import { MdOutlineAddToDrive } from "react-icons/md";
import "./styles.scss";
import Header from "../../components/Header";
import React, { useEffect } from "react";
import ImageEditor from "../../sections/ImageEditor";
import ImageVisualization from "../../sections/ImageVisualization";
import PageSettings from "../../sections/PageSettings";
import { useAtom } from "jotai";
import {
  AtomShowSettingsModal,
  AtomWindowWidth,
  AtomActualTime,
  AtomWindowHeight
} from "../../store";
import ScreensSettings from "../../sections/ScreensSettings";
import { getWindowHeight, getWindowWidth, hoursMinutesToString } from "../../utils/utils";
import BottomLine from "../../components/BottomLine";

type Props = {
  // children: JSX.Element;
};

const Home = ({}: Props) => {
  const [showSettingsModal] = useAtom(AtomShowSettingsModal);
  const [windowWidth, setWindowWidth] = useAtom(AtomWindowWidth);
  const [windowHeight, setWindowHeight] = useAtom(AtomWindowHeight);
  const [actualTime, setActualTime] = useAtom(AtomActualTime);

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(getWindowWidth());
      setWindowHeight(getWindowHeight());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // useEffect(()=>{
  //   console.log("Window width: ", windowWidth)
  //   console.log("Window height: ", windowHeight)
  // }, [windowWidth, windowHeight])

  useEffect(() => {
    const getActualTime = setInterval(() => {
      setActualTime(hoursMinutesToString(new Date()));
    }, 1000);
    return () => {
      clearInterval(getActualTime);
    };
  }, []);

  return (
    <>
      <div className="page-container">
        <div>
          <Header text="EDITOR DE IMAGENS APP SÓCIO" />
          <div
            className={`tw-grid ${
              windowWidth >= 1330 ? "tw-grid-cols-5" : "tw-grid-cols-8"
            } tw-grid-rows-1 home-container`}
          >
            <ImageEditor
              className={
                windowWidth >= 1330 ? "tw-col-span-2" : "tw-col-span-3"
              }
            />
            <ImageVisualization
              className={
                windowWidth >= 1330 ? "tw-col-span-2" : "tw-col-span-3"
              }
            />
            <ScreensSettings
              className={
                windowWidth >= 1330 ? "tw-col-span-1" : "tw-col-span-2"
              }
            />
          </div>
        </div>
        <BottomLine />
      </div>
      {showSettingsModal ? <PageSettings /> : <></>}
    </>
  );
};

export default Home;
