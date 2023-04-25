import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import {
  getAllOrders,
  deleteOrderById,
  getAllProductsInOrder,
} from '../http/ordersAPI';
import Modal from '../components/Modal';
import deleteIcon from '../image/delete.png';
import './Orders.css';
import menuIcon from '../image/burgerMenu.png';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrderProducts, setSelectedOrderProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getAllOrders();
      setOrders(ordersData);
    };
    fetchOrders();
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      await deleteOrderById(deleteOrderId);
      setOrders(prevOrders =>
        prevOrders.filter(order => order._id !== deleteOrderId)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async orderId => {
    setDeleteOrderId(orderId);
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
      <ul className="order-list">
        {orders.map(order => (
          <li className="order-item" key={order._id.toString()}>
            <div className="order-item__container">
              <h2 className="order-item__title">{order.title}</h2>
            </div>
            <div className="pre-order">
              <button className="pre-order__btn">
                <img className="pre-order__icon" src={menuIcon} alt="" />
              </button>
              <h3 className="pre-order__title">
                {order.products.length}{' '}
                <p className="pre-order__text">Продукта</p>
              </h3>
            </div>
            <div className="pre-order-time__container">
              <div className="pre-order-time__pre__container">
                <p className="pre-order-time">
                  {moment(order.date).format('HH / mm')}
                </p>
                <p className="pre-order-date">
                  {moment(order.date).locale('ru').format('DD / MMM  /YYYY')}
                </p>
              </div>
            </div>
            <span className="pre-order__price">
              250 000.50 <span className="pre-order__currency">UAH</span>
            </span>
            <button
              className="order-item__btn"
              onClick={() => handleDeleteClick(order._id.toString())}
            >
              <img className="order-item__icon" src={deleteIcon} alt="delete" />
            </button>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        onSelectedOrderProducts={selectedOrderProducts}
      />
    </>
  );
};

export default Order;
