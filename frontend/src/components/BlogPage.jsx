import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import '../Styles/BlogPage.css';
import Filters from './Filters';

function BlogPage() {

  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/blogs/latest")
      .then((result) => {
        setBlogs(result.data.data.reverse());
        setUsers(result.data.users.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="blog-grid">
      <div className="blog-section-body">
        {blogs.map((blog, index) => {
          const year = blog.createdAt.slice(0, 4),
            month = blog.createdAt.slice(5, 7),
            day = blog.createdAt.slice(8, 10);

          if (users[index]) {
            return (
              // <Link className="td-none" /* to={`/view-indblog/${blog._id}`} */>
              <div className="blog-box-main" key={index}>
                <div className="blog-box">
                  <div className="blog-box-info">
                    <Link className="td-none" to={`/view-profile/${users[index]._id}`}>
                    <p className="blog-box-username">{blog.author}</p>
                  </Link>
                    <p className="blog-box-title">{blog.title}</p>
                    <p className="blog-box-description">{blog.description}</p>
                    <Link className="mini-blog-read-more" to={`/view-indblog/${blog._id}`}>Read More</Link>
                    <div className="blog-box-date-tags">
                      <p className="blog-box-date">Date Posted: {`${month}-${day}-${year}`}</p>
                      {/* <MiniTag /> */}
                    </div>
                  </div>
                  <div className="blog-box-image-body">
                    <img src={blog.imageUrl} alt="post image" className="blog-box-image" />
                  </div>
                </div>
              </div>
              // </Link>
            )
          }
        })}
      </div>

      {/* <BlogSection user={user} />
      <Filters /> */}
    </div>
  )
}

export default BlogPage;