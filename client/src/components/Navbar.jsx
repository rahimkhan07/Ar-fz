import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useStore';

export default function Navbar() {
  const [cart] = useCart();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const isAdmin = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/products');

  const close = () => setOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand" onClick={close}>🎀 BowsNScrunchies</Link>

      <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
        <span className={`ham-line ${open ? 'open' : ''}`} />
        <span className={`ham-line ${open ? 'open' : ''}`} />
        <span className={`ham-line ${open ? 'open' : ''}`} />
      </button>

      <div className={`nav-links ${open ? 'nav-open' : ''}`}>
        {isAdmin ? (
          <>
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''} onClick={close}>Dashboard</Link>
            <Link to="/products" className={location.pathname === '/products' ? 'active' : ''} onClick={close}>Products</Link>
            <Link to="/" className="nav-shop-btn" onClick={close}>← Shop</Link>
          </>
        ) : (
          <>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={close}>Shop</Link>
            <Link to="/cart" className={`cart-link ${location.pathname === '/cart' ? 'active' : ''}`} onClick={close}>
              🛒 Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
            <Link to="/dashboard" className="nav-admin-btn" onClick={close}>Admin</Link>
          </>
        )}
      </div>
    </nav>
  );
}
