import React, { useState } from "react";
import "./styles.scss";
import { useAtom } from "jotai";
import { AtomFundoMenu, AtomLogoCab } from "../../../../store";
import { hoursMinutesToString } from "../../../../utils/dateFormatter";

import { exampleMenuItems as menuItems } from "../../../../utils/exampleMenuItems";

type Props = {
  // className: string
};

const MenuAberto = ({}: Props) => {
  const [fundoMenuImg] = useAtom(AtomFundoMenu);
  const [logoCabImg] = useAtom(AtomLogoCab);

  const [actualTime, setActualTime] = useState<string>(
    hoursMinutesToString(new Date())
  );

  return (
    <div className="tw-my-5 tw-mr-2">
      <div className="screen-container">
        <div className="tw-grid tw-grid-cols-6 tw-grid-rows-1">
          <div className="menu-container tw-col-span-4">
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
          <div className="outside-container tw-col-span-2">
            <div className="notification-bar"></div>
            <div className="app-header">
              <img
                src={
                  logoCabImg ?? `${process.env.PUBLIC_URL}logo_cab_sample.png`
                }
              />
            </div>
          </div>
        </div>
        <div className="screen-footer">
          <div className="personal-data"></div>
          <div className="digital-card"></div>
        </div>
      </div>
    </div>
  );
};

export default MenuAberto;
