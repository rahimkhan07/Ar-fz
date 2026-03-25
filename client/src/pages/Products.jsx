import { useState, useRef } from 'react';
import { useProducts } from '../hooks/useStore';

const empty = { name: '', category: 'bows', price: '', stock: '', image: '🎀', description: '' };

// true if value is a data URL or http URL
const isImgUrl = v => typeof v === 'string' && (v.startsWith('data:') || v.startsWith('http'));

export default function Products() {
  const [products, setProducts] = useProducts();
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imgMode, setImgMode] = useState('emoji'); // 'emoji' | 'upload'
  const fileRef = useRef();

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setForm(f => ({ ...f, image: ev.target.result }));
    reader.readAsDataURL(file);
  }

  function save(e) {
    e.preventDefault();
    const product = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
    if (editing !== null) {
      setProducts(prev => prev.map(p => p.id === editing ? { ...product, id: editing } : p));
    } else {
      setProducts(prev => [...prev, { ...product, id: Date.now() }]);
    }
    setForm(empty);
    setEditing(null);
    setShowForm(false);
    setImgMode('emoji');
  }

  function startEdit(p) {
    setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock, image: p.image, description: p.description });
    setEditing(p.id);
    setShowForm(true);
    setImgMode(isImgUrl(p.image) ? 'upload' : 'emoji');
  }

  function deleteProduct(id) {
    if (confirm('Delete this product?')) setProducts(prev => prev.filter(p => p.id !== id));
  }

  function switchMode(mode) {
    setImgMode(mode);
    setForm(f => ({ ...f, image: mode === 'emoji' ? '🎀' : '' }));
    if (fileRef.current) fileRef.current.value = '';
  }

  const emojis = ['🎀', '🌸', '✨', '💜', '🤍', '🌺', '🌷', '💗', '🩷', '🫧'];

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">🎀 Products</h1>
        <button className="add-btn" onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); setImgMode('emoji'); }}>
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <form className="product-form" onSubmit={save}>
          <h3>{editing ? 'Edit Product' : 'New Product'}</h3>
          <div className="form-row">
            <input required placeholder="Product Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="bows">Bows</option>
              <option value="scrunchies">Scrunchies</option>
            </select>
          </div>
          <div className="form-row">
            <input required type="number" step="0.01" placeholder="Price ($)" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <input required type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
          </div>
          <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

          {/* Image section */}
          <div className="img-section">
            <div className="img-mode-tabs">
              <button type="button" className={`img-tab ${imgMode === 'emoji' ? 'active' : ''}`} onClick={() => switchMode('emoji')}>Emoji Icon</button>
              <button type="button" className={`img-tab ${imgMode === 'upload' ? 'active' : ''}`} onClick={() => switchMode('upload')}>Upload Image</button>
            </div>

            {imgMode === 'emoji' && (
              <div className="emoji-picker">
                {emojis.map(em => (
                  <button type="button" key={em} className={`emoji-btn ${form.image === em ? 'selected' : ''}`} onClick={() => setForm({ ...form, image: em })}>{em}</button>
                ))}
              </div>
            )}

            {imgMode === 'upload' && (
              <div className="upload-area">
                <label className="upload-label" htmlFor="product-img">
                  {isImgUrl(form.image) ? (
                    <img src={form.image} alt="preview" className="img-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <span className="upload-icon">📷</span>
                      <span>Click to upload image</span>
                      <span className="upload-hint">JPG, PNG, WEBP — stored locally</span>
                    </div>
                  )}
                </label>
                <input
                  id="product-img"
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="file-input-hidden"
                  onChange={handleImageUpload}
                />
                {isImgUrl(form.image) && (
                  <button type="button" className="remove-img-btn" onClick={() => { setForm(f => ({ ...f, image: '' })); if (fileRef.current) fileRef.current.value = ''; }}>
                    ✕ Remove image
                  </button>
                )}
              </div>
            )}
          </div>

          <button type="submit" className="checkout-btn">{editing ? 'Update Product' : 'Add Product'}</button>
        </form>
      )}

      <div className="products-list">
        {products.map(p => (
          <div key={p.id} className="product-row">
            {isImgUrl(p.image)
              ? <img src={p.image} alt={p.name} className="row-img" />
              : <span className="row-emoji">{p.image}</span>
            }
            <div className="row-info">
              <strong>{p.name}</strong>
              <span className={`product-badge ${p.category}`}>{p.category}</span>
            </div>
            <span className="row-price">${p.price.toFixed(2)}</span>
            <span className={`row-stock ${p.stock < 10 ? 'low' : ''}`}>{p.stock} in stock</span>
            <div className="row-actions">
              <button className="edit-btn" onClick={() => startEdit(p)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteProduct(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
