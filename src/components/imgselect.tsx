'use client';
import { products } from '../app/dummydata';
import ProductCard from '../components/product';
import React, { useState } from 'react';

const ImgSelect = () => {
  const [imageCount, setImageCount] = useState(8); // Default to 8 images per page
  const [filterType, setFilterType] = useState('default'); // Default category
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [pageGroup] = useState(1); // Track the current page group (1-3 etc.)

  // Filter images based on the selected filter type
  const filteredImages = filterType === 'default'
    ? products.slice((currentPage - 1) * imageCount, currentPage * imageCount)
    : products.filter(img => img.roomType === filterType).slice((currentPage - 1) * imageCount, currentPage * imageCount);

  // Handle changes in the image count
  const handleImageCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setImageCount(value);
    }
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / imageCount);

  return (
    <>
      {/* Pink div with filter controls */}
      <div className="w-full h-[5rem] bg-cuspinky mt-1 flex items-center p-4">
        {/* Left side: Icons and Filters */}
        <div className="flex items-center space-x-4 w-[55rem] ">
          <div className="flex items-center space-x-4">
            <div className='flex items-center '>
              <img src="icon1.png" alt="icon1" className="w-[1.2rem] h-[1.2rem] pr-1" />
              <span className='text-sm'>Filters</span>
            </div>
            <img src="icon2.png" alt="icon2" className="w-4 h-4" />
            <img src="icon3.png" alt="icon3" className="w-4 h-4" />
            <span>|</span>
          </div>

          {/* Right side of the Left div: Showing count */}
          <span className="ml-auto text-sm">{`Showing ${filteredImages.length} of ${products.length} images`}</span>
        </div>

        {/* Right side: Image Count and Filter */}
        <div className="flex items-center space-x-4">
          <span className="ml-2 text-sm">Show</span>
          <div className="flex items-center ">
            <input
              type="number"
              value={imageCount}
              onChange={handleImageCountChange}
              className="w-16 p-2 text-sm"
              min={1}  
              max={16}
            />
          </div>

          <div className="flex items-center">
            <span className="mr-2 text-sm ">Short by</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-32 p-2 hover:bg-slate-100 text-sm"
            >
              <option value="default">Default</option>
              <option value="bedroom">Bedroom</option>
              <option value="sofa">Sofa</option>
              <option value="livingroom">Livingroom</option>
              <option value="table">Tables</option>
              <option value="lamps">Lamps</option>
            </select>
          </div>
        </div>
      </div>

      {/* Display the filtered products outside the pink div */}
      <div className="mt-4 grid grid-cols-4 gap-4 p-4 ml-[3rem]">
        {filteredImages.map((image, index) => (
          <div key={index}>
            <ProductCard
              src={image.src}
              themeHeading={image.roomType}
              name={image.name}
              price={image.price}
            />
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {/* Page number buttons 1, 2, 3 */}
        {[...Array(3)].map((_, index) => {
          const pageNumber = pageGroup * 3 - 2 + index;
          return pageNumber <= totalPages ? (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 text-sm mx-1 rounded-lg ${currentPage === pageNumber ? 'bg-drkyellow text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {pageNumber}
            </button>
          ) : null;
        })}
      </div>
    </>
  );
};

export default ImgSelect;
