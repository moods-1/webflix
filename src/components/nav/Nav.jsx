import React, { useState, useEffect } from "react";
import Notifications from "./Notifications";
import { notificationsArr } from "./notificationData";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core";
import Browse from "../Browse";
import Input from "../Input";
import "../../styles/nav/Nav.css";

const StyledBadge = withStyles((theme) => ({
  badge: {
    fontSize: 12,
    top: 5,
    right: 2,
    background: "red"
  },
}))(Badge);

function Nav() {
  const [showBrowse, setShowBrowse] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchList, setShowSearchList] = useState(false);

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

  const handleProfile = (e) => {
    setShowProfileMenu(!showProfileMenu);
    setShowBrowse(false);
    setShowNotifications(false);
    setShowSearchList(false);
  };
  const handleNotifications = (e) => {
    setShowNotifications(!showNotifications);
    setShowBrowse(false);
    setShowProfileMenu(false);
    setShowSearchList(false);
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
        <Input
          showSearchList={showSearchList}
          setShowSearchList={setShowSearchList}
          setShowNotifications={setShowNotifications}
          setShowBrowse={setShowBrowse}
          setShowProfileMenu={setShowProfileMenu}

        />
        <div id="user-box">
          <StyledBadge badgeContent={notificationsArr.length} >
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
            <li onClick={handleBurger}>Search</li>
            <li onClick={handleBurger}>Notifications</li>
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
