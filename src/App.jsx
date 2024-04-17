import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from '../src/components/Navbar'
import SignUp from "./pages/SignUp";
import Login from "./pages/LogIn";
import Home from './pages/Home';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import ChatDropUp from './components/ChatDropUp';
import ChatArea from './components/ChatArea';
import { useAuth } from './AuthContext';




function App() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="*" element={user ? <ErrorPage /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;