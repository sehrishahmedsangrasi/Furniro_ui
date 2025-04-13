"use client";

import ImageSwapComponent from "@/components/ImageSwapComponent";
import Description from "@/components/description";
import Link from 'next/link';
import ProductCard from '@/components/product';
import { Button } from '@/components/ui/button';
import { useProductDetails } from "@/extractdetails/ProductDetails"; 
import { client } from '@/lib/sanity'; 
import { useEffect,useState } from 'react';


type product_type = {
  _id: string;
  name: string;
  description: string;
  roomType?: string; 
  image: string;
  price: string;
};



export default function SingleProductPage() {
    const product = useProductDetails(); 
    const [products, setProducts] = useState<product_type[]>([]); 

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
          const data:product_type[] = await client.fetch(query);
          setProducts(data);
        };
    
        fetchProducts();
      }, []);

    return (
        <div className="min-h-full">

            {/* Main header Section */}
            <div className="w-full h-[4rem] bg-cuspinky mt-6 flex flex-col items-center justify-center relative">
                <div className="mt-1 text-sm flex items-center left-16 absolute">
                    <span className="text-sm text-cusGray">Home</span>
                    <img src="arr.png" alt="arrow" className="mx-2 width-3 h-3" />
                    <span className="text-sm text-cusGray mr-6">Shop</span>
                    <span className="text-xl text-cusGray mr-6">|</span>
                    <span className="text-bold font-medium text-lg">{product.themeHeading || "Product"}</span>
                </div>
            </div>

            {/* Image Swap Section */}
            <div className="h-[85rem] w-full lg:h-[48rem]">        
                <ImageSwapComponent
                src={product.src} 
                themeHeading={product.themeHeading} 
                name={product.name} 
                price={product.price} 
                />
            </div>

            {/* Description Section */}
            <div className="h-[63rem] lg:h-[37rem]">
                <Description />
            </div>

            {/* Related Products Section */}
            <div className="flex flex-col items-center mt-8">
                {/* Section Heading */}
                <p className="font-bold text-2xl text-CusBlck mb-4 text-center">Related Products</p>

                <div className='flex items-center justify-center min-h-[10rem] '>
                    {/* Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4 sm:px-8 md:px-16 lg:px-32 justify-center">
                    {products.slice(0, 4).map((product: product_type) => (
                        <ProductCard
                            key={product._id}
                            src={product.image} 
                            themeHeading={product.name} 
                            name={product.description} 
                            price={product.price} 
                        />
                    ))}
                    </div>
                </div>

                {/* Show More Button */}
                <Link href="/shop">
                    <div className="mt-6 flex justify-center">
                        <Button variant="yellowBorder" size="customlg3">Show More</Button>
                    </div>
                </Link>
            </div>
        </div>
    );
}
