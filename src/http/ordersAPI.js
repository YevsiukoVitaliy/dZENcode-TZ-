import { $host } from './index';

// Получение всех заказов
export const getAllOrders = async () => {
  const { data } = await $host.get('/orders');
  return data;
};

// Получение заказа по ID
export const getOrderById = async orderId => {
  const { data } = await $host.get(`/orders/${orderId}`);
  return data;
};

// Создание нового заказа
export const createOrder = async orderData => {
  const { data } = await $host.post('/orders', orderData);
  return data;
};

// Добавление продуктов к заказу
export const addProductsToOrder = async (orderId, productIds) => {
  const { data } = await $host.post(`/orders/${orderId}/products`, {
    productIds,
  });
  return data;
};

// Получение всех продуктов в заказе
export const getAllProductsInOrder = async orderId => {
  const { data } = await $host.get(`/orders/${orderId}/products`);
  return data;
};

// Удаление заказа по ID
export const deleteOrderById = async orderId => {
  const { data } = await $host.delete(`/orders/${orderId}`, {
    method: 'DELETE',
  });
  return data;
};
