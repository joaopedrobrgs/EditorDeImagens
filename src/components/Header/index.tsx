import { FiGithub } from "react-icons/fi";
import { MdOutlineAddToDrive } from "react-icons/md";
import "./styles.scss";
import React from "react";
import { useAppContext } from "../../context";

type Props = {
  text: string;
  // children: JSX.Element;
};

const Header = ({ text }: Props) => {

  const {windowWidth} = useAppContext();

  return (
    <div className="header-container">
      <div className="header-left-container">
        <p>{text}</p>
      </div>
      <div className="header-right-container">
        <a
          href="https://github.com/joaopedrobrgs/editor-de-imagens"
          target="_blank"
          title="Repositório no Github"
        >
          <div className="icon-container">
            <FiGithub color="#2892CE" size={windowWidth >= 334 ? 22 : 17} />
          </div>
        </a>
        <a
          href="https://drive.google.com/drive/folders/1BCGZgXB10ecvARXUlo7m0L9L5PDk_qrg?usp=sharing"
          target="_blank"
          title="Pasta de arquivos no Drive"
        >
          <div className="icon-container">
            <MdOutlineAddToDrive color="#2892CE" size={windowWidth >= 334 ? 22 : 17} />
          </div>
        </a>
        <a
          href="https://gp.pedropaulo.dev/"
          target="_blank"
          title="Gerador de Prints"
        >
          <div className="geradorDePrints-icon-container">
            <p>GP</p>
          </div>
        </a>
        <a
          href="https://theapplaunchpad.com/"
          target="_blank"
          title="https://theapplaunchpad.com/"
        >
          <div className="applaunchpad-icon-container">
            <p>A</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Header;
