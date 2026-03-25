import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  clearAndReload() {
    ['bowshop_products', 'bowshop_cart', 'bowshop_orders'].forEach(k => localStorage.removeItem(k));
    window.location.reload();
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#fff5f9', fontFamily: 'Segoe UI, sans-serif', padding: '2rem', textAlign: 'center'
        }}>
          <div style={{ fontSize: 64 }}>🎀</div>
          <h2 style={{ color: '#db2777', margin: '1rem 0 0.5rem' }}>Something went wrong</h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem', maxWidth: 400 }}>
            The app ran into an error. This is usually caused by outdated cached data.
            Clearing it will fix the issue.
          </p>
          <button
            onClick={this.clearAndReload.bind(this)}
            style={{
              background: '#db2777', color: 'white', border: 'none',
              padding: '0.75rem 1.75rem', borderRadius: 20, fontSize: '1rem',
              fontWeight: 700, cursor: 'pointer'
            }}
          >
            Clear Cache & Reload
          </button>
          <details style={{ marginTop: '1.5rem', color: '#9ca3af', fontSize: '0.78rem', maxWidth: 500 }}>
            <summary style={{ cursor: 'pointer' }}>Error details</summary>
            <pre style={{ textAlign: 'left', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
              {this.state.error?.message}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
