import React, { useState } from "react";
import "./styles.scss";
import { useAtom } from "jotai";
import { AtomFundoMenuCropped, AtomLogoCabCropped } from "../../../../store";
import { hoursMinutesToString } from "../../../../utils/utils";
// import { IoWifi, IoBatteryFullOutline } from "react-icons/io5";
import { IoIosWifi, IoIosBatteryFull } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import QrCodeSvg from "../../../../assets/svgComponents/QrCodeSvg";

import { exampleMenuItems as menuItems } from "../../../../utils/exampleMenuItems";
import IphoneBottomLine from "../../../IphoneBottomLine";

type Props = {
  // className: string
};

const MenuAberto = ({}: Props) => {
  const [fundoMenuImg] = useAtom(AtomFundoMenuCropped);
  const [logoCabImg] = useAtom(AtomLogoCabCropped);

  const [actualTime, setActualTime] = useState<string>(
    hoursMinutesToString(new Date())
  );

  return (
    <div className="screen-menu-aberto-container">
      <div className="screen-container">
        <div className="tw-grid tw-grid-cols-4 tw-grid-rows-1 tw-h-9/10">
          <div className="menu-container tw-col-span-3">
            <div className="menu-header-container">
              <div
                className="menu-header-background-image"
                style={{
                  backgroundImage: `url(${
                    fundoMenuImg ??
                    `${process.env.PUBLIC_URL}fundo_menu_sample.png`
                  })`,
                }}
              />
              <div className="menu-header-content">
                <span className="time">{actualTime ?? ""}</span>
                <div className="user-photo-container">
                  <img src={`${process.env.PUBLIC_URL}user-female.png`}></img>
                </div>
                <div className="user-name-container">
                  <span>LAIS</span>
                </div>
              </div>
            </div>
            <div className="menu-items-container">
              {menuItems.map((item) => (
                <div
                  key={`item ${item.id}`}
                  className={`item-container ${
                    item.isSelected ? "selected-item" : ""
                  }`}
                >
                  <div className="icon-container">{item.iconComponent}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="outside-container tw-col-span-1">
            <div className="notification-bar">
              <span>....</span>
              <IoIosWifi color="black" className="icon" size={15} />
              <IoIosBatteryFull color="black" size={20} className="icon" />
            </div>
            <div className="app-header">
              <div className="img-container">
                <img
                  src={
                    logoCabImg ?? `${process.env.PUBLIC_URL}logo_cab_sample.png`
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="screen-footer tw-h-1/10">
          <div className="footer-top">
            <div className="items-container">
              <TbGridDots size="1.7em" color="#747474" />
              <span>Meus Dados</span>
            </div>
            <div className="items-container">
              <QrCodeSvg size="1.7em" />
              <span>Carteirinha Digital</span>
            </div>
          </div>
          <div className="footer-bottom">
            <IphoneBottomLine />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAberto;
