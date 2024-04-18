import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from '../src/components/Navbar'
import Home from './pages/Home';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import LandingPage from "./pages/LandingPage";
import { useAuth } from './AuthContext';




function App() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/landingpage" element={<LandingPage />} />
          <Route exact path="/" element={user ? <Home /> : <Navigate to="/landingpage" />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="*" element={user ? <ErrorPage /> : <Navigate to="/landingpage" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;