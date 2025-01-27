import BlackBar from "@/components/BlackBar";
import Link from 'next/link';

export default function Cart() {
  return (
    <div className="w-full h-[59rem] relative">

      {/* Page Header */}
      <div className="w-full h-[4rem] pl-[3.8rem] pt-14 mb-32">
        <div className="text-4xl font-bold">Cart</div>
        <div className="mt-1 text-sm flex items-center">
          <span className="text-bold font-medium">Home</span>
          <img src="arr.png" alt="arrow" className="mx-2 w-3 h-3" />
          <span className="text-cusGray">Cart</span>
        </div>
      </div>

      {/* Main Cart Section */}
      <div className="flex w-full h-[40rem] flex-col md:flex-row">

        {/* Left Section: Cart Items */}
        <div className="w-full md:w-[69%] pl-[3.8rem] flex flex-col h-[14rem]">

          {/* Cart Table Header */}
          <div className="bg-cuspinky w-full h-[3rem] flex items-center">
            <span className="flex-1 text-left pl-[9.5rem]">Product</span>
            <span className="flex-1 text-left pl-[4.1rem]">Price</span>
            <span className="flex-1 text-left pl-[2.5rem]">Quantity</span>
            <span className="flex-1 text-left">Subtotal</span>
          </div>

          {/* Cart Item */}
          <div className="mt-7 flex w-full items-center">

            {/* Product Image */}
            <div className="flex bg-cuspinky items-center justify-center rounded-2xl h-[6rem] w-[8rem]">
              <img
                src="Asgaardsofa3.png" 
                alt="Asgaard Sofa"
                className="h-auto max-h-full w-auto max-w-full"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-1 justify-between items-center ml-4 w-full">

              {/* Product Name */}
              <div className="flex-1">
                <span className="text-greyish text-[1rem]">Asgaard Sofa</span>
              </div>

              {/* Product Price */}
              <div className="flex-1 text-left">
                <span className="text-greyish text-[1rem]">Rs. 250,000.00</span>
              </div>

              {/* Quantity Display */}
              <div className="border border-gray-300 p-4 w-[1rem] h-[1rem] text-center rounded-sm flex items-center justify-center">
                1
              </div>

              {/* Subtotal */}
              <div className="flex-1 text-right">
                <span className="text-black text-[1rem]">Rs. 250,000.00</span>
              </div>

              {/* Remove Item Icon */}
              <div className="ml-7">
                <img
                  src="dustbin.png" 
                  alt="Remove"
                  className="w-[1.3rem] h-[1.3rem] cursor-pointer"
                  
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Cart Totals */}
        <div className="p-5 w-full md:w-[27%] relative">
          <div className="w-full bg-cuspinky h-[24rem] p-6 flex flex-col items-center absolute top-0">
            <div className="text-2xl font-bold text-black mt-3 mb-[3.8rem]">Cart Totals</div>
            <div className="h-[9rem] w-full">
              {/* Subtotal */}
              <div className="text-lg text-black flex justify-between mt-3">
                <span>Subtotal</span>
                <span className="font-semibold text-greyish">Rs. 250,000.00</span>
              </div>

              {/* Total */}
              <div className="text-lg text-black flex justify-between mt-6">
                <span>Total</span>
                <span className="text-xl font-semibold text-drkyellow">Rs. 250,000.00</span>
              </div>

              {/* Checkout Button */}
              <div className="mt-9 flex justify-center">
                <Link
                  href="/checkout"
                  className="w-[90%] bg-cuspinky hover:bg-powderpink border h-[3.6rem] border-black text-black py-2 rounded-lg font-semibold flex items-center justify-center"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-auto absolute bottom-0 w-full">
        <BlackBar />
      </div>
    </div>
  );
}
