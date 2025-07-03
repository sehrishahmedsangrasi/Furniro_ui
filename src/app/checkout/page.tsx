// 'use client';

// import { useCart } from '@/components/CartContext';
// import BlackBar from "@/components/BlackBar";
// import Form from "@/components/form";
// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

// export default function Checkout() {
//   const { cartItems } = useCart();

//   const getTotal = () =>
//     cartItems.reduce((acc, item) => {
//       const price = parseFloat(item.product.price.replace(/[^0-9.-]+/g, ""));
//       return acc + price * item.quantity;
//     }, 0);

//   return (
//     <>
//       {/* Redirect if not signed in */}
//       <SignedOut>
//         <RedirectToSignIn />
//       </SignedOut>

//       {/* Show checkout page only if signed in */}
//       <SignedIn>
//         <div className="w-full h-auto lg:h-[115rem] relative">
//           {/* Header Section */}
//           <div className="w-full h-[4rem] pl-[3.8rem] pt-14 mb-32">
//             <div className="text-4xl font-bold">Checkout</div>
//             <div className="mt-1 text-sm flex items-center">
//               <span className="font-medium">Home</span>
//               <img src="arr.png" alt="arrow" className="mx-2 w-3 h-3" />
//               <span className="text-cusGray">Checkout</span>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex w-full flex-col sm:flex-row">
//             {/* Left Section (Form) */}
//             <div className="w-full md:w-[50%] p-2 lg:pl-[3.8rem] flex flex-col sm:mb-[9rem]">
//               <Form />
//             </div>

//             {/* Right Section (Order Summary) */}
//             <div className="lg:p-9 md:p-9 p-4 w-full md:w-[50%] mt-[3.3rem] flex items-start">
//               <div className="w-full p-[2rem] bg-cuspinky rounded-lg">
//                 {/* Product and Subtotal Headers */}
//                 <div className="flex justify-between items-center pb-4">
//                   <span className="font-medium text-lg">Product</span>
//                   <span className="font-medium text-lg">Subtotal</span>
//                 </div>

//                 {/* Cart Items */}
//                 {cartItems.length > 0 ? (
//                   <>
//                     {cartItems.map((item, index) => {
//                       const price = parseFloat(item.product.price.replace(/[^0-9.-]+/g, ""));
//                       const subtotal = price * item.quantity;

//                       return (
//                         <div key={index} className="flex justify-between mt-4">
//                           <span className="text-greyish">
//                             {item.product.name} <span className="text-black">x {item.quantity}</span>
//                           </span>
//                           <span className="text-gray-700">Rs. {subtotal.toLocaleString()}.00</span>
//                         </div>
//                       );
//                     })}

//                     {/* Subtotal and Total */}
//                     <div className="flex justify-between items-center mt-4 pt-4">
//                       <span className="font-medium text-black">Subtotal</span>
//                       <span className="font-medium">Rs. {getTotal().toLocaleString()}.00</span>
//                     </div>

//                     <div className="flex justify-between items-center mt-4 border-b-[2px] pb-4">
//                       <span className="font-medium text-black">Total</span>
//                       <span className="text-xl font-bold text-drkyellow">Rs. {getTotal().toLocaleString()}.00</span>
//                     </div>
//                   </>
//                 ) : (
//                   <p>Your cart is empty</p>
//                 )}

//                 {/* Payment Options */}
//                 <div className="mt-6">
//                   <p className="font-bold">Direct Bank Transfer</p>
//                   <p className="text-greyish text-sm mt-2">
//                     Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
//                   </p>
//                   <div className="mt-4">
//                     <label className="block text-greyish">
//                       <input type="radio" name="paymentMethod" className="mr-2" /> Direct Bank Transfer
//                     </label>
//                     <label className="block text-greyish">
//                       <input type="radio" name="paymentMethod" className="mr-2" /> Cash On Delivery
//                     </label>
//                   </div>
//                 </div>

//                 {/* Privacy Policy and Place Order */}
//                 <div className="mt-4 text-black text-sm">
//                   Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{' '}
//                   <a href="#" className="text-black font-bold">privacy policy</a>.
//                 </div>
//                 <button className="w-full bg-white text-black py-3 mt-6 rounded-md border border-black hover:bg-gray-100">
//                   Place order
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="h-auto mt-10">
//             <BlackBar />
//           </div>
//         </div>
//       </SignedIn>
//     </>
//   );
// }
'use client';

