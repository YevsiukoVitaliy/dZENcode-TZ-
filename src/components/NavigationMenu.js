import React from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import myPhoto from '../image/myPhoto.jpg';
import './NavigationMenu.css';
import settingIcon from '../image/setting.png';

export default function NavigationMenu() {
  const location = useLocation();

  return (
    <div className="nav d-flex flex-column">
      <div className="nav-img-wrapper">
        <img className="nav-img" src={myPhoto} alt="" />
        <Nav.Link href="/setting" className="nav-setting__link">
          <div className="nav-icon-bg">
            <img
              className="nav-setting__icon"
              src={settingIcon}
              alt="setting"
            />
          </div>
        </Nav.Link>
      </div>
      <Nav.Link href="/" className={location.pathname === '/' ? 'active' : ''}>
        ПРИХОД
      </Nav.Link>
      <Nav.Link
        href="/groups"
        className={location.pathname === '/groups' ? 'active' : ''}
      >
        ГРУППЫ
      </Nav.Link>
      <Nav.Link
        href="/products"
        className={location.pathname === '/products' ? 'active' : ''}
      >
        ПРОДУКТЫ
      </Nav.Link>
      <Nav.Link
        href="/users"
        className={location.pathname === '/users' ? 'active' : ''}
      >
        ПОЛЬЗОВАТЕЛИ
      </Nav.Link>
      <Nav.Link
        href="/setting"
        className={location.pathname === '/setting' ? 'active' : ''}
      >
        НАСТРОЙКА
      </Nav.Link>
    </div>
  );
}
