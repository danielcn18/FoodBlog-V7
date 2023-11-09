import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import '../Styles/Home.css';
import '../Styles/Root.css';
import img1 from '../Images/steak.png';
import img2 from '../Images/multfoodpic.png';

function Home() {

  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/blogs/")
      .then((result) => {
        setBlogs(result.data.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });

    // Must have second axios here b/c it will just keep reloading and making an infinite loop
    // Make axios setUser() here in useEffect()

    // blogs.map((blog) => {
    //   axios 
    //     .get("http://localhost:5000/blogs/profile/" + blog._id)
    //     .then((result) => {
    //       // console.log(result.data.data);
    //       setUsers((prev) => [
    //         ...prev, result.data.data
    //       ]);
    //       // console.log(users);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });

    // blogs.map((blog) => {
    //   axios
    //     .get('http://localhost:5000/blogs/Indblog/' + blog._id)
    //     .then((result) => {
    //       axios 
    //         .get("http://localhost:5000/users/find-profile-by-author/" + result.data.data.author)
    //         .then((result) => {
    //           setUsers(result.data.data);
    //           console.log(users);
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });

  }, []);

  return(
    <>
      <div className="image-section-main">
        <div className="image-section">
          <div className="image-top-left"  > <p className='text1'>Discover <br />New <br /> Dishes </p></div>
          <img className="image-top-right" src={img1} width={100} />
          <img className="image-bottom-left" src={img2} />
          <div className="image-bottom-right" > <p className='text2'>Travel Your <br/> Palate</p> </div>
        </div>
      </div>
      <div className="news-body">
        <div className="news-title">
          <p>Latest</p>
        </div>
        <div className="news-show" id='scroll' >
          {blogs.map((blog, index) => {
            // console.log(index)
            // console.log(users)
            // console.log(users[index])
            // axios 
            //   .get("http://localhost:5000/blogs/profile/" + blog._id)
            //   .then((result) => {
            //     setUser(result.data.data);
            //   })
            //   .catch((error) => {
            //     console.log(blog._id)
            //     console.log(error);
            //   });
            
            // axios
            //   .get('http://localhost:5000/blogs/Indblog/' + blog._id)
            //   .then((result) => {
            //     axios 
            //       .get("http://localhost:5000/users/find-profile-by-author/" + result.data.data.author)
            //       .then((result) => {
            //         setUser(result.data.data);
            //         console.log(user);
            //       })
            //       .catch((error) => {
            //         console.log(error);
            //       });
            //   })
            //   .catch((error) => {
            //     console.log(error);
            //   });
            const year = blog.createdAt.slice(0, 4),
              month = blog.createdAt.slice(5, 7),
              day = blog.createdAt.slice(8, 10);
            return(
              <div className="mini-blog-body">
                <img className="mini-blog-image" src={blog.imageUrl} alt="mini blog img" />
                <div className="mini-blog-more">
                  <p className="mini-blog-date">Date: {`${day}-${month}-${year}`}</p>
                  <p className="mini-blog-username">{/* {<Link className="td-none" to={`/view-profile/${users[]._id}`}> */}{blog.author}{/* </Link>} */}</p>
                  <p className="mini-blog-title">{blog.title}</p>
                  <p className="mini-blog-description">{blog.description}</p>
                  <Link className="mini-blog-read-more" to={`/view-indblog/${blog._id}`}>Read More</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;


