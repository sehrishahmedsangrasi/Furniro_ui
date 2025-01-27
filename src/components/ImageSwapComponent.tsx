'use client';
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link';

// Define types
interface Product {
  src: string;
  src1: string;
  src2: string;
  src3: string;
  src4: string;
  themeHeading: string;
  name: string;
  price: string;
  roomType: string;
  description: string;
  sizes: string[];
  colors: string[];
}

interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  image: string;
}

const ImageSwapComponent: React.FC = () => {
  // Product details object
  const product: Product = {
    src: "Asgaardsofa3.png", 
    src1: "Asgaardsofa2.png", 
    src2: "Asgaardsofa5.png", 
    src3: "Asgaardsofa1.png", 
    src4: "Asgaardsofa4.png", 
    themeHeading: "Syltherine",
    name: "Asgaard sofa",
    price: "Rp 250,000.00",
    roomType: "Bedroom",
    description:
      "A stylish cafe chair perfect for your modern interiors. Comfortable, durable, and designed to make your space stand out.",
    sizes: ["XS", "L", "XL"], // Available sizes
    colors: ["#816DFA", "#000000", "#B88E2F"], // Available colors
  };

  // State management
  const [selectedSize, setSelectedSize] = useState<string>("L"); // Default selected size
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]); // Default selected color
  const [quantity, setQuantity] = useState<number>(1); // Default quantity is 1
  const [bigImage, setBigImage] = useState<string>(product.src); // Main image state
  const [smallImages, setSmallImages] = useState<string[]>([
    product.src1,
    product.src2,
    product.src3,
    product.src4,
  ]); // Alternate small images
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Cart items state with defined type

  // Handlers for various actions
  const handleSizeChange = (size: string) => setSelectedSize(size); // Change size
  const handleColorChange = (color: string) => setSelectedColor(color); // Change color
  const handleQuantityChange = (operation: string) => {
    if (operation === "increment") setQuantity(prev => prev + 1); // Increment quantity
    else if (operation === "decrement" && quantity > 1) setQuantity(prev => prev - 1); // Decrement quantity, ensuring it stays > 1
  };

  // Add item to the cart
  const handleAddToCart = () => {
    const newCartItem: CartItem = {
      product,
      selectedSize,
      selectedColor,
      quantity,
      image: bigImage,
    };
    setCartItems(prevCartItems => [...prevCartItems, newCartItem]); // Add new item to the cart
  };

  // Remove item from the cart
  const handleRemoveFromCart = (index: number) => {
    setCartItems(prevCartItems => prevCartItems.filter((_, i) => i !== index)); // Remove the item at the specified index
  };

  // Handle image click to swap the main image
  const handleImageClick = (clickedImage: string, index: number) => {
    const newSmallImages = [...smallImages];
    newSmallImages[index] = bigImage; // Swap clicked image with the current main image
    setSmallImages(newSmallImages); // Update small images
    setBigImage(clickedImage); // Set new big image
  };

  return (
    <div className="h-[45rem] w-full flex mt-9 flex-wrap sm:flex-nowrap">
      {/* Left Section - Image display */}
      <div className="h-[21rem] sm:h-[47rem] w-full sm:w-1/2 flex flex-wrap sm:flex-nowrap">
        {/* Thumbnail images for image swap */}
        <div className="sm:h-[23rem] sm:w-[10rem] h-[4rem] w-full flex sm:flex-col flex-row gap-6 sm:items-end justify-center items-center">
          {smallImages.map((imgSrc, index) => (
            <div
              key={index}
              className="flex bg-cuspinky items-center justify-center rounded-lg h-[4rem] w-[7rem] cursor-pointer sm:w-[4.6rem] sm:h-[4.3rem] transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => handleImageClick(imgSrc, index)} // Change the big image on click
            >
              <img
                src={imgSrc}
                alt={`Small ${index}`}
                className="h-auto max-h-full w-auto max-w-full"
              />
            </div>
          ))}
        </div>

        {/* Main large image display */}
        <div className="h-[20rem] sm:h-[28rem] w-full sm:w-[87%] flex justify-center mt-2">
          <div className="bg-cuspinky h-[28rem] w-full sm:w-[87%] flex items-center justify-center rounded-lg">
            <img src={bigImage} alt="Big Display" className="h-full w-auto" />
          </div>
        </div>
      </div>

      {/* Right Section - Product details, size/color selection */}
      <div className="h-[47rem] w-full sm:w-1/2 flex flex-col mt-[12rem] sm:mt-0">
        <div className="h-[34rem] w-full">
          <div className="h-[28.2rem] w-full">
            {/* Product name and price */}
            <h1 className="text-2xl">{product.name}</h1>
            <p className="text-lg text-greyish">{product.price}</p>

            {/* Product description */}
            <p className="mt-10 text-sm text-gray-700 h-[4.4rem] mr-20">{product.description}</p>

            {/* Size selection */}
            <h2 className="text-sm text-greyish mt-5 pb-3">Size</h2>
            <div className="flex gap-4 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedSize === size ? "bg-drkyellow text-white" : "bg-white text-black"
                  }`}
                  onClick={() => handleSizeChange(size)} // Change size on click
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Color selection */}
            <h2 className="text-sm text-greyish mt-8 pb-3">Color</h2>
            <div className="flex gap-4 mt-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border ${
                    selectedColor === color ? "border-CusBlck" : `border-${color}`
                  }`}
                  style={{ backgroundColor: color }} // Display color
                  onClick={() => handleColorChange(color)} // Change color on click
                />
              ))}
            </div>

            {/* Quantity and Add to Cart button */}
            <div className="flex items-center gap-6 mt-10">
              {/* Quantity selector */}
              <div className="flex items-center gap-2 border border-greyish rounded py-1">
                <button
                  className="px-3 py-1 rounded"
                  onClick={() => handleQuantityChange("decrement")} // Decrease quantity
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="px-3 py-1 rounded"
                  onClick={() => handleQuantityChange("increment")} // Increase quantity
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <Sheet>
                <SheetTrigger
                  className="px-6 py-2 bg-white text-black rounded-lg border border-black hover:bg-gray-100"
                  onClick={handleAddToCart} // Add item to cart
                >
                  Add To Cart
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="mb-2 mr-10 text-xl font-bold relative">Shopping Cart</SheetTitle>
                    <SheetDescription>
                      <span className="border-t border-greyish"></span>
                      {cartItems.length > 0 ? (
                        <>
                          {/* Cart items display */}
                          {cartItems.map((item, index) => (
                            <div key={index} className="mt-7 flex w-full gap-6">
                              <div className="flex bg-cuspinky items-center justify-center rounded-2xl h-[6rem] w-[8rem]">
                                <img
                                  src={item.image}
                                  alt="pic"
                                  className="h-auto max-h-full w-auto max-w-full"
                                />
                              </div>
                              <div className="mt-6 flex gap-8">
                                <div>
                                  <span className="font-medium">Name:</span>
                                  <span>{item.product.name}</span>
                                </div>
                                <div>
                                  <span className="font-medium">Size:</span>
                                  <span>{item.selectedSize}</span>
                                </div>
                                <div>
                                  <span className="font-medium">Quantity:</span>
                                  <span>{item.quantity}</span>
                                </div>
                                <div>
                                  <span className="font-medium">Color:</span>
                                  <span
                                    className="w-6 h-6 rounded-full"
                                    style={{ backgroundColor: item.selectedColor }}
                                  />
                                </div>
                                <button
                                  className="font-medium"
                                  onClick={() => handleRemoveFromCart(index)} // Remove item from cart
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>No items in cart</p>
                      )}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
             </div>
          </div>
        </div>
        {/*Small details div*/}
        <div className="h-[10rem] w-full relative">
          <div className="h-[0.09rem] w-[90%] bg-gray-300 absolute top-0 left-0"></div>
            <div className="text-greyish text-sm mt-9 ml-9">
              <span className="block mb-5">
                SKU <p className="inline pl-9"> : SS001</p>
              </span>
              <span className="block mb-5">
                Category <p className="inline pl-1"> : Sofas</p>
              </span>
              <span className="block mb-5">
                Tags <p className="inline pl-8"> : Sofas, Chair, Home, Shop</p>
              </span>
                <div className="flex items-center space-x-2 gap-2"> 
                  <span>
                    <p className="inline pr-3">Share</p>
                  </span>
                  <span>:</span>
                  <img src="fb.png" alt="fb" className="h-4 w-4 " />
                  <img src="in.png" alt="in" className="h-4 w-4 " />
                  <img src="X.png" alt="X" className="h-4 w-4" />
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default ImageSwapComponent;
