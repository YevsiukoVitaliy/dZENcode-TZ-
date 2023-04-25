import React from 'react';
import './Modal.css';
import deleteRedIcon from '../image/deleteRed.png';

const Modal = ({ isOpen, onClose, onConfirm, onSelectedOrderProducts }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          х
        </button>
        <div className="modal-content__container">
          <h2 className="modal-title">
            Вы уверены, что хотите удалить этот приход?
          </h2>
          <ul className="modal-list">
            {onSelectedOrderProducts.map((product, index) => (
              <li className="modal-item" key={index}>
                <div className="modal-item__img__container">
                  <img src={product.photo} alt="" className="modal-item__img" />
                </div>
                <div className="modal-item__info">
                  <h3 className="modal-item__title">{product.title}</h3>
                  <p className="modal-item__type">{product.type}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-actions">
          <button className="modal-btn--cancel" onClick={onClose}>
            ОТМЕНИТЬ
          </button>
          <button className="modal-btn--confirm" onClick={onConfirm}>
            <img className="modal-btn__icon" src={deleteRedIcon} alt="" />
            <span>УДАЛИТЬ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
