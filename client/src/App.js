import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './Components/Home';
import Layout from './Components/Layout';
import Standings from './Components/Standings';
import { UserContext, UserProvider } from './Context/UserContext';
import { useContext } from 'react';
import SelectUser from './Components/SelectUser';
import { PicksProvider } from './Context/PicksContext';

function AppContent() {
  const { user } = useContext(UserContext);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
              <Route index element={user ? <Home /> : <Navigate to="/login" replace />} />
              <Route path="/standings" element={user ? <Standings /> : <Navigate to="/login" replace />} />
              <Route path="/login" element={<SelectUser />} />
        </Route>
      </Routes>
    </>
  );
}

function App () {
  return (
    <UserProvider>
      <PicksProvider>
        <AppContent />
      </PicksProvider>
    </UserProvider>
  );
}

export default App;
