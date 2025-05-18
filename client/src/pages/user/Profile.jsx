// src/pages/customer/Profile.jsx
import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

function Profile() {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    api.get('http://localhost:5000/api/users/me')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <p className="mb-2"><strong>Name:</strong> {user.name}</p>
      <p className="mb-4"><strong>Email:</strong> {user.email}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Change Password
      </button>
    </div>
  );
}

export default Profile;
