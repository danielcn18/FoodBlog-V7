import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ImageSection from './ImageSection';
import LatestNews from './LatestNews.jsx';
import '../Styles/Home.css';
import '../Styles/Root.css';

function Home() {

  useEffect(() => {}, []);

  return(
    <>
      <ImageSection />
      <LatestNews />
    </>
  );
}

export default Home;


