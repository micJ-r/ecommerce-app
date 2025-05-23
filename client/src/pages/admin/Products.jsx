import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlusCircle,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const API_BASE = 'http://localhost:5000';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/products`);
      setProducts(res.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch products',
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BASE}/api/products/${id}`);
        await MySwal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        );
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete product',
        });
      }
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setIsModalOpen(true);
  };

  const handleViewClick = (product) => {
    MySwal.fire({
      title: product.name,
      html: `
        <div class="text-left">
          <img src="${
            product.image?.startsWith('/uploads')
              ? `${API_BASE}${product.image}`
              : product.image?.includes('http')
                ? product.image
                : `${API_BASE}/uploads/${product.image}`
          }" alt="${product.name}" class="w-full h-48 object-cover rounded mb-4" onerror="this.src='/placeholder-image.png'"/>
          <p><strong>Description:</strong> ${product.description}</p>
          <p><strong>Price:</strong> ₹${product.price}</p>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: 'Close',
      width: '600px'
    });
  };

  const handleFormChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);

      if (formData.image instanceof File || !editProduct) {
        formDataToSend.append('image', formData.image);
      }

      let response;
      if (editProduct) {
        response = await axios.put(`${API_BASE}/api/products/${editProduct._id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await axios.post(`${API_BASE}/api/products`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setFormData({ name: '', description: '', price: '', image: null });
      setEditProduct(null);
      setIsModalOpen(false);
      
      await MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: editProduct ? 'Product updated successfully!' : 'Product added successfully!',
      });
      
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error saving product. Please check the console for details.',
      });
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
        <button
          onClick={() => {
            setEditProduct(null);
            setFormData({ name: '', description: '', price: '', image: null });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlusCircle /> Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                 <td className="px-6 py-4">
                  <img
                    src={
                      product.image?.startsWith('/uploads')
                        ? `${API_BASE}${product.image}`
                        : product.image?.includes('http')
                          ? product.image
                          : `${API_BASE}/uploads/${product.image}`
                    }
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-image.png';
                    }}
                  />
                </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">₹{product.price}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button 
                      onClick={() => handleViewClick(product)} 
                      className="text-blue-600 hover:text-blue-900"
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button 
                      onClick={() => handleEditClick(product)} 
                      className="text-green-600 hover:text-green-900"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)} 
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditProduct(null);
                setFormData({ name: '', description: '', price: '', image: null });
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">{editProduct ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                  accept="image/*"
                  required={!editProduct}
                />
                {editProduct && typeof formData.image === 'string' && (
                  <img
                    src={`${API_BASE}/uploads/${formData.image}`}
                    alt="Preview"
                    className="w-20 h-20 mt-2 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditProduct(null);
                    setFormData({ name: '', description: '', price: '', image: null });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editProduct ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;