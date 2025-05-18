import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axios';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleForgotPassword = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/forgot-password', data);
      alert(response.data.message || 'Reset link sent!');
    } catch (error) {
      alert(error.response?.data?.message || 'Reset failed');
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-6" autoComplete="off">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                {...register('email', { required: 'Email is required' })}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
