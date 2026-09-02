// Mock API - backend disabled, everything local
export const fetchProducts = async () => [];
export const fetchProduct = async () => null;
export const postCart = async () => ({ ok: true });
export const getCart = async () => null;
export const postKundli = async () => ({ ok: true });
export const postContact = async () => ({ ok: true });
export const postNewsletter = async () => ({ ok: true });
export const mansehApi = {
  fetchProducts,
  fetchProduct,
  postCart,
  getCart,
  postKundli,
  postContact,
  postNewsletter,
};
export default mansehApi;
