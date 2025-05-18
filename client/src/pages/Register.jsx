import React, { useRef } from 'react';
import AuthForm from '../components/AuthForm';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Swal from 'sweetalert2';

const Register = () => {
  const formRef = useRef();

  const handleRegister = async (data) => {
    const response = await api.post('http://localhost:5000/api/auth/register', data, {
      withCredentials: true
    });

    Swal.fire({
      title: 'Success!',
      text: response?.data?.message || 'Registered successfully!',
      icon: 'success',
    });

    formRef.current.resetForm(); // Clear form
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <AuthForm ref={formRef} type="register" onSubmit={handleRegister} />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
