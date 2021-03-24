import React, { useState, useEffect } from "react";
import PersonIcon from "@material-ui/icons/Person";
import Browse from "../components/Browse";
import Input from "../components/Input";
import "../styles/nav/Nav.css";

function Nav() {
  const [showBrowse, setShowBrowse] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth > 510 && setBurgerMenu(false);
    });
    return () => window.removeEventListener("resize", () => true);
  }, []);

  const handleBurger = (e) => {
    setBurgerMenu(!burgerMenu);
    setShowBrowse(false);
  };

  return (
    <div className={`nav`}>
      <div id="logo-browse-box">
        <img
          className="nav-logo"
          src="/images/webflix.png"
          alt="webflix-logo"
        />
        <h4 onClick={() => setShowBrowse(!showBrowse)}>Browse</h4>
        {showBrowse && <Browse setShowBrowse={setShowBrowse} />}
      </div>
      <div id="nav-right-box">
        <Input />
        <div id="user-box">
          <img className="bell" src="/images/bell.png" alt="bell" />
          <PersonIcon
            style={{
              fontSize: 30,
              color: "red",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <img
        src="/images/redBurger.png"
        alt="burger"
        id="burger"
        onClick={handleBurger}
      />
      {burgerMenu && (
        <div id="burger-menu-box" onMouseLeave={handleBurger}>
          <ul>
            <li onClick={handleBurger}>Search</li>
            <li onClick={handleBurger}>Notifications</li>
            <li onClick={handleBurger}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default Nav;
