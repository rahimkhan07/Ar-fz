import { useProducts, useOrders } from '../hooks/useStore';

export default function Dashboard() {
  const [products] = useProducts();
  const [orders, setOrders] = useOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock < 10).length;

  function updateStatus(id, status) {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  return (
    <div className="page">
      <h1 className="page-title">📊 Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card pink">
          <div className="stat-icon">💰</div>
          <div>
            <p>Total Revenue</p>
            <h2>${totalRevenue.toFixed(2)}</h2>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">📦</div>
          <div>
            <p>Total Orders</p>
            <h2>{totalOrders}</h2>
          </div>
        </div>
        <div className="stat-card lavender">
          <div className="stat-icon">🎀</div>
          <div>
            <p>Products</p>
            <h2>{totalProducts}</h2>
          </div>
        </div>
        <div className="stat-card rose">
          <div className="stat-icon">⚠️</div>
          <div>
            <p>Low Stock</p>
            <h2>{lowStock}</h2>
          </div>
        </div>
      </div>

      <h2 className="section-title">Recent Orders</h2>
      {orders.length === 0 ? (
        <div className="empty-state">No orders yet. Share your shop link!</div>
      ) : (
        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{String(order.id).slice(-5)}</td>
                  <td>{order.customer.name}</td>
                  <td>{order.items.reduce((s, i) => s + i.qty, 0)} items</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>{order.date}</td>
                  <td>
                    <select
                      className={`status-select ${order.status.toLowerCase()}`}
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value)}
                    >
                      {statuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
