'use client';

import React, { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { useAuth, useUser } from '@clerk/nextjs';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  total: number;
  createdAt: string;
  deliveryDate: string;
  cart: CartItem[];
  userId: string;
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    async function fetchOrders() {
      if (!userId) return;

      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayISO = today.toISOString();

        const data = await client.fetch<Order[]>(`
          *[_type == "order" && 
            userId == $userId && 
            createdAt >= $todayISO] | order(createdAt desc) {
            _id,
            total,
            createdAt,
            deliveryDate,
            cart,
            userId
          }
        `, { userId, todayISO });

        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userId]);

  if (loading) {
    return (
      <div className="w-full min-h-screen px-6 py-16 bg-[#F9F1E7]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-[#B88E2F]">Today's Orders</h1>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-[#F9F1E7] rounded-lg border border-[#B88E2F]/20"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen px-6 py-16 bg-[#F9F1E7]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-[#B88E2F]">Today's Orders</h1>
          <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 py-16 bg-[#F9F1E7]">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#B88E2F]">Today's Orders</h1>
          {user && (
            <div className="bg-[#B88E2F] text-white px-4 py-2 rounded-full">
              {user.fullName || user.firstName || user.username || 'User'}
            </div>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-600">You have no orders today.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order._id} 
                className="bg-white rounded-lg p-6 shadow-sm border border-[#B88E2F]/20 hover:border-[#A67F2B] transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order #{order._id.slice(-6).toUpperCase()}</p>
                    <h3 className="font-semibold text-lg text-[#B88E2F]">
                      {user?.fullName || user?.firstName || user?.username || 'User'}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className="text-sm font-medium text-[#B88E2F]">
                      Total: Rs. {order.total.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#F9F1E7] pt-4">
                  <h4 className="font-medium mb-3 text-gray-700">Order Items</h4>
                  <div className="space-y-3">
                    {order.cart.map((item, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-[#B88E2F]">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#F9F1E7] flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                  </p>
                 
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}