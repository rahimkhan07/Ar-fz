export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">🎀 BowsNScrunchies</span>
          <p>Cute accessories for women & Gen-Z girls. Made with love.</p>
        </div>
        <div className="footer-links">
          <h4>Shop</h4>
          <a href="/">All Products</a>
          <a href="/?filter=bows">Bows</a>
          <a href="/?filter=scrunchies">Scrunchies</a>
          <a href="/cart">Cart</a>
        </div>
        <div className="footer-links">
          <h4>Admin</h4>
          <a href="/dashboard">Dashboard</a>
          <a href="/products">Manage Products</a>
        </div>
        <div className="footer-links">
          <h4>Connect</h4>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">Pinterest</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BowsNScrunchies. All rights reserved. 🩷</p>
      </div>
    </footer>
  );
}
