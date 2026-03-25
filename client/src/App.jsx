import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './hooks/useStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BowCursor from './components/BowCursor';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import './App.css';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <BowCursor />
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
