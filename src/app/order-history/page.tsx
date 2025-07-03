"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useCart } from '@/components/CartContext';
import { useEffect } from 'react';

export default function OrderSuccess() {
  const { clearCart } = useCart(); 

  useEffect(() => {
    
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');

    if (success ===  'true') {
      clearCart(); 
    }
  }, []);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <CheckCircle className="text-green-500 w-20 h-20 animate-pulse" />
      <h1 className="text-3xl font-bold mt-4">Order Placed Successfully!</h1>
      <p className="text-gray-600 mt-2">Thank you for shopping with us. Your order is on its way!</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="bg-drkyellow text-white px-6 py-2 rounded-lg shadow-md hover:bg-hovrdrkyellow transition"
        >
          Back to Home
        </button>
        <button
          onClick={() => router.push("/history")}
          className="bg-drkyellow text-white px-6 py-2 rounded-lg shadow-md hover:bg-hovrdrkyellow transition"
        >
          View Cart Summary
        </button>
      </div>
    </div>
  );
}
