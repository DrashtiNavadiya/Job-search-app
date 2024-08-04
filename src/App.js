import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPage from './pages/BlogPage';
import UserProfilePage from './pages/UserProfilePage';
import Login from './components/Login';
import Signup from './components/Signup';
import NavbarComponent from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogPost from './components/BlogPost';
import BlogDetail from './components/BlogDetail';

const App = () => {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<BlogPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-posts" element={<BlogPost />} />
            <Route path="/blogdetail/:postId" element={<BlogDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
