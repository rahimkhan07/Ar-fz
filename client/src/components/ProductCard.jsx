const isImgUrl = v => typeof v === 'string' && (v.startsWith('data:') || v.startsWith('http'));

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        {isImgUrl(product.image)
          ? <img src={product.image} alt={product.name} className="product-img" />
          : <span className="product-emoji">{product.image}</span>
        }
      </div>
      <span className={`product-badge ${product.category}`}>{product.category}</span>
      <h3>{product.name}</h3>
      <p className="product-desc">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">${product.price.toFixed(2)}</span>
        <button
          className="add-btn"
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
      <p className="product-stock">{product.stock} left in stock</p>
    </div>
  );
}
