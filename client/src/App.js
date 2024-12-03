import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './Home';
import Layout from './Layout';
import Standings from './Standings';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/standings" element={<Standings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
