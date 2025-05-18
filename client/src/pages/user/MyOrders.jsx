// src/pages/customer/MyOrders.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('http://localhost:5000/api/orders/my')  // User-specific orders
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className="p-4 bg-white shadow rounded">
            <p><strong>Product:</strong> {order.productName}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
