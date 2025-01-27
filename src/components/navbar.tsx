'use client';

 

const Navbar: React.FC = () => {
 

  return (
    <nav className="flex items-center px-6 py-4 pl-9 pb-5 text-white">
      {/* Left Section: Logo */}
      <div className="flex items-center pr-72">
        <div className="w-17 h-7 mr-3 flex">
          <img
            src="logo.png"
            alt="Logo"
            className="w-full h-full pr-1 mt-[2.2px]"
          />
          <span className="text-[1.5rem] font-semibold text-black">
            Furniro
          </span>
        </div>
      </div>

      {/* Middle Section: Navigation Links */}
      <div className="hidden md:flex space-x-8 text-black mr-[11rem] text-[0.9rem] font-semibold">
        <a href="\" className="hover:text-gray-700 pr-[4.2rem]">
          Home
        </a>
        <a href="\shop" className="hover:text-gray-700 pr-[4.2rem]">
          Shop
        </a>
        <a href="#about" className="hover:text-gray-700 pr-[3rem]">
          About
        </a>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center">
        <div className="w-7 h-6 rounded-full mr-9">
          <img src="accAlert.png" alt="Alert Icon" className="w-full h-full" />
        </div>
        <div className="w-7 h-6 rounded-full mr-9">
          <img src="heart.png" alt="Wishlist Icon" className="w-full h-full" />
        </div>
        <div className="w-7 h-6 rounded-full mr-9">
          <img src="search.png" alt="Search Icon" className="w-full h-full" />
        </div>
        <div className="w-7 h-6 rounded-full mr-7">
          <img src="shoppingcart.png" alt="Logo" className="w-full h-full pr-1" />
        </div>
          
        </div>
      

      {/* Responsive Adjustments */}
      <div className="flex md:hidden flex-col items-center w-full mt-4 space-y-3">
        <a href="\" className="text-black text-sm hover:text-gray-700">
          Home
        </a>
        <a href="\shop" className="text-black text-sm hover:text-gray-700">
          Shop
        </a>
        <a href="#about" className="text-black text-sm hover:text-gray-700">
          About
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
