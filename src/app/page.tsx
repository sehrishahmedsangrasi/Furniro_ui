import { client } from '../lib/sanity';
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import ImageComponent from '../components/img';
import ProductCard from '../components/product';
import Slider from '../components/slider';
import Link from 'next/link';

// Fetch data from Sanity 
const getProducts = async () => {
  const query = `*[_type == "product"]{ _id, description, name, "image": image.asset->url, price }`;
  return await client.fetch(query);
};

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-[230rem]">

      {/* Page Head */}
      <Head>
        <title>Home Page</title>
      </Head>

      {/* Banner Section */}
      <div className="relative w-full h-[42.5rem] overflow-hidden">
        <img src="/fur_main.jpeg" alt="Logo" className="w-full h-full object-cover object-bottom" />
        <div className="absolute bottom-44 right-4 w-[20rem] lg:w-[36rem] p-4 mr-2 pl-6 lg:h-[19.5rem] h-[21.5rem] bg-dullyellow rounded-lg shadow-lg text-black">
          <p className="text-black text-sm mt-[1.5rem]">New Arrival</p>
          <h2 className="text-[2rem] font-bold mb-2 mt-1 text-drkyellow">
            Discover Our <br /> New Collection
          </h2>
          <p className="text-sm mb-9">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, officia voluptatem? Excepturi soluta suscipit dolore impedit.
          </p>
          <Button size="customlg" variant="yellowcustom">Buy Now</Button>
        </div>
      </div>

      {/* Browse the Range Section */}
      <div className="flex flex-col items-center mt-16">
        <p className="font-bold">Browse The Range</p>
        <p className="mt-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus error recusandae minima, in eum consequatur.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16 lg:mr-32 lg:ml-32 mx-5">
          <ImageComponent src="dining.png" heading="Dining" />
          <ImageComponent src="livingroom.png" heading="Living" />
          <ImageComponent src="bedroom.png" heading="Bedroom" />
          <div className="hidden md:block lg:hidden">
            <ImageComponent src="Dining.png" heading="Launch" />
          </div>
        </div>
      </div>

      {/* Our Product Section */}
      <div className="flex flex-col items-center mt-16">
        <p className="font-bold text-2xl text-CusBlck">Our Products</p>
        <div className="flex items-center justify-center min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full lg:px-32 md:px-20 mx-auto">
            {products.map((product: any) => (
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
        <Link href="/shop">
          <div className="mt-10">
            <Button variant="yellowBorder" size="customlg3">Show More</Button>
          </div>
        </Link>
      </div>

      {/* Inspirational Rooms Section */}
      <div className='w-full h-[32rem] bg-powderpink mt-6 flex items-center'>
        <div className='lg:ml-12 ml-10 h-[20rem] w-auto p-4 '>
          <div className='h-[24rem] lg:w-[21rem] p-4'>
            <p className='mt-20 font-bold text-[1.7rem] text-CusBlck'>50+ Beautiful rooms</p>
            <p className='font-bold text-[1.7rem] text-CusBlck'>inspiration</p>
            <p className='text-xs mt-[0.35rem] text-[#616161]'>
              Our designer has already a lot of beautiful prototypes of rooms that inspire you
            </p>
            <div className='mt-6'>
              <Link href="/shop">
                <Button size="customlg" variant="yellowcustom">Explore More</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Component */}
        <div className="lg:block hidden">
          <Slider />
        </div>
      </div>

      {/* Image Section */}
      <div className='w-full h-[30rem] mt-16'>
        <img src="mixpics.png" alt="img" />
      </div>
    </div>
  );
}
