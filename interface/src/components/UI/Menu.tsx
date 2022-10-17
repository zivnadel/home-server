import React from "react";

import { Link } from "react-router-dom";

import { AiFillHome, AiFillSetting } from "react-icons/ai";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<Props> = ({ setIsOpen }) => {
  return (
    <menu className="animate-slide-from-right right-0 m-3 fixed w-36 h-40 bg-white/90 rounded-md">
      <ul className="mt-3 flex flex-col justify-center items-center h-full w-full">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <li className="text-xl cursor-pointer hover:opacity-60 flex items-center justify-between m-3 my-2 font-semibold drop-shadow-md">
            בית
            <AiFillHome className="text-primary text-2xl ml-2" />
          </li>
        </Link>
        <Link to="settings" onClick={() => setIsOpen(false)}>
          <li className="text-xl justify-between m-3 cursor-pointer hover:opacity-60 flex items-center my-2 font-semibold drop-shadow-md">
            הגדרות
            <AiFillSetting className="text-secondary text-2xl ml-2" />
          </li>
        </Link>
      </ul>
    </menu>
  );
};

export default Menu;
