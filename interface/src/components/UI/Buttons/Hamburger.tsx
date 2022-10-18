import React from "react";

interface Props {
  onClick: () => void;
  isOpen: boolean;
}

const Hamburger: React.FC<Props> = ({ onClick, isOpen }) => {
  const genericHamburgerLine = `h-1 w-7 my-1 rounded-full bg-white transition ease transform duration-300`;

  return (
    <button
      className="right-0 z-20 m-3 flex fixed flex-col h-12 w-12 justify-center items-center group"
      onClick={onClick}
    >
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "rotate-45 translate-y-3 opacity-100 group-hover:opacity-50 bg-black"
            : "opacity-100 group-hover:opacity-50"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? "opacity-0 bg-black" : "opacity-100 group-hover:opacity-50"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "bg-black -rotate-45 -translate-y-3 opacity-100 group-hover:opacity-50"
            : "opacity-100 group-hover:opacity-50"
        }`}
      />
    </button>
  );
};

export default Hamburger;
