import { useState } from 'react';
import { useCart, useOrders } from '../hooks/useStore';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useCart();
  const [orders, setOrders] = useOrders();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [placed, setPlaced] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  function updateQty(id, delta) {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }

  function remove(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function placeOrder(e) {
    e.preventDefault();
    const order = {
      id: Date.now(),
      customer: form,
      items: cart,
      total,
      date: new Date().toLocaleDateString(),
      status: 'Pending',
    };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    setPlaced(true);
  }

  if (placed) return (
    <div className="page center-page">
      <div className="success-card">
        <div style={{ fontSize: 64 }}>🎀</div>
        <h2>Order Placed!</h2>
        <p>Thanks for shopping with us. Your order is on its way!</p>
        <button className="add-btn" onClick={() => { setPlaced(false); navigate('/'); }}>Continue Shopping</button>
      </div>
    </div>
  );

  if (cart.length === 0) return (
    <div className="page center-page">
      <div className="empty-cart">
        <div style={{ fontSize: 64 }}>🛒</div>
        <h2>Your cart is empty</h2>
        <button className="add-btn" onClick={() => navigate('/')}>Browse Products</button>
      </div>
    </div>
  );

  return (
    <div className="page">
      <h1 className="page-title">Your Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <span className="cart-emoji">{item.image}</span>
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>${item.price.toFixed(2)} each</p>
              </div>
              <div className="qty-controls">
                <button onClick={() => updateQty(item.id, -1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>
              <span className="item-total">${(item.price * item.qty).toFixed(2)}</span>
              <button className="remove-btn" onClick={() => remove(item.id)}>✕</button>
            </div>
          ))}
          <div className="cart-total">Total: <strong>${total.toFixed(2)}</strong></div>
        </div>
        <form className="checkout-form" onSubmit={placeOrder}>
          <h3>Checkout</h3>
          <input required placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input required placeholder="Delivery Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          <button type="submit" className="checkout-btn">Place Order 🎀</button>
        </form>
      </div>
    </div>
  );
}
