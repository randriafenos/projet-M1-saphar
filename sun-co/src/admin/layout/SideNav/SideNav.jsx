import React, { useState, useEffect } from "react";
import { LuLayoutDashboard, LuUser, LuUserCheck, LuBox, LuMenu , LuShoppingBag } from "react-icons/lu"; 
import classnames from "classnames";
import { startDriverIntro } from "../../../utils/Driver/IntroGuide";
import "./SideNav.scss";

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    startDriverIntro();  // Appel de la fonction pour démarrer l'intro
  }, []);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const menus = [
    { title: "Dashboard", icon: <LuLayoutDashboard />, link: "/dashboard" },
    { title: "Employees", icon: <LuUser />, link: "/dashboard/employee-account" },
    { title: "Manager", icon: <LuUserCheck />, link: "/dashboard/manager-account" },
    {title: "Request", icon: <LuShoppingBag />, link: "/dashboard/request-list" },
    { title: "Invotory", icon: <LuBox />, link: "/dashboard/inventory" }
  ];

  return (
    <div id="sidebar" className={classnames("sidebar", { collapsed })}>
      <div className="sidebar-header">
        <button onClick={handleToggle} className="sidebar-collapser">
          <LuMenu className="io-menu" />
        </button>
      </div>

      <div className="sidebar-content">
        <ul className="menu">
          {menus.map((menu, index) => (
            <li key={index} className="menu-item">
              <a href={menu.link}>
                {menu.icon}
                <span>{menu.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
