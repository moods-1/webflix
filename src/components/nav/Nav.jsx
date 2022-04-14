import React, { useState, useEffect } from "react";
import Notifications from "./Notifications";
import { notificationsArr } from "./notificationData";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core";
import Browse from "../Browse";
import Input from "../Input";
import "../../styles/nav/Nav.scss";

const StyledBadge = withStyles((theme) => ({
  badge: {
    fontSize: 12,
    top: 8,
    right: 0,
    width: 0,
    height: 12,
    background: "red",
  },
}))(Badge);

function Nav() {
  const [showBrowse, setShowBrowse] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hideMobileSearch, setHideMobileSearch] = useState(true);
  const [hideInput, setHideInput] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 640) {
        setBurgerMenu(false);
        setMobile(false);
        setHideMobileSearch(false);
        setHideInput(false);
      } else {
        setMobile(true);
        setHideMobileSearch(true);
        setHideInput(true);
      }
    });
    return () => window.removeEventListener("resize", () => true);
  }, []);
  
  const handleBurger = () => {
    setBurgerMenu(!burgerMenu);
    setShowBrowse(false);
    setShowNotifications(false);
  };

  const handleBurgerSearch = () => {
    setHideInput(!hideInput);
    setBurgerMenu(!burgerMenu);
    setShowBrowse(false);
    setHideMobileSearch(!hideMobileSearch);
  };

  const handleProfile = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowBrowse(false);
    setShowNotifications(false);
  };

  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowBrowse(false);
    setShowProfileMenu(false);
    setBurgerMenu(false);
    setHideInput(true);
  };

  const handleBrowse = () => {
    setShowBrowse(!showBrowse);
    setBurgerMenu(false);
    setHideMobileSearch(true);
  };
  return (
    <div className={`nav`}>
      <div id="logo-browse-box">
        <img
          className="nav-logo"
          src="/images/webflix.png"
          alt="webflix-logo"
        />
        <h4 onClick={handleBrowse}>Browse</h4>
        {showBrowse && (
          <Browse setShowBrowse={setShowBrowse} setBurgerMenu={setBurgerMenu} />
        )}
      </div>
      <div id="nav-right-box">
        {!hideInput && (
          <Input
            setShowNotifications={setShowNotifications}
            setShowBrowse={setShowBrowse}
            setShowProfileMenu={setShowProfileMenu}
            hideMobileSearch={hideMobileSearch}
            setHideMobileSearch={setHideMobileSearch}
            mobile={mobile}
            setMobile={setMobile}
          />
        )}

        <div id="user-box">
          <StyledBadge badgeContent={notificationsArr.length} max={99}>
            <NotificationsIcon className="bell" onClick={handleNotifications} />
          </StyledBadge>
          <PersonIcon
            onClick={handleProfile}
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
            <li onClick={handleBurgerSearch}>Search</li>
            <li onClick={handleNotifications}>Notifications</li>
            <li onClick={handleBurger}>Logout</li>
          </ul>
        </div>
      )}
      {showProfileMenu && (
        <div id="burger-menu-box" onMouseLeave={handleProfile}>
          <ul>
            <li onClick={handleProfile}>Logout</li>
          </ul>
        </div>
      )}
      {showNotifications && (
        <Notifications
          notificationsArr={notificationsArr}
          setShowNotifications={setShowNotifications}
        />
      )}
    </div>
  );
}
export default Nav;
