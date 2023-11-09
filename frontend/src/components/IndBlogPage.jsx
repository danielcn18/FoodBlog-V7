import { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import '../Styles/IndBlogPage.css';
import axios from 'axios';
import '../Styles/Root.css'
import sampleImg from '../Images/steak.png';

function IndBlogPage() {
  let params = useParams();
  const [blog, setBlog] = useState([]);
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    axios
      .get('http://localhost:5000/blogs/Indblog/' + params.blogId)
      .then((result) => {
        setBlog(result.data.data);
        axios 
          .get("http://localhost:5000/users/find-profile-by-author/" + result.data.data.author)
          .then((result) => {
            setUser(result.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div className="indblog-grid">
      <img className="indblog-image" src={blog.imageUrl} />
      <p className="indblog-title">{blog.title}</p>
      <p className="indblog-credit">Written By {<Link className="td-none" to={`/view-profile/${user._id}`}>{blog.author}</Link>}</p>
      <p className="indblog-description">{blog.description}</p>
    </div>
  );
}

export default IndBlogPage;