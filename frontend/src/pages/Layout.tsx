import { Outlet, Link } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/createaccount">Create Account</Link>
          </li>
          <li>
            <Link to="/play">Play</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
