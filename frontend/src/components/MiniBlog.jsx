import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import '../Styles/MiniBlog.css';
import '../Styles/Root.css';
// import img1 from '../Images/mini_img.jpg';
import axios from 'axios';

function MiniBlog() {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/blogs/")
      .then((result) => {
        setBlogs(result.data.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {blogs.map((userBlog) => {
        return (
          <div className="mini-blog-body">
            <img className="mini-blog-image" src={userBlog.imageUrl} alt="mini blog img" />
            <div className="mini-blog-more">
              <p className="mini-blog-date">Date: {userBlog.createdAt}</p>
                <p className="mini-blog-username">{userBlog.author}</p>
                <p className="mini-blog-title">{userBlog.title}</p>
                <p className="mini-blog-description">{userBlog.description}</p>
              <Link className="mini-blog-read-more" to={`/view-indblog/${userBlog._id}`}>Read More</Link>
            </div>
          </div>
        );
      })}
    </>
  )
}

export default MiniBlog;