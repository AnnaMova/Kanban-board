import React, { useState, useRef, useEffect } from "react";
import "./UserMenu.css";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Обработчик закрытия меню при клике вне области
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Регистрация события click для отслеживания кликов вне компонента
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Переключение состояния открытия меню
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-menu" ref={dropdownRef}>
      {/* Иконка пользователя */}
      <div className="user-menu__btn" onClick={toggleMenu}>
        <button className="user-menu__icon" aria-label="User Menu"></button>
        <span
          className={`user-menu__arrow ${
            isOpen ? "user-menu__arrow--opened" : ""
          }`}
        ></span>
      </div>

      {/* Выпадающее меню */}
      {isOpen && (
        <ul className="menu">
          <li>
            <a href="#profile">Profile</a>
          </li>
          <li>
            <a href="#logout">Log Out</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
