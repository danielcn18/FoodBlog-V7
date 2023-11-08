import { useState } from 'react';
import '../Styles/ImageSection.css';
import '../Styles/Root.css';
import  img1 from '../Images/steak.png'
import img2 from  '../Images/multfoodpic.png'
import img3 from '../Images/Food-Channel-Cover.png'

function ImageSection() {

  return (
    <div className="image-section-main">
        <div className="image-section">
          <div className="image-top-left"  > <p className='text1'>Discover <br />New <br /> Dishes </p></div>
          <img className="image-top-right" src={img1} width={100} />
          <img className="image-bottom-left" src={img2} />
          <div className="image-bottom-right" > <p className='text2'>Travel Your <br/> Palate</p> </div>
        </div>
    </div>
  )
}

export default ImageSection;