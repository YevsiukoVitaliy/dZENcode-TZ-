import { $host } from './index';

// Получение всех продуктов
export const getAllProducts = async () => {
  const { data } = await $host.get('/products');
  return data;
};
// Получение продукта по ID
export const getProductById = async productId => {
  const { data } = await $host.get(`/products/${productId}`);
  return data;
};

export const createProduct = async productData => {
  const { data } = await $host.post('/products', productData);
  return data;
};

// Удаление продукта по ID
export const deleteProductById = async productId => {
  const { data } = await $host.delete(`/products/${productId}`);
  return data;
};
