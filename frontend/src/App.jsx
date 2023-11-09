import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer';
import Home from './components/Home.jsx';
import CreateBlg from './components/CreateBlg';
import BlogPage from './components/BlogPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import IndBlogPage from './components/IndBlogPage';
import UserProfilePage from './components/AccountPage';

function App() {
  // Specifc User Account
  const [user, setUser] = useState();
  const [logout, setLogout] = useState(false);

  function resetUser() {
    const user_Account = JSON.parse(window.localStorage.getItem("user_account"));
    setUser(user_Account.data);
  }

  useEffect(() => {
    resetUser();
  }, []);

  return (
    <div>
      <Header user={user} />
      <Routes>
        <Route path='/' element={<Home /* logout={logout} */ />} />
        <Route path='/create-blog' element={ user ? <CreateBlg user={user} /> : <Link to="/login" /> } /> 
        <Route path='/view-blogs' element={ user ? <BlogPage user={user} /> : <BlogPage /> } /> 
        <Route path='/view-indblog/:blogId' element={<IndBlogPage />} /> 
        <Route path='/view-profile/:userId' element={<UserProfilePage />} />
        <Route path='/login' element={<LoginPage setUser={setUser} />} /> 
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;