import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import "../Styles/Createblog.css"
import img1 from '../public/food.jpg'


function CreateBlg({user}) {
  const cloud_name="ddtruv2cm";

  const [blogForm, setBlogForm] = useState({
    author: "",
    title: "", 
    description: "",
    dishOrigin: "",
    category: "",
    imageUrl: "",
  });

  const [image, setImage] = useState();
  const inputsHandler = (e) => {
    setBlogForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  }

  const cloudHandler = (e) => {
    const formData = new FormData(); 
    
    formData.append('file', e.target.files[0]);
    formData.append("upload_preset", 'Blogimages');

    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((res) => {      
        const imageurl = res.data.secure_url;
        blogForm.imageUrl = imageurl;
        setImage(imageurl);
      });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    blogForm.author = user.username;
    axios
      .post('http://localhost:5000/blogs/create-blog', blogForm)
      .then((res) => {
        console.log(res.data.data);
        setBlogForm({
          author: "",
          title:"",
          description: "",
          dishOrigin: "",
          category: "",
          imageUrl: "",
        });
      });
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="image-container">
  <img id='foodpic' src={img1} alt="World Kitchen Wonders" />
</div>

<form onSubmit={onSubmit}>
  <div id="boxes">

    <div id="left-box">
      <div id="inside-left-box">
        <label for="title" id="title">Title:</label> 
        <div className="top-inputs">
          <input id="titlebox" name="title" type="text" placeholder="Title" value={blogForm.title} onChange={inputsHandler}/>
        </div>

        <label for="Description" id="title">Description:</label>
        <div className="top-inputs">
          <textarea id="Description" name="description" placeholder="Description" value={blogForm.description} onChange={inputsHandler}></textarea>
        </div>
      </div>
    </div>

    <div id="right-box"> 
      <div id="selecting">
        <select name="category" id="category" value={blogForm.category} onChange={inputsHandler} >
          <option value="Category" selected hidden>Category</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Side Dishes">Side Dishes</option>
          <option value="Salads">Salads</option>
          <option value="Beverages">Beverages</option>
          <option value="Desserts">Desserts</option>
          {/* More category options */}
        </select>

        <select name="dishOrigin" id="Dish-Origin" value={blogForm.dishOrigin} onChange={inputsHandler}>
          <option value="Dish Origin" selected hidden>Dish Origin</option>
          <option value="Asian">Asian</option>
          <option value="European">European</option>
          <option value="American">American</option>
          <option value="Mexican">Mexican</option>
          <option value="Indian">Indian</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Thai">Thai</option>
          <option value="Vietnamese">Vietnamese</option>
          <option value="Chinese">Chinese</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Spanish">Spanish</option>
          <option value="South American">South American</option>
          <option value="North African">North African</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Central and South America">Central & South America</option>
          <option value="Australia/Oceania">Australia / Oceania</option>
          <option value="East Asia">East Asia</option>
          <option value="West Africa">West Africa</option>
          <option value="Sub-Saharan Africa">Sub-Saharan Africa</option>
          <option value="British Isles">British Isles</option>
          <option value="Caucasus">Caucasus</option>
          <option value="Scandinavia">Scandinavia</option>
          <option value="Russia, Central Asia, CIS countries">Russia, Central Asia, CIS Countries</option>
          <option value="South Asia">South Asia</option>
          <option value="Eastern Europe">Eastern Europe</option>
          <option value="Western Europe">Western Europe</option>
          <option value="Latin America">Latin America</option>
          <option value="Greenland">Greenland</option>
          <option value="Iceland">Iceland</option>
          <option value="Canada">Canada</option>
          <option value="USA">USA</option>
          <option value="Other World Regions">Other World Regions</option>
          {/* More dish origin options */}
        </select>
      </div>

      <label for="Content" id="title">Insert Image:</label>
      <div className="top-inputs">
        <input id="files" name="file" type="file" onChange={cloudHandler} onSubmit={inputsHandler} placeholder="Insert Image" />
      </div>
    </div>

  </div>
  <button className="post-button">Post</button>
</form>

    </>
  );
}

export default CreateBlg;
