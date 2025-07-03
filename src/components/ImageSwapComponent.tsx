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
import { useCart } from '@/components/CartContext'; // ✅ import useCart

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

type ProductCardProps = {
  src: string;
  themeHeading: string;
  name: string;
  price: string;
};

const ImageSwapComponent: React.FC<ProductCardProps> = ({ src, themeHeading, name, price }) => {
  const { cartItems, addToCart, removeFromCart } = useCart(); // ✅ use context

  const product: Product = {
    src: "Asgaardsofa3.png",
    src1: "Asgaardsofa2.png",
    src2: "Asgaardsofa5.png",
    src3: "Asgaardsofa1.png",
    src4: "Asgaardsofa4.png",
    themeHeading: name,
    name: themeHeading,
    price: `Rp ${price}`,
    roomType: "Bedroom",
    description:
      "A stylish cafe chair perfect for your modern interiors. Comfortable, durable, and designed to make your space stand out.",
    sizes: ["XS", "L", "XL"],
    colors: ["#816DFA", "#000000", "#B88E2F"],
  };

  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [bigImage, setBigImage] = useState<string>(src);
  const [smallImages, setSmallImages] = useState<string[]>([
    product.src1,
    product.src2,
    product.src3,
    product.src4,
  ]);

  const handleSizeChange = (size: string) => setSelectedSize(size);
  const handleColorChange = (color: string) => setSelectedColor(color);
  const handleQuantityChange = (op: string) => {
    if (op === "increment") setQuantity((q) => q + 1);
    else if (op === "decrement" && quantity > 1) setQuantity((q) => q - 1);
  };

  const handleAddToCart = () => {
    const item: CartItem = {
      product,
      selectedSize,
      selectedColor,
      quantity,
      image: bigImage,
    };
    addToCart(item); // ✅ add globally
  };

  const handleRemoveFromCart = (index: number) => {
    removeFromCart(index); // ✅ remove globally
  };

  const handleImageClick = (clickedImage: string, index: number) => {
    const newImages = [...smallImages];
    newImages[index] = bigImage;
    setSmallImages(newImages);
    setBigImage(clickedImage);
  };

  return (
    <div className="h-[45rem] w-full flex mt-9 flex-wrap sm:flex-nowrap md:flex-nowrap">
      {/* Left Images */}
      <div className="h-[21rem] sm:h-[47rem] w-full sm:w-1/2 flex flex-wrap sm:flex-nowrap">
        <div className="sm:h-[23rem] sm:w-[10rem] h-[4rem] w-full flex sm:flex-col flex-row gap-6 sm:items-end justify-center items-center">
          {smallImages.map((imgSrc, index) => (
            <div
              key={index}
              className="flex bg-cuspinky items-center justify-center rounded-lg h-[4rem] w-[7rem] cursor-pointer sm:w-[4.6rem] sm:h-[4.3rem]"
              onClick={() => handleImageClick(imgSrc, index)}
            >
              <img src={imgSrc} alt={`Small ${index}`} className="h-auto max-h-full w-auto max-w-full" />
            </div>
          ))}
        </div>
        <div className="h-[20rem] sm:h-[28rem] w-full sm:w-[87%] flex justify-center mt-2">
          <div className="bg-cuspinky h-[28rem] w-full sm:w-[87%] flex items-center justify-center rounded-lg">
            <img src={bigImage} alt="Big Display" className="h-[90%] w-auto" />
          </div>
        </div>
      </div>

      {/* Right Details */}
      <div className="h-[47rem] w-full sm:w-1/2 flex flex-col mt-[12rem] sm:mt-0 ml-4">
        <div className="h-[34rem] w-full">
          <h1 className="text-2xl">{themeHeading}</h1>
          <p className="text-lg text-greyish">{price}</p>
          <p className="mt-10 text-sm text-gray-700 h-[4.4rem] mr-20">{name}</p>

          <h2 className="text-sm text-greyish mt-5 pb-3">Size</h2>
          <div className="flex gap-4 mt-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-2 rounded-lg border ${
                  selectedSize === size ? "bg-drkyellow text-white" : "bg-white text-black"
                }`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <h2 className="text-sm text-greyish mt-8 pb-3">Color</h2>
          <div className="flex gap-4 mt-2">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border ${
                  selectedColor === color ? "border-CusBlck" : `border-${color}`
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>

          <div className="flex items-center gap-6 mt-10">
            <div className="flex items-center gap-2 border border-greyish rounded py-1">
              <button className="px-3 py-1" onClick={() => handleQuantityChange("decrement")}>-</button>
              <span className="text-lg">{quantity}</span>
              <button className="px-3 py-1" onClick={() => handleQuantityChange("increment")}>+</button>
            </div>

            <Sheet>
              <SheetTrigger
                className="px-6 py-2 bg-white text-black rounded-lg border border-black hover:bg-gray-100"
                onClick={handleAddToCart}
              >
                Add To Cart
              </SheetTrigger>
                <SheetContent className="flex flex-col h-screen px-4">
                  <SheetHeader>
                    <SheetTitle className="mb-2 mr-10 text-xl font-bold">Shopping Cart</SheetTitle>
                  </SheetHeader>

                  {/* Scrollable cart items section */}
                  <div className="flex-1 overflow-y-auto pr-2">
                    {cartItems.length > 0 ? (
                      <>
                        {cartItems.map((item, index) => (
                          <div key={index} className="mt-7 flex w-full gap-6">
                            <div className="flex bg-cuspinky items-center justify-center rounded-2xl h-[6rem] w-[8rem]">
                              <img src={item.image} alt="pic" className="h-auto max-h-full w-auto max-w-full" />
                            </div>
                            <div className="mt-6 flex gap-8">
                              <div>
                                <span className="text-black text-lg">{item.product.name}</span>
                                <br />
                                <span className="text-black pr-1">
                                  {item.quantity} x
                                  <span className="inline text-drkyellow pl-1">{item.product.price}</span>
                                </span>
                              </div>
                              <div className="mt-4">
                                <img
                                  src="cut.png"
                                  alt="Remove"
                                  className="w-4 h-4 cursor-pointer"
                                  onClick={() => handleRemoveFromCart(index)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <span>Your cart is empty</span>
                    )}
                  </div>

                  {/* Sticky subtotal and actions */}
                  {cartItems.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Subtotal</span>
                        <span className="text-lg font-bold text-drkyellow">
                          Rp{" "}
                          {cartItems
                            .reduce(
                              (acc, item) =>
                                acc +
                                parseFloat(item.product.price.replace(/[^0-9.-]+/g, "")) * item.quantity,
                              0
                            )
                            .toLocaleString()}
                          .00
                        </span>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Link
                          href="/cart"
                          className="px-6 py-2 bg-white text-black rounded-full mr-3 border border-black hover:bg-gray-100"
                        >
                          Cart
                        </Link>
                        <Link
                          href="/checkout"
                          className="px-6 py-2 bg-white text-black border border-black rounded-full hover:bg-gray-100"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  )}
                </SheetContent>

            </Sheet>
          </div>
        </div>
        {/* Footer details */}
        <div className="h-[10rem] w-full relative">
          <div className="h-[0.09rem] w-[90%] bg-gray-300 absolute top-0 left-0"></div>
          <div className="text-greyish text-sm mt-9 ml-9">
            <span className="block mb-5">SKU <p className="inline pl-9"> : SS001</p></span>
            <span className="block mb-5">Category <p className="inline pl-1"> : Sofas</p></span>
            <span className="block mb-5">Tags <p className="inline pl-8"> : Sofas, Chair, Home, Shop</p></span>
            <div className="flex items-center space-x-2 gap-2">
              <span><p className="inline pr-3">Share</p></span>
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
