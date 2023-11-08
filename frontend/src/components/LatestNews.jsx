import { useState, useEffect } from 'react';
import '../Styles/LatestNews.css';
import '../Styles/Root.css';
import MiniBlog from './MiniBlog';

function LatestNews({allBlogs}) {
  
  return (
    <>
      <div className="news-body">
        <div className="news-title">
          <p>Latest</p>
        </div>
        <div className="news-show" id='scroll' >
          <MiniBlog /> 
        </div>
      </div>
    </>
  )
}

export default LatestNews;