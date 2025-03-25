import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

type ProductCardProps = {
  src: string;
  themeHeading: string;
  name: string;
  price: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ src, themeHeading, name, price }) => {
  return (
    <div className="relative inline-block lg:w-[15rem] w-[17rem] border h-[25.5rem] overflow-hidden shadow-lg bg-custGray transform transition-transform duration-300 hover:scale-105">
      {/* Image */}
      <img src={src} alt="Product" className="block w-full h-[17rem]" />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-700 hover:scale-101">
        {/* Add to Cart Button */}
        <Link href="/singleproduct">
          <Button variant="whiteCustom" size="customlg2">Add to cart</Button>
        </Link>
        {/* Like and Share Options */}
        <div className="flex items-center gap-6">
            <div className="flex items-center">
                <div className=" w-6  h-6 rounded-full flex items-center justify-center ">
                <img src="share.png" alt="Share" className="w-[0.85rem] h-[0.85rem]" />
                </div>
                <span className='text-white text-sm'>Share</span>
            </div>
            {/* Placeholder for Like and Share Icons */}
            <div className="flex items-center ">
                <div className=" w-6 h-6 rounded-full flex items-center justify-center">
                <img src="hrt.png" alt="Like" className="w-[0.85rem] h-[0.85rem]" />
                </div>
                <span className='text-white text-sm'>Like</span>
            </div>
        
        </div>
        
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Theme Heading */}
        <h3 className="text-lg font-semibold text-CusBlck mt-2">{themeHeading}</h3>
        {/* Name */}
        <p className="text-sm text-cusGray mt-1">{name}</p>
        {/* Price */}
        <p className="text-md font-bold text-CusBlck mt-1">Rp {price}</p>
      </div>
      
    </div>
  );
};

export default ProductCard;

