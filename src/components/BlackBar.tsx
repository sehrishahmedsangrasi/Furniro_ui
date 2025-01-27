import React from 'react';

const BlackBar = () => {
  return (
    <div className="bg-black h-[14rem] mt-14 flex items-center pl-[4rem] absolute bottom-0 right-0 left-0">

      {/* Container for all features with equal spacing */}
      <div className="flex justify-between space-x-4">
        
        {/* Feature: High Quality */}
        <div className="flex items-center pr-4">
          <div>
            <img src="trophy.png" alt="High Quality" className="h-16 w-[4.5rem] pl-2 pr-2" />
          </div>
          <div className="flex flex-col">
            <span className="text-drkyellow text-xl font-bold">High Quality</span>
            <span className="text-lg text-cusGray">Crafted from top materials</span>
          </div>
        </div>

        {/* Feature: Warranty Protection */}
        <div className="flex items-center pr-4">
          <div>
            <img src="guarantee.png" alt="Warranty Protection" className="h-16 w-[4.5rem] pl-2 pr-2" />
          </div>
          <div className="flex flex-col">
            <span className="text-drkyellow text-xl font-bold">Warranty Protection</span>
            <span className="text-lg text-cusGray">Over 2 years</span>
          </div>
        </div>

        {/* Feature: Free Shipping */}
        <div className="flex items-center pr-4">
          <div>
            <img src="shipping.png" alt="Free Shipping" className="h-16 w-[4.5rem] pl-2 pr-2" />
          </div>
          <div className="flex flex-col">
            <span className="text-drkyellow text-xl font-bold">Free Shipping</span>
            <span className="text-lg text-cusGray">Order over 150 $</span>
          </div>
        </div>

        {/* Feature: 24/7 Support */}
        <div className="flex items-center pr-4">
          <div>
            <img src="customer-support.png" alt="24/7 Support" className="h-16 w-[4.5rem] pl-2 pr-2" />
          </div>
          <div className="flex flex-col">
            <span className="text-drkyellow text-xl font-bold">24/7 Support</span>
            <span className="text-lg text-cusGray">Dedicated support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackBar;
