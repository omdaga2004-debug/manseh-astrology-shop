// Mock API - all backend disabled
const ok = async () => ({ ok: true, data: [] });
export const fetchProducts = ok;
export const fetchProduct = async () => null;
export const getProducts = ok;
export const getProduct = async () => null;
export const postCart = ok;
export const getCart = async () => null;
export const postKundli = ok;
export const postLogin = ok;
export const postSignup = ok;
export const postLogout = ok;
export const postContact = ok;
export const postNewsletter = ok;
export const postOrder = ok;
export const postCheckout = ok;
export const getUser = async () => null;
export const getOrders = ok;

export const mansehApi = {
  fetchProducts, fetchProduct, getProducts, getProduct,
  postCart, getCart, postKundli, postLogin, postSignup,
  postLogout, postContact, postNewsletter, postOrder, postCheckout,
  getUser, getOrders
};
export default mansehApi;
