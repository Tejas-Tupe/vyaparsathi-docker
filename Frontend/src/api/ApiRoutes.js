const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

export const AUTH_ROUTES = {
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGIN: `${BASE_URL}/auth/login`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/changepassword`,
  DELETE_ACCOUNT: `${BASE_URL}/auth/deleteaccount`,
};

export const USER_ROUTES = {
  USER_DETAILS: `${BASE_URL}/users/userdetails`,
  EDIT_PROFILE: `${BASE_URL}/auth/editprofile`,
};

export const PRODUCT_ROUTES = {
  MY_PRODUCTS: `${BASE_URL}/products`,
  ADD_STOCK: `${BASE_URL}/stocks/add`,
  REFILL_STOCK: `${BASE_URL}/stocks/refill`,
  PRODUCTS_OVERVIEW: `${BASE_URL}/products/productsoverview`,
  OVERVIEW: `${BASE_URL}/products/overview`,
  DELETE_PRODUCT: `${BASE_URL}/products/delete`,
};

export const ORDER_ROUTES = {
  CREATE_ORDER: `${BASE_URL}/orders/create`,
  MY_ORDERS: `${BASE_URL}/orders/myorders`,
  EXPORT_ALL_ORDERS: `${BASE_URL}/orders/export`,
  DELETE_ALL_ORDERS: `${BASE_URL}/orders/delete`,
};

export const HEALTH_ROUTE = `${BASE_URL}/health`;

export default {
  BASE_URL,
  ...AUTH_ROUTES,
  ...USER_ROUTES,
  ...PRODUCT_ROUTES,
  ...ORDER_ROUTES,
  HEALTH_ROUTE,
};
