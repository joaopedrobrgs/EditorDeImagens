import { FiGithub } from "react-icons/fi";
import { MdOutlineAddToDrive } from "react-icons/md";
import "./styles.scss";
import React from "react";


type Props = {
  text: string;
  // children: JSX.Element;
};

const Header = ({ text }: Props) => {
  return (
    <div className={`flex justify-between items-center bg-blue-200 p-5`}>
      <div className="bg-white px-3 py-1 rounded-sm">
        <p className="text-blue-200 font-bold text-[18px]">{text}</p>
      </div>
      <div className="flex flex-row">
        <a
          href="https://github.com/joaopedrobrgs/editor-de-imagens"
          target="_blank"
          title="Repositório no Github"
        >
          <div className="header-icon-container">
            <FiGithub color="#2892CE" size={22} />
          </div>
        </a>
        <a
          href="https://drive.google.com/drive/folders/1BCGZgXB10ecvARXUlo7m0L9L5PDk_qrg?usp=sharing"
          target="_blank"
          title="Pasta de arquivos no Drive"
        >
          <div className="header-icon-container ml-4">
            <MdOutlineAddToDrive color="#2892CE" size={22} />
          </div>
        </a>
        <a
          href="https://gp.pedropaulo.dev/"
          target="_blank"
          title="Gerador de Prints"
        >
          <div className="geradorDePrints-icon-container ml-4">
            <p>GP</p>
          </div>
        </a>
        <a
          href="https://theapplaunchpad.com/"
          target="_blank"
          title="https://theapplaunchpad.com/"
        >
          <div className="applaunchpad-icon-container ml-4">
            <p>A</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Header;
