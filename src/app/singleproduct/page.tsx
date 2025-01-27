import ImageSwapComponent from "@/components/ImageSwapComponent";
import Description from "@/components/description";
import Link from 'next/link';
import ProductCard from '@/components/product';
import { Button } from '@/components/ui/button';
import { products } from '@/app/dummydata';

export default function SingleProductPage() {
    return (
        <div className="h-auto">

            {/* Main header Section */}
            <div className="w-full h-[4rem] bg-cuspinky mt-6 flex flex-col items-center justify-center relative">
                <div className="mt-1 text-sm flex items-center left-16 absolute">
                    <span className="text-sm text-cusGray">Home</span>
                    <img src="arr.png" alt="arrow" className="mx-2 width-3 h-3" />
                    <span className="text-sm text-cusGray mr-6">Shop</span>
                    <span className="text-xl text-cusGray mr-6">|</span>
                    <span className="text-bold font-medium text-lg">Asgaard Sofa</span>
                </div>
            </div>

            {/* Image Swap Section */}
            <div className="h-[85rem] w-full lg:h-[48rem]">        
                <ImageSwapComponent />
            </div>

            {/* Description Section */}
            <div className="h-[63rem] lg:h-[37rem]">
                <Description />
            </div>

            {/* Related Products Section */}
            <div className="flex flex-col items-center mt-8">
                {/* Section Heading */}
                <p className="font-bold text-2xl text-CusBlck mb-4 text-center">Related Products</p>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4 sm:px-8 md:px-16 lg:px-32 justify-center">
                    {products.slice(0, 4).map((product, index) => (
                        <ProductCard
                            key={index}
                            src={product.src}
                            themeHeading={product.themeHeading}
                            name={product.name}
                            price={product.price}
                        />
                    ))}
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
