import React from 'react';


type ImageComponentProps = {
  src: string;    
  heading: string; 
};


const ImageComponent: React.FC<ImageComponentProps> = ({ src, heading }) => {
  return (
    <div className="inline-block w-[20rem] transform transition-transform duration-300 ease-in-out hover:scale-105">
      
      {/* Image element with full width and automatic height */}
      <img src={src} alt="displayed" className="block w-full h-auto" />
      
      {/* Centered heading text displayed below the image */}
      <div className="text-center text-black p-2 mt-2">
        {heading}
      </div>
    </div>
  );
};


export default ImageComponent;
