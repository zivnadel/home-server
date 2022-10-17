import React from "react";
import Hamburger from "./UI/Hamburger";
import Menu from "./UI/Menu";

const Nav = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const hamburgerClickedHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <Hamburger isOpen={isOpen} onClick={hamburgerClickedHandler} />
      {isOpen && <Menu setIsOpen={setIsOpen} />}
    </nav>
  );
};

export default Nav;
