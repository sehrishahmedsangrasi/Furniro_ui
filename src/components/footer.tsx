import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 ">
      {/* Top Divider Line */}
      <div className="h-[0.05rem] w-full bg-gray-300"></div>

      {/* Footer Content */}
      <div className="flex flex-wrap justify-between items-start mt-16 px-8 lg:px-20">

        {/* Logo Section */}
        <div className="w-full lg:w-[29%] mb-6">
          <h1 className="text-4xl font-bold text-black">Funiro.</h1>
        </div>

        {/* Navigation Links Column */}
        <div className="w-full lg:w-1/5 mb-6">
          <h2 className="font-semibold mb-12 text-cusGray">Links</h2>
          <ul className="space-y-7 mt-1">
            <li>
              <a href="\" className="text-black hover:text-CusBlck text-bold">
                Home
              </a>
            </li>
            <li>
              <a href="\shop" className="text-black hover:text-CusBlck text-bold">
                Shop
              </a>
            </li>
            <li>
              <a href="\about" className="text-black hover:text-CusBlck text-bold">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="text-black hover:text-CusBlck text-bold">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Help Links Column */}
        <div className="w-full lg:w-1/5 mb-6">
          <h2 className="font-semibold mb-12 text-cusGray">Help</h2>
          <ul className="space-y-7">
            <li>
              <a
                href="#payment-options"
                className="text-black hover:text-CusBlck text-bold"
              >
                Payment Options
              </a>
            </li>
            <li>
              <a
                href="#returns"
                className="text-black hover:text-CusBlck text-bold"
              >
                Returns
              </a>
            </li>
            <li>
              <a
                href="#privacy-policies"
                className="text-black hover:text-CusBlck text-bold"
              >
                Privacy Policies
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup Section */}
        <div className="w-full lg:w-[30%]">
          <h2 className="font-semibold mb-12 text-cusGray">Newsletter</h2>
          <div className="flex">

            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter Your email address"
              className="w-full py-2 text-sm text-gray-800 border-b border-black focus:outline-none focus:border-gray-600"
            />
            
            {/* Subscribe Button */}
            <button className="ml-2 bg-white text-black border-b border-black px-4 py-2 text-bold hover:bg-gray-100">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Divider Line */}
      <div className="h-[0.09rem] mt-7 w-[90%] ml-[2.5rem] bg-gray-300"></div>
      
      {/* Footer Bottom Text */}
      <p className="mt-6 ml-[4rem]">2023 Funiro. All rights reserved</p>
    </footer>
  );
};

export default Footer;
