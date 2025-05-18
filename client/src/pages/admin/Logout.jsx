// src/pages/admin/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../api/axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await api.post('http://localhost:5000/api/auth/logout', {}, {
          withCredentials: true,
        });

        Swal.fire({
          title: 'Logged out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/login');
        });

      } catch (error) {
        console.error('Logout error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to logout. Try again.',
          icon: 'error',
        });
      }
    };

    performLogout();
  }, [navigate]);

  return null;
};

export default Logout;
