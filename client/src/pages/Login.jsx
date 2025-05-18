import React from 'react';
import AuthForm from '../components/AuthForm';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data, reset) => {
    try {
      const response = await api.post('http://localhost:5000/api/auth/login', data); // baseURL handles localhost

      const { accessToken, user, message } = response.data;

      // Save access token to localStorage
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }

      Swal.fire({
        title: 'Success!',
        text: message || 'Login successful',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        reset(); // Clear form fields

        if (user?.role === 'admin') {
          navigate('/admin');
        } else if (user?.role === 'user') {
          navigate('/user');
        } else {
          navigate('/login');
        }
      });

    } catch (error) {
      console.error('Login error:', error);

      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Something went wrong. Try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <AuthForm type="login" onSubmit={handleLogin} />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
