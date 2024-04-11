import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ConnectionManager } from './components/ConnectionManager';
import { ConnectionState } from './components/ConnectionState';
import { useSocket } from './hooks/useSocket';
import { CreateAccount } from './pages/CreateAccount';
import { Home } from './pages/Home';
import { Layout } from './pages/Layout';
import { Play } from './pages/Play';
import { Signin } from './pages/Signin';

// https://socket.io/how-to/use-with-react
export default function App() {
  const { isConnected } = useSocket();

  return (
    <div className="App">
      <BrowserRouter>
        <ConnectionState isConnected={isConnected} />
        <ConnectionManager />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/play" element={<Play />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
