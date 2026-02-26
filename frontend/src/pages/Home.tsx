import { Link } from 'react-router-dom';

export function Home() {
  return (
    <section className="home-page">
      <p className="eyebrow">Texas Hold'em Playground</p>
      <h1>Play fast, real-time heads-up poker with your crew.</h1>
      <p className="intro">
        Create an account, sign in, grab a seat, and play through live turns powered by API state and socket events.
      </p>
      <div className="home-actions">
        <Link className="button-primary" to="/createaccount">
          Create Account
        </Link>
        <Link className="button-secondary" to="/signin">
          Sign In
        </Link>
      </div>
      <div className="feature-grid">
        <article>
          <h2>Real-time game events</h2>
          <p>Live updates for seats, turns, bets, cards, and pot changes.</p>
        </article>
        <article>
          <h2>Simple auth flow</h2>
          <p>Register, sign in, and reconnect sockets quickly before joining a table.</p>
        </article>
        <article>
          <h2>Built for iteration</h2>
          <p>React + Redux frontend with Node, Express, and Socket.IO backend services.</p>
        </article>
      </div>
    </section>
  );
}
