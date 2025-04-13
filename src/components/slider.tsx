'use client'; 

import React, { useState } from 'react';
import { images as imageArray } from '../app/dummydata'; 

const Slider: React.FC = () => {
  const [activeDot, setActiveDot] = useState(0); // Track the active dot
  const [images, setImages] = useState(imageArray); 
  // Handle the arrow button click to rotate images and cycle dots
  const handleArrowClick = () => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const lastImage = newImages.pop(); 
      newImages.unshift(lastImage!); 
      return newImages;
    });

    // Cycle through dots (0, 1, 2)
    setActiveDot((prev) => (prev + 1) % 3);
  };

  return (
    <div className="w-full h-[28rem] bg-powderpink mt-6 flex overflow-hidden">
      
      {/* Left section for the first image */}
      <div className="relative h-[28rem] w-[23rem]">
        <img
          src={images[0].src}  
          alt="img"
          className="h-full w-[28rem] object-cover transition-all duration-700 ease-in-out"  
        /> 
        
        {/* White Box with dynamic content (image number and room type) */}
        <div className="absolute bottom-5 left-3 bg-white bg-opacity-60 p-4 w-[10rem] h-[6rem]">
            <p className="text-cusGray text-xs flex items-center mt-2 pl-1">
                {images[0]?.num}
                <span className="flex-grow mx-2 border-t border-cusGray"></span>
                {images[0]?.roomType}
            </p>
            <p className="text-xl font-bold text-CusBlck mt-4 pl-1">{images[0]?.title}</p>
        </div>

        {/* Arrow Button to cycle images */}
        <div className="absolute bottom-5 left-[11rem]">
          <button onClick={handleArrowClick} className="p-2 bg-drkyellow text-white rounded-full">
            <img src="Right.png" alt="Arrow" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Right section for the second image and slider dots */}
      <div className="flex flex-col gap-9 pl-5 h-[28rem] w-[22rem]">
        <img
          src={images[1].src}  
          alt="img"
          className="h-[23rem] w-full object-cover transition-all duration-700 ease-in-out" 
        /> 
        
        {/* Slider dots to indicate current active image */}
        <div className="flex items-center space-x-2 ml-1">
          {[0, 1, 2].map((dot, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                activeDot === dot ? 'bg-drkyellow' : 'bg-gray-300'
              }`}  
            ></div>
          ))}
        </div>
      </div>

      {/* Third section for the third image */}
      <div className="flex flex-col gap-9 pl-5 h-[28rem] w-[7.8rem]">
        <img
          src={images[2].src}  
          alt="img"
          className="h-[23rem] w-full object-cover transition-all duration-700 ease-in-out" 
        /> 
      </div>
    </div>
  );
};

export default Slider;
