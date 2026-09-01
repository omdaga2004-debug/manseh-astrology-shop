import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ApiProduct } from './manseh-api';

export type StoreProduct = ApiProduct & {
  image: string;
  description: string;
  zodiac: string;
};

export type BagLine = StoreProduct & { quantity: number };

export const fallbackProducts: StoreProduct[] = [
  {
    id: 'lunar-key',
    name: 'The Lunar Key',
    price: 148,
    category: 'TALISMANS',
    zodiac: 'ALL SIGNS',
    description: 'A hand-finished brass talisman for the hours that belong only to you.',
    image: '/manseh-lunar.png',
  },
  {
    id: 'orbit-ring',
    name: 'Orbit Ring',
    price: 196,
    category: 'JEWELLERY',
    zodiac: 'AIR SIGNS',
    description: 'A slim, weighted ring engraved with the quiet geometry of your orbit.',
    image: '/manseh-chart.png',
  },
  {
    id: 'night-almanac',
    name: 'Night Almanac',
    price: 84,
    category: 'OBJECTS',
    zodiac: 'WATER SIGNS',
    description: 'A considered guide to the next twelve moons, bound in midnight cloth.',
    image: '/manseh-lunar.png',
  },
  {
    id: 'solstice-thread',
    name: 'Solstice Thread',
    price: 128,
    category: 'TEXTILES',
    zodiac: 'FIRE SIGNS',
    description: 'Silk cord, warm metal and one intention made tangible.',
    image: '/manseh-chart.png',
  },
];

type StoreContextValue = {
  bag: BagLine[];
  bagCount: number;
  bagTotal: number;
  addToBag: (product: StoreProduct) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  removeFromBag: (id: string | number) => void;
  clearBag: () => void;
  lastAdded: string | number | null;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagLine[]>(() => {
    try {
      const stored = localStorage.getItem('manseh-bag');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [lastAdded, setLastAdded] = useState<string | number | null>(null);

  useEffect(() => {
    localStorage.setItem('manseh-bag', JSON.stringify(bag));
  }, [bag]);

  const value = useMemo<StoreContextValue>(() => ({
    bag,
    bagCount: bag.reduce((sum, item) => sum + item.quantity, 0),
    bagTotal: bag.reduce((sum, item) => sum + item.price * item.quantity, 0),
    addToBag: (product) => {
      setBag((current) => {
        const found = current.find((item) => String(item.id) === String(product.id));
        return found
          ? current.map((item) => String(item.id) === String(product.id) ? { ...item, quantity: item.quantity + 1 } : item)
          : [...current, { ...product, quantity: 1 }];
      });
      setLastAdded(product.id);
      window.setTimeout(() => setLastAdded(null), 700);
    },
    updateQuantity: (id, quantity) => {
      setBag((current) => quantity < 1 ? current.filter((item) => String(item.id) !== String(id)) : current.map((item) => String(item.id) === String(id) ? { ...item, quantity } : item));
    },
    removeFromBag: (id) => setBag((current) => current.filter((item) => String(item.id) !== String(id))),
    clearBag: () => setBag([]),
    lastAdded,
  }), [bag, lastAdded]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}