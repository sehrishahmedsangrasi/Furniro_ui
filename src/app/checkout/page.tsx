import BlackBar from "@/components/BlackBar";
import Form from "@/components/form";

export default function Checkout() {
  return (
    <div className="w-full h-[148rem] lg:h-[115rem] md:h-[115rem] relative ">

      {/* Header Section */}
      <div className="w-full h-[4rem] pl-[3.8rem] pt-14 mb-32">
        <div className="text-4xl font-bold ">Checkout</div>
        <div className="mt-1 text-sm flex items-center">
          <span className="font-medium">Home</span>
          <img src="arr.png" alt="arrow" className="mx-2 w-3 h-3" />
          <span className="text-cusGray">Cart</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full h-[40rem] flex-col sm:flex-row">

        {/* Left Section (Form) */}
        <div className="w-full md:w-[50%] p-2 lg:pl-[3.8rem] md:pl-[3.8rem] flex flex-col h-[14rem]  sm:mb-[9rem]">
          <Form />
        </div>

        {/* Right Section (Order Summary) */}
        <div className="lg:p-9 md:p-9 p-0 w-full md:w-[50%] relative mt-[3.3rem] flex items-center ">
          <div className="w-full p-[3.5rem] mt-[55rem] lg:mt-0 md:mt-0">
            
            {/* Product and Subtotal */}
            <div className="flex justify-between items-center pb-4">
              <span className="font-medium text-lg">Product</span>
              <span className="font-medium text-lg">Subtotal</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-greyish">
                Asgaard sofa <span className="text-black">x 1</span>
              </span>
              <span className="text-gray-700">Rs. 250,000.00</span>
            </div>

            {/* Subtotal and Total */}
            <div className="flex justify-between items-center mt-4 pt-4">
              <span className="font-medium text-black">Subtotal</span>
              <span className="font-medium">Rs. 250,000.00</span>
            </div>
            <div className="flex justify-between items-center mt-4 border-b-[2px] pb-4">
              <span className="font-medium text-black">Total</span>
              <span className="text-xl font-bold text-drkyellow">Rs. 250,000.00</span>
            </div>

            {/* Payment Options */}
            <div className="mt-6">
              <p className="font-bold">Direct Bank Transfer</p>
              <p className="text-greyish text-sm mt-2">
                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
              </p>
              <div className="mt-4">
                <label className="block text-greyish">
                  <input type="radio" name="paymentMethod" className="mr-2" /> Direct Bank Transfer
                </label>
                <label className="block text-greyish">
                  <input type="radio" name="paymentMethod" className="mr-2" /> Cash On Delivery
                </label>
              </div>
            </div>

            {/* Privacy Policy and Place Order */}
            <div className="mt-4 text-black text-sm">
              Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
              <a href="#" className="text-black font-bold">
                privacy policy
              </a>.
            </div>
            <button className="w-full bg-white text-black py-3 mt-6 rounded-md border border-black hover:bg-gray-100">
              Place order
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-auto absolute bottom-0 w-full ">
        <BlackBar />
      </div>
    </div>
  );
}
