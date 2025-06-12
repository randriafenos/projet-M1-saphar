import React, { useState, useEffect, useRef } from "react";
import { Bell, User, LucideLogOut, Search } from "lucide-react";
import "./adminHeader.scss";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    
  }, []);

  const handleLogoutClick = () => {
    setModalVisible(true);
  };

  const handleConfirmLogout = () => {
    setModalVisible(false);
    navigate("/");
  };


  return (
    <header className="Header">
      <div className="search-container">
        <Search className="search-icon" size={18} />
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      <div className="button-header">

        <div className="user-actions">
          <User className="user-icon" />
          <LucideLogOut className="logout-icon" onClick={handleLogoutClick} />
        </div>
      </div>

      {modalVisible && (
        <div className="logout-modal">
          <div className="modal-content">
            <h2>"Confirm Logout"</h2>
            <p>"Are you sure you want to log out?"</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setModalVisible(false)}>
                "Cancel"
              </button>
              <button className="btn btn-primary" onClick={handleConfirmLogout}>
                "Logout"
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;