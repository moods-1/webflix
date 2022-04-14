import React from "react";
import { browseData } from "../helpers/browseData";

function Browse({ setShowBrowse }) {
  return (
    <div id="browse-menu" onMouseLeave={() => setShowBrowse(false)}>
      <div id="browse-left-box">
        <ul id="browse-ul-main">
          {browseData.ulMain.map((link) => (
            <li key={link} onClick={() => setShowBrowse(false)}>
              {link}
            </li>
          ))}
        </ul>
      </div>
      <div id="browse-right-box">
        <ul id="browse-ul-left">
          {browseData.ulLeft.map((link) => (
            <li key={link} onClick={() => setShowBrowse(false)}>
              {link}
            </li>
          ))}
        </ul>
        <ul id="browse-ul-center">
          {browseData.ulCenter.map((link) => (
            <li key={link} onClick={() => setShowBrowse(false)}>
              {link}
            </li>
          ))}
        </ul>
        <ul id="browse-ul-right">
          {browseData.ulRight.map((link) => (
            <li key={link} onClick={() => setShowBrowse(false)}>
              {link}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Browse;
