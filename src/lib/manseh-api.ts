const mockProducts = [
  { id: 1, name: "Clear Quartz Cluster", price: 2499, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0", category: "Crystals" },
  { id: 2, name: "Amethyst Geode", price: 3999, image: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec", category: "Crystals" },
  { id: 3, name: "Black Tourmaline", price: 1899, image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375", category: "Protection" },
  { id: 4, name: "Rose Quartz Heart", price: 1599, image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638", category: "Love" },
  { id: 5, name: "Selenite Wand", price: 1299, image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1", category: "Cleansing" },
  { id: 6, name: "Lapis Lazuli", price: 2799, image: "https://images.unsplash.com/photo-1615484477778-ca3b7795895a", category: "Wisdom" },
  { id: 7, name: "Citrine Point", price: 2199, image: "https://images.unsplash.com/photo-1635760781588-7a1a6d2c1c7a", category: "Abundance" },
  { id: 8, name: "Moonstone Palm", price: 3499, image: "https://images.unsplash.com/photo-1578911373434-0cb395d2c4d4", category: "Intuition" },
];

export const fetchProducts = async () => mockProducts;
export const getProducts = async () => mockProducts;
export const fetchProduct = async (id: any) => mockProducts.find(p => p.id == id);
export const getProduct = fetchProduct;
export const postCart = async () => ({ ok: true });
export const getCart = async () => null;
export const postKundli = async () => ({ ok: true });
export const postLogin = async () => ({ ok: true });
export const postSignup = async () => ({ ok: true });
export const postLogout = async () => ({ ok: true });
export const postContact = async () => ({ ok: true });
export const postNewsletter = async () => ({ ok: true });
export const postOrder = async () => ({ ok: true });
export const postCheckout = async () => ({ ok: true });
export const getUser = async () => null;
export const getOrders = async () => [];

export const mansehApi = { fetchProducts, getProducts, fetchProduct, getProduct, postCart, getCart, postKundli, postLogin, postSignup, postLogout, postContact, postNewsletter, postOrder, postCheckout, getUser, getOrders };
export default mansehApi;
