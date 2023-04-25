import React, { useState, useEffect } from 'react';
import CountSession from './CountSession';
import logoIcon from '../image/logo.png';
import './TopMenu.css';
import clockIcon from '../image/clock.png';

function TopMenu() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    era: undefined,
  };
  const date = currentDateTime
    .toLocaleString('ru-RU', options)
    .replace(/\sг\./, '')
    .replace(/,/g, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Split the date into weekday and the rest of the date
  const [weekday, ...restOfDate] = date.split(' ');

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };
  const time = currentDateTime.toLocaleString('ru-RU', timeOptions);

  return (
    <div className="topMenu d-flex align-items-center justify-content-between">
      <div className="topMenu-logo d-flex align-items-center justify-content-between">
        <div className="topMenu-logo__container">
          <img src={logoIcon} alt="logo" />
          <span className="topMenu-logo__text">INVENTORY</span>
        </div>
        <input
          className="topMenu-logo__input"
          type="text"
          placeholder="Поиск"
        />
      </div>
      <div className="topMenu-date-time d-flex justify-content-between">
        <div className="topMenu-data__container">
          <div className="topMenu-weekday">{weekday}</div>
          <div className="topMenu-date">{restOfDate.join(' ')}</div>
        </div>
        <div className="topMenu-clock__container">
          <img className="topMenu-clock" src={clockIcon} alt="clock" />
          <span>{time}</span>
          <CountSession />
        </div>
      </div>
    </div>
  );
}

export default TopMenu;
