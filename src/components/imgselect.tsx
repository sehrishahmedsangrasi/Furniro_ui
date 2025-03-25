'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../components/product';
import { client } from '../lib/sanity'; 


type Product = {
  _id: string;
  name: string;
  description: string;
  roomType?: string; 
  image: string;
  price: Number;
};

const ImgSelect = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  const [imageCount, setImageCount] = useState<number>(8); 
  const [filterType, setFilterType] = useState<string>('default'); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageGroup] = useState<number>(1); 

  
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"]{
        _id, 
        name, 
        description, 
        roomType,
        "image": image.asset->url, 
        price
      }`;
      const data: Product[] = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  
  const filteredImages = filterType === 'default'
    ? products.slice((currentPage - 1) * imageCount, currentPage * imageCount)
    : products
        .filter((img) => img.roomType === filterType)
        .slice((currentPage - 1) * imageCount, currentPage * imageCount);

 
  const handleImageCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setImageCount(value);
    }
  };

 
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  
  const totalPages = Math.ceil(products.length / imageCount);

  return (
    <>
      {/* Pink div with filter controls */}
      <div className="w-full h-[5rem] bg-cuspinky mt-1 flex items-center p-4">
        {/* Left side: Icons and Filters */}
        <div className="flex items-center space-x-4 w-[55rem]">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img src="icon1.png" alt="icon1" className="w-[1.2rem] h-[1.2rem] pr-1" />
              <span className="text-sm lg:block hidden">Filters</span>
            </div>
            <img src="icon2.png" alt="icon2" className="w-4 h-4" />
            <img src="icon3.png" alt="icon3" className="w-4 h-4" />
            <span>|</span>
          </div>

          {/* Right side of the Left div: Showing count */}
          <span className="ml-auto text-sm lg:block hidden">
            {`Showing ${filteredImages.length} of ${products.length} images`}
          </span>
        </div>

        {/* Right side: Image Count and Filter */}
        <div className="flex items-center space-x-4">
          <span className="ml-2 text-sm">Show</span>
          <div className="flex items-center">
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
            <span className="mr-2 text-sm hidden lg:block md:block">Sort by</span> 
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-32 p-2 hover:bg-slate-100 text-sm"
            >
              <option value="default">Types</option>
              <option value="bedroom">Bedroom</option>
              <option value="sofa">Sofa</option>
              <option value="livingroom">Livingroom</option>
              <option value="table">Tables</option>
              <option value="lamps">Lamps</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        {/* Display the filtered products outside the pink div */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {filteredImages.map((product) => (
            <div key={product._id}>
              <ProductCard
                src={product.image}
                themeHeading={product.name}
                name={product.description}
                price={String(product.price)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(3)].map((_, index) => {
          const pageNumber = pageGroup * 3 - 2 + index;
          return pageNumber <= totalPages ? (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 text-sm mx-1 rounded-lg ${
                currentPage === pageNumber ? 'bg-drkyellow text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
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
