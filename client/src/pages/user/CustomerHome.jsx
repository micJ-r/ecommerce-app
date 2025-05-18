// src/pages/customer/CustomerHome.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

function CustomerHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('http://localhost:5000/api/products')  // Make sure your backend exposes this route
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Products</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {products.map(product => (
          <div key={product._id} className="bg-white p-4 shadow rounded">
            <img src={product.image} alt={product.name} className="h-40 object-cover w-full mb-3 rounded" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="mt-2 font-bold">${product.price}</p>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Place Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerHome;
