import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/general/Navbar';
import SignUp from './Components/auth/SignUp';
import LogIn from './Components/auth/Login';
import Home from './Components/general/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path='/home' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
