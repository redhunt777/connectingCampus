import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings h-container">
        <img src="./logo.png" alt="logo" width={100} />
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <div className="scrollable-menu flexCenter paddings h-container h-wrapper">
              <Link to={"/home"}>Home</Link>

              <Link to="/buy-and-sell">Buy&Sell</Link>
              <Link to="/lost-found"> Lost&Found</Link>
              <Link to="/carpool"> Carpooling</Link>
              <button className="button">
                {/* Link within button */}
                <Link to="/profile">Profile</Link>
              </button>
            </div>
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
