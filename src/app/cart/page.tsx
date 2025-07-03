'use client';

import { useCart } from '@/components/CartContext';
import BlackBar from "@/components/BlackBar";
import Link from 'next/link';

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const getTotal = () =>
    cartItems.reduce((acc, item) => {
      const price = parseFloat(item.product.price.replace(/[^0-9.-]+/g, ""));
      return acc + price * item.quantity;
    }, 0);

  return (
    <div className="w-full lg:h-[59rem] min-h-screen relative pb-20">
      {/* Page Header */}
      <div className="w-full h-[4rem] pl-[3.8rem] pt-14 mb-32">
        <div className="text-4xl font-bold">Cart</div>
        <div className="mt-1 text-sm flex items-center">
          <span className="font-medium">Home</span>
          <img src="arr.png" alt="arrow" className="mx-2 w-3 h-3" />
          <span className="text-cusGray">Cart</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty</p>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row w-full">
            {/* Cart Items */}
            <div className="lg:w-[70%] w-[95%] lg:pl-[3.8rem] pl-[0.8rem] flex flex-col md:max-h-[30rem] max-h-[30rem] overflow-y-auto pr-2">
              {/* Header Row - Hidden on mobile */}
              <div className="bg-cuspinky h-[3rem] hidden sm:flex items-center w-full px-4 font-semibold">
                <span className="flex-1">Product</span>
                <span className="flex-1">Price</span>
                <span className="flex-1">Quantity</span>
                <span className="flex-1">Subtotal</span>
              </div>

              {/* Cart Items */}
              {cartItems.map((item, index) => {
                const price = parseFloat(item.product.price.replace(/[^0-9.-]+/g, ""));
                const subtotal = price * item.quantity;

                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center py-6 border-b gap-4 sm:gap-0"
                  >
                    {/* Image */}
                    <div className="flex bg-cuspinky items-center justify-center rounded-2xl h-[6rem] w-[8rem] mx-auto sm:mx-0">
                      <img
                        src={item.image}
                        alt="Product"
                        className="h-auto max-h-full w-auto max-w-full"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap w-full">
                      {/* Name */}
                      <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                        <span className="text-greyish">{item.product.name}</span>
                      </div>

                      {/* Price */}
                      <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                        <span className="text-greyish">Rs. {price.toLocaleString()}.00</span>
                      </div>

                      {/* Quantity */}
                      <div className="flex-1 flex justify-center sm:justify-start mt-2 sm:mt-0">
                        <div className="border border-gray-300 p-2 text-center w-12">
                          {item.quantity}
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                        <span className="text-black">Rs. {subtotal.toLocaleString()}.00</span>
                      </div>

                      {/* Remove */}
                      <div className="flex justify-center sm:justify-start mt-2 sm:mt-0">
                        <img
                          src="dustbin.png"
                          alt="Remove"
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => removeFromCart(index)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Totals */}
            <div className="lg:w-[27%] w-full p-4 ml-0 lg:mt-0 mt-10 relative">
              <div className="bg-cuspinky p-6 h-[24rem] flex flex-col items-center absolute top-0 w-full">
                <div className="text-2xl font-bold text-black mt-3 mb-[3.8rem]">Cart Totals</div>

                <div className="text-lg text-black flex justify-between w-full">
                  <span>Subtotal</span>
                  <span className="font-semibold text-greyish">
                    Rs. {getTotal().toLocaleString()}.00
                  </span>
                </div>

                <div className="text-lg text-black flex justify-between mt-6 w-full">
                  <span>Total</span>
                  <span className="text-xl font-semibold text-drkyellow">
                    Rs. {getTotal().toLocaleString()}.00
                  </span>
                </div>

                <div className="mt-9 w-full">
                  <Link
                    href="/checkout"
                    className="w-full bg-cuspinky hover:bg-powderpink border h-[3.6rem] border-black text-black py-2 rounded-lg font-semibold flex items-center justify-center"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className="h-auto absolute bottom-0 w-full hidden md:block">
        <BlackBar />
      </div>
    </div>
  );
}
