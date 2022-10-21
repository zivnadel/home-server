import React from "react";

import { Link } from "react-router-dom";

import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { MdLanguage } from "react-icons/md";
import Button from "./Buttons/Button";
import LangContext from "../../store/LangContext";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<Props> = ({ setIsOpen }) => {
  const langContext = React.useContext(LangContext);

  const changeLanguageHandler = () => {
    langContext.setIsEnglish((prev) => {
      if (prev) {
        localStorage.setItem("lang", "he");
      } else {
        localStorage.setItem("lang", "en");
      }
      return !prev;
    });
  };

  return (
    <menu
      className={`z-10 right-0 m-3 fixed w-36 h-48 bg-white rounded-md animate-slide-from-right`}
    >
      <ul className="mt-4 flex flex-col justify-center items-center h-full w-full">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <li
            className={`${
              langContext.isEnglish && "flex-row-reverse"
            } text-xl justify-between m-3 cursor-pointer hover:opacity-60 flex items-center my-2 font-semibold drop-shadow-md`}
          >
            {langContext.isEnglish ? "Home" : "בית"}
            <AiFillHome
              className={`text-primary text-2xl ${
                langContext.isEnglish ? "mr-2" : "ml-2"
              }`}
            />
          </li>
        </Link>
        <Link to="settings" onClick={() => setIsOpen(false)}>
          <li
            className={`${
              langContext.isEnglish && "flex-row-reverse"
            } text-xl justify-between m-3 cursor-pointer hover:opacity-60 flex items-center my-2 font-semibold drop-shadow-md`}
          >
            {langContext.isEnglish ? "Settings" : "הגדרות"}
            <AiFillSetting
              className={`text-secondary text-2xl ${
                langContext.isEnglish ? "mr-2" : "ml-2"
              }`}
            />
          </li>
        </Link>
        <Button
          onClick={changeLanguageHandler}
          className={`mt-2 flex items-center justify-center ${
            !langContext.isEnglish && "flex-row-reverse"
          }`}
        >
          {langContext?.isEnglish ? "עברית" : "English"}
          <MdLanguage
            className={`text-lg inline ${
              langContext.isEnglish ? "ml-1" : "mr-1"
            } text-yellow-600`}
          />
        </Button>
      </ul>
    </menu>
  );
};

export default Menu;