import { useCart } from '@/components/CartContext';
import BlackBar from "@/components/BlackBar";
import Form from "@/components/form";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Or remove if you're not using Sonner

interface CartItem {
  product: {
    name: string;
    price: string;
    
  };
 
  quantity: number;
}

export default function Checkout() {
  const { cartItems } = useCart();
  const { user } = useUser();
  const router = useRouter();

  const getTotal = () =>
    cartItems.reduce((acc, item) => {
      const price = parseFloat(item.product.price.replace(/[^0-9.-]+/g, ""));
      return acc + price * item.quantity;
    }, 0);

  const handleCheckout = async () => {
    if (!user?.id) {
      toast.error("User not found. Please sign in.");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          items: cartItems.map((item: CartItem) => ({
            name: item.product.name,
            price: parseFloat(item.product.price.replace(/[^0-9.-]+/g, "")),
            quantity: item.quantity,
           
          })),
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        toast.error("Checkout session could not be created.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="w-full h-auto lg:h-[115rem] relative">
          {/* Header Section */}
          <div className="w-full h-[4rem] pl-[3.8rem] pt-14 mb-32">
            <div className="text-4xl font-bold">Checkout</div>
            <div className="mt-1 text-sm flex items-center">
              <span className="font-medium">Home</span>
              <img src="arr.png" alt="arrow" className="mx-2 w-3 h-3" />
              <span className="text-cusGray">Checkout</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex w-full flex-col sm:flex-row">
            {/* Left Section (Form) */}
            <div className="w-full md:w-[50%] p-2 lg:pl-[3.8rem] flex flex-col sm:mb-[9rem]">
              <Form />
            </div>

            {/* Right Section (Order Summary) */}
            <div className="lg:p-9 md:p-9 p-4 w-full md:w-[50%] mt-[3.3rem] flex items-start">
              <div className="w-full p-[2rem] bg-cuspinky rounded-lg">
                {/* Product and Subtotal Headers */}
                <div className="flex justify-between items-center pb-4">
                  <span className="font-medium text-lg">Product</span>
                  <span className="font-medium text-lg">Subtotal</span>
                </div>

                {/* Cart Items */}
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item, index) => {
                      const price = parseFloat(item.product.price.replace(/[^0-9.-]+/g, ""));
                      const subtotal = price * item.quantity;

                      return (
                        <div key={index} className="flex justify-between mt-4">
                          <span className="text-greyish">
                            {item.product.name} <span className="text-black">x {item.quantity}</span>
                          </span>
                          <span className="text-gray-700">Rs. {subtotal.toLocaleString()}.00</span>
                        </div>
                      );
                    })}

                    <div className="flex justify-between items-center mt-4 pt-4">
                      <span className="font-medium text-black">Subtotal</span>
                      <span className="font-medium">Rs. {getTotal().toLocaleString()}.00</span>
                    </div>

                    <div className="flex justify-between items-center mt-4 border-b-[2px] pb-4">
                      <span className="font-medium text-black">Total</span>
                      <span className="text-xl font-bold text-drkyellow">Rs. {getTotal().toLocaleString()}.00</span>
                    </div>
                  </>
                ) : (
                  <p>Your cart is empty</p>
                )}

                {/* Payment Options */}
                <div className="mt-6">
                  <p className="font-bold">Direct Bank Transfer</p>
                  <p className="text-greyish text-sm mt-2">
                    Make your payment directly into our bank account. Please use your Order ID as the payment reference.
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
                  Your personal data will be used to support your experience and for other purposes described in our{' '}
                  <a href="#" className="text-black font-bold">privacy policy</a>.
                </div>

                {/* ✅ Place Order Button triggers handleCheckout */}
                <button
                  className="w-full bg-white text-black py-3 mt-6 rounded-md border border-black hover:bg-gray-100"
                  onClick={handleCheckout}
                >
                  Place order
                </button>
              </div>
            </div>
          </div>

         
        </div>
      </SignedIn>
    </>
  );
}

