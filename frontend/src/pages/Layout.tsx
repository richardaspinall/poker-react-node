import { Outlet, Link } from 'react-router-dom';

export function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          River Room
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <Link to="/">Home</Link>
          <Link to="/createaccount">Create Account</Link>
          <Link to="/signin">Sign in</Link>
          <Link className="cta-link" to="/play">
            Play
          </Link>
        </nav>
      </header>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}
