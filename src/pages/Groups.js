import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import {
  getAllOrders,
  getOrderById,
  // deleteOrderById,
  getAllProductsInOrder,
} from '../http/ordersAPI';
import './Orders.css';
import menuIcon from '../image/burgerMenu.png';
import deleteIcon from '../image/delete.png';

const Groups = () => {
  const [orders, setOrders] = useState([]);
  const [orderTitle, setOrderTitle] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrderProducts, setSelectedOrderProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getAllOrders();
      setOrders(ordersData);
    };
    fetchOrders();
  }, []);

  const handleDetalClick = async orderId => {
    const orderById = await getOrderById(orderId);
    setOrderTitle(orderById.title);
    setIsDeleteModalOpen(true);
    const productsData = await getAllProductsInOrder(orderId);
    setSelectedOrderProducts(productsData);
  };

  return (
    <>
      <div className="order-add_container d-flex align-items-center">
        <button className="order-add_btn">+</button>
        <h1 className="orders-add__title">Приходы / {orders.length}</h1>
      </div>
      <div className="d-flex">
        <ul className="order-list">
          {orders.map(order => (
            <li className="order-item groups-item" key={order._id.toString()}>
              <div className="pre-order pre-group">
                <button
                  onClick={() => handleDetalClick(order._id.toString())}
                  className="pre-order__btn pre-groups__btn"
                >
                  <img className="pre-order__icon" src={menuIcon} alt="" />
                  <div className="arrow-container">
                    <div className="arrow"></div>
                  </div>
                </button>
                <h3 className="pre-order__title">
                  {order.products.length}{' '}
                  <p className="pre-order__text">Продукта</p>
                </h3>
              </div>
              <div className="pre-order-time__container">
                <div className="pre-order-time__pre__container">
                  <p className="pre-order-time pre-group-time">
                    {moment(order.date).format('HH / mm')}
                  </p>
                  <p className="pre-order-date">
                    {moment(order.date).locale('ru').format('DD / MMM  /YYYY')}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {isDeleteModalOpen && (
          <div className="modal-groups">
            <div className="modal-groups__container">
              <h2 className="modal-groups__container__title">{orderTitle}</h2>
              <button className="modal-groups__container_btn group-add_btn">
                +
              </button>
              <span className="group-add__text">Добавить продукт</span>
            </div>
            <ul className="modal-list">
              {selectedOrderProducts.map((product, index) => (
                <li className="modal-item" key={index}>
                  <div className="modal-item__img__container">
                    <img
                      src={product.photo}
                      alt=""
                      className="modal-item__img"
                    />
                  </div>
                  <div className="modal-item__info">
                    <h3 className="modal-item__title">{product.title}</h3>
                    <p className="modal-item__type">{product.type}</p>
                  </div>
                  <span className="modal-item__status">Свободен</span>
                  <button className="modal-item__btn">
                    <img className="modal-item__icon" src={deleteIcon} alt="" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="modal-close-btn"
            >
              X
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Groups;
