import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import '../Styles/Header.css';
import '../Styles/Root.css';
import logo from '../Images/World_Kitchen_Wonders_logos_black.png';
import icon1 from '../public/instagram_icon.png'
import icon2 from '../public/facebook_logo.png'
import icon3 from '../public/twitter_icon.png'

export default function Header({user, setUser}) {
  const [show, setShow] = useState(false);
  const [xFactor, setXFactor] = useState(false);

  function logOut() {
    /* window.localStorage.setItem("user_account", "{}"); */
    /* setUser(); */
  }

  function dropDown() {
    return(
      <div className="header-dropdown"
        onMouseEnter={() => {
          setShow(true);
          setXFactor(true);
        }}
        onMouseLeave={() => {
          setShow(false);
          setXFactor(false);
        }}
      >
        <div className="dropdown-column">
          <Link to={ user ? `/view-profile/${user._id}` : <Link to="/login" />}>Profile</Link>
          <button type="button" /* onClick={logOut()} */>Log Out</button>
          <button type="button" /* onClick={logOut()} */>Delete Account</button>
          {/* <Link to={"/"}>Log Out</Link> */}
        </div>
        <div className="dropdown-column">
          <Link to={"/create-blog"}>Create Blog</Link>
        </div>
      </div>
    );
  }

  function accountMenu() {
    return(
      <>
        <p>{user.username}</p>
        <i className="arrow arrow-down"></i>
      </>
    );
  }

  useEffect(() => {

  }, []);

  return(
    <>
      <header className="header">
        <div className="header-head">
          <div className="header-socials">
            <a href="#">
              <img src={icon1} alt="Instagram Icon" />
            </a>
            <a href="#">
              <img src={icon2} alt="FaceBook Icon" />
            </a>
            <a href="#">
              <img src={icon3} alt="Twitter Logo" />
            </a>
          </div>
          <div className="header-login" 
            onMouseEnter={() => {
              setShow(true);
            }} 
            onMouseLeave={() => {
              setTimeout(() => {
                if(!xFactor) setShow(false);
              }, 750);
            }}
          >
            {user ? accountMenu() : <Link to={"/login"}>Login</Link>}
          </div>
        </div>
      </header>
      <div className="sub-header">
        {/* if show is true, display dropDown() */}
        { user ? (show && dropDown()) : "" }
        <div className="header-title">
          <p className="header-p">
            <Link className="no-decor main-color" to={`/`}>World Kitchen Wonders</Link>
          </p>
          <Link className="no-decor main-color" to={`/`}>
            <img className="header-img" src={logo} alt="logo" /> 
          </Link>
        </div>
        <nav className="header-subtopics">
          <Link to={"/view-blogs"}>Discover More</Link> 
        </nav>
      </div>
    </>
  );
}
