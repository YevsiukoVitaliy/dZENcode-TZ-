import React, { useEffect, useState } from 'react';
import 'moment/locale/ru';
import { getAllProducts } from '../http/productsAPI';
import deleteIcon from '../image/delete.png';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      const productsData = await getAllProducts();
      setProducts(productsData);
    };
    fetchproducts();
  }, []);

  return (
    <>
      <div className="product-add_container d-flex align-items-center">
        <button className="product-add_btn">+</button>
        <h1 className="products-add__title">Продукты / {products.length}</h1>
      </div>
      <ul className="product-list">
        {products.map(product => (
          <li className="product-item" key={product._id.toString()}>
            <div className="product-item__img__container">
              <img src={product.photo} alt="" className="product-item__img" />
            </div>
            <div className="product-item__info">
              <h3 className="product-item__title">{product.title}</h3>
              <p className="product-item__type">{product.type}</p>
            </div>
            <span className="product-item__status">свободен</span>
            <button className="product-item__btn">
              <img className="product-item__icon" src={deleteIcon} alt="" />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;
