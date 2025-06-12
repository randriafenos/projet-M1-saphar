import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Bell, User, LogOut, Search } from "lucide-react";

import ThemeToggle from "../../../../components/common/switchMode/themeToggle";
import { useAudio } from "../../../../assets/sounds/AudioContext";
import {
  connectSocket,
  getAllPurchaseRequest,
} from "../../../../services/notificationService";

import mlgFlag from "../../../../assets/images/.jpeg/mlgFlag.jpeg";
import engFlag from "../../../../assets/images/.jpeg/engFlag.jpeg";
import frFlag from "../../../../assets/images/.jpeg/frFlag.jpeg";
import notifSound from "../../../../assets/sounds/notif.mp3";

import "./adminHeader.scss";

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { audioRef } = useAudio();
  const languageSelectorRef = useRef();

  const [showMenu, setShowMenu] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "en",
    label: t("English"),
    flag: engFlag,
  });

  const languages = [
    { code: "en", label: t("English"), flag: engFlag },
    { code: "mg", label: t("Malagasy"), flag: mlgFlag },
    { code: "fr", label: t("French"), flag: frFlag },
  ];

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    setShowMenu(false);
    i18n.changeLanguage(language.code);
    audioRef.current?.play().catch((error) => {
      console.log("Playback prevented: ", error);
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageSelectorRef.current &&
        !languageSelectorRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    connectSocket();
    getAllPurchaseRequest();
  }, []);

  const handleLogoutClick = () => {
    setModalVisible(true);
  };

  const handleConfirmLogout = () => {
    setModalVisible(false);
    navigate("/login");
  };

  return (
    <header className="admin-header">
      <audio ref={audioRef} src={notifSound} preload="auto" />

      <div className="header-content">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder={t("Search")}
            className="search-input"
          />
        </div>

        <div className="header-actions">
          <ThemeToggle />

          <div className="language-selector" ref={languageSelectorRef}>
            <button
              className="lang-button"
              onClick={() => setShowMenu(!showMenu)}
            >
              <img
                src={selectedLanguage.flag}
                alt={selectedLanguage.label}
                className="flag-icon"
              />
              <span className="current-lang">
                {selectedLanguage.code.toUpperCase()}
              </span>
            </button>

            {showMenu && (
              <ul className="lang-menu">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang)}
                  >
                    <img
                      src={lang.flag}
                      alt={lang.label}
                      className="flag-icon"
                    />
                    {lang.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="user-actions">
            <button className="icon-button notifications">
              <Bell className="icon" />
              <span className="badge">3</span>
            </button>

            <button className="icon-button profile">
              <User className="icon" />
            </button>

            <button className="icon-button logout" onClick={handleLogoutClick}>
              <LogOut className="icon" />
            </button>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="logout-modal">
          <div className="modal-content">
            <h2>{t("Confirm Logout")}</h2>
            <p>{t("Are you sure you want to log out?")}</p>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setModalVisible(false)}
              >
                {t("Cancel")}
              </button>
              <button className="btn btn-primary" onClick={handleConfirmLogout}>
                {t("Logout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
