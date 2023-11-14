import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/AccountPage.css';
import '../Styles/Root.css';
import defaultPfp from '../Images/Default_pfp.svg.png';

export default function AccountPage() {
  const [user, setUser] = useState([]);
  const [blogs, setBlogs] = useState([]);

  let params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/profile/" + params.userId)
      .then((result) => {
        setUser(result.data.data);
        setBlogs(result.data.blogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return(
    <>
      <div className="blog-account-main">
        <div className="blog-account-profile-background">
          <div className="blog-account-profile-img">
            <img src={ user.profileImg ? user.profileImg : defaultPfp } /> 
          </div>
        </div>
        <div className="blog-account-username">
          <p>{ user.username }</p>
        </div>
        <div className="blog-account-bio">
          <p>{ user.profileBio }</p>
        </div>
        <div className="blog-account-posts-title">
          <p>Blog Posts</p>
        </div>
        <div className="blog-account-posts">
          {blogs.map((blog) => {
            console.log(blog)
            return(
              <div className="blog-account-post">
                <img className="blog-account-post-img" />
                <p className="blog-account-post-date">11/2/23</p>
                <p className="blog-account-post-title">{ blog.title }</p>
                <p className="blog-account-post-description">{ blog.description }</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}