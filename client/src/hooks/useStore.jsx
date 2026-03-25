import { useState, useEffect, useContext, createContext, useCallback } from 'react';

// ── safe localStorage read ─────────────────────────────────────────────────
function readStorage(key, initial) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return initial;
    const parsed = JSON.parse(raw);
    // guard: if we expect an array, make sure we got one
    if (Array.isArray(initial) && !Array.isArray(parsed)) return initial;
    return parsed;
  } catch {
    return initial;
  }
}

function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ── generic localStorage hook ──────────────────────────────────────────────
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => readStorage(key, initial));

  const set = useCallback((action) => {
    setValue(prev => {
      const next = typeof action === 'function' ? action(prev) : action;
      writeStorage(key, next);
      return next;
    });
  }, [key]);

  // sync across browser tabs
  useEffect(() => {
    function onStorage(e) {
      if (e.key !== key) return;
      setValue(e.newValue ? readStorage(key, initial) : initial);
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]); // eslint-disable-line

  return [value, set];
}

// ── default seed data ──────────────────────────────────────────────────────
const defaultProducts = [
  { id: 1, name: 'Satin Bow Headband',        category: 'bows',       price: 12.99, stock: 25, image: '🎀', description: 'Elegant satin bow headband, perfect for any occasion.' },
  { id: 2, name: 'Velvet Scrunchie Set',       category: 'scrunchies', price: 8.99,  stock: 40, image: '🌸', description: 'Soft velvet scrunchies in pastel shades, set of 3.' },
  { id: 3, name: 'Mini Bow Clips (Pack of 5)', category: 'bows',       price: 9.99,  stock: 30, image: '✨', description: 'Cute mini bow clips for a Y2K aesthetic.' },
  { id: 4, name: 'Chunky Scrunchie',           category: 'scrunchies', price: 6.99,  stock: 50, image: '💜', description: 'Oversized chunky scrunchie, trendy and hair-friendly.' },
  { id: 5, name: 'Pearl Bow Barrette',         category: 'bows',       price: 14.99, stock: 15, image: '🤍', description: 'Elegant pearl-embellished bow barrette.' },
  { id: 6, name: 'Silk Scrunchie',             category: 'scrunchies', price: 11.99, stock: 20, image: '🌺', description: 'Luxurious silk scrunchie, gentle on hair.' },
  { id: 7, name: 'Coquette Bow Set',           category: 'bows',       price: 18.99, stock: 12, image: '🎀', description: 'Aesthetic coquette bow set, 4 pieces in blush tones.' },
  { id: 8, name: 'Floral Scrunchie Pack',      category: 'scrunchies', price: 10.99, stock: 35, image: '🌷', description: 'Floral print scrunchies, set of 4.' },
];

// ── shared contexts ────────────────────────────────────────────────────────
const ProductsCtx = createContext(null);
const CartCtx     = createContext(null);
const OrdersCtx   = createContext(null);

// ── provider ───────────────────────────────────────────────────────────────
export function StoreProvider({ children }) {
  const products = useLocalStorage('bowshop_products', defaultProducts);
  const cart     = useLocalStorage('bowshop_cart',     []);
  const orders   = useLocalStorage('bowshop_orders',   []);

  return (
    <ProductsCtx.Provider value={products}>
      <CartCtx.Provider value={cart}>
        <OrdersCtx.Provider value={orders}>
          {children}
        </OrdersCtx.Provider>
      </CartCtx.Provider>
    </ProductsCtx.Provider>
  );
}

// ── hooks ──────────────────────────────────────────────────────────────────
export function useProducts() {
  const ctx = useContext(ProductsCtx);
  if (!ctx) throw new Error('useProducts must be used inside <StoreProvider>');
  return ctx;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used inside <StoreProvider>');
  return ctx;
}

export function useOrders() {
  const ctx = useContext(OrdersCtx);
  if (!ctx) throw new Error('useOrders must be used inside <StoreProvider>');
  return ctx;
}
