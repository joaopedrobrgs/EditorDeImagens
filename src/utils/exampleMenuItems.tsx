import { HiLockClosed, HiOutlineHome, HiUsers } from "react-icons/hi";
import { BsCashStack } from "react-icons/bs";
import {
  IoGridOutline,
  IoLogOut,
} from "react-icons/io5";
import { FaUser, FaUserFriends } from "react-icons/fa";

type MenuItemProps = {
  id: number,
  iconComponent: JSX.Element,
  text: string
  isSelected: boolean
}

const ICON_MENU_SIZE = 36;

export const exampleMenuItems: Array<MenuItemProps> = [
  {
    id: 0,
    iconComponent: <IoGridOutline size={ICON_MENU_SIZE} className="icon"  />,
    text: "Acesso rápido",
    isSelected: true
  },
  {
    id: 1,
    iconComponent: <HiOutlineHome size={ICON_MENU_SIZE} className="icon" />,
    text: "Institucional",
    isSelected: false
  },
  {
    id: 2,
    iconComponent: <BsCashStack size={ICON_MENU_SIZE} className="icon" />,
    text: "Débitos",
    isSelected: false
  },
  {
    id: 3,
    iconComponent: <FaUserFriends size={ICON_MENU_SIZE} className="icon" />,
    text: "Dependentes",
    isSelected: false
  },
  {
    id: 4,
    iconComponent: <FaUser size={ICON_MENU_SIZE} className="icon" />,
    text: "Meus dados",
    isSelected: false
  },
  {
    id: 5,
    iconComponent: <HiLockClosed size={ICON_MENU_SIZE} className="icon" />,
    text: "Trocar Senha",
    isSelected: false
  },
  {
    id: 7,
    iconComponent: <IoLogOut size={ICON_MENU_SIZE} className="icon" />,
    text: "Sair",
    isSelected: false
  },
]