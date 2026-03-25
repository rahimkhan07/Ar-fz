import { useState } from 'react';
import { useProducts, useCart } from '../hooks/useStore';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products] = useProducts();
  const [cart, setCart] = useCart();
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState('');

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(''), 2500);
  }

  return (
    <div className="page">
      {toast && <div className="toast">{toast}</div>}
      <div className="shop-hero">
        <h1>🎀 Bows & Scrunchies</h1>
        <p>Cute accessories for women & Gen-Z girls</p>
      </div>
      <div className="filter-bar">
        {['all', 'bows', 'scrunchies'].map(f => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : f === 'bows' ? '🎀 Bows' : '🌸 Scrunchies'}
          </button>
        ))}
      </div>
      <div className="products-grid">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
