import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaClock } from 'react-icons/fa';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Thank you!',
      text: `${formData.name}, we'll contact you soon.`,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d97706',
      background: '#fffbeb',
      iconColor: '#d97706',
      timer: 3000,
      timerProgressBar: true,
    }).then(() => {
      setFormData({ name: '', email: '', message: '' });
    });
  };

  const contactMethods = [
    {
      icon: <FaPhone className="text-2xl text-amber-600" />,
      title: "Phone",
      info: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm"
    },
    {
      icon: <FaEnvelope className="text-2xl text-amber-600" />,
      title: "Email",
      info: "support@micjexpress.com",
      description: "We reply within 24 hours"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-amber-600" />,
      title: "Office",
      info: "123 Commerce Street",
      description: "San Francisco, CA 94108"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-400 to-amber-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We'd love to hear from you! Get in touch with our team.
          </p>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white rounded-full opacity-10"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-amber-800">Let's Connect</h2>
            <p className="text-lg text-gray-700">
              Have questions or feedback? We're here to help and would love to hear from you.
            </p>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{method.title}</h3>
                    <p className="text-gray-700 font-medium">{method.info}</p>
                    <p className="text-gray-500 text-sm mt-1 flex items-center">
                      <FaClock className="mr-1 text-amber-500" /> {method.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-amber-100 p-3 rounded-full text-amber-700 hover:bg-amber-200 transition-colors">
                  <FiFacebook className="text-xl" />
                </a>
                <a href="#" className="bg-amber-100 p-3 rounded-full text-amber-700 hover:bg-amber-200 transition-colors">
                  <FiTwitter className="text-xl" />
                </a>
                <a href="#" className="bg-amber-100 p-3 rounded-full text-amber-700 hover:bg-amber-200 transition-colors">
                  <FiInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-amber-800 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                Send Message <FaPaperPlane className="ml-2" />
              </button>
            </form>
          </div>
        </div>

       {/* Map Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-96 w-full">
            <iframe
              title="Our Location in Dodoma"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.755069609038!2d35.74031331478635!3d-6.162848995524477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184d9b8a9f1a3a9f%3A0x8f8d7c1e1c1e1c1e!2sDodoma%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="p-4 text-center bg-amber-50">
            <h3 className="text-xl font-bold text-amber-800 mb-1">Our Location</h3>
            <p className="text-gray-700">Dodoma, Tanzania</p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Customer Support</h3>
              <p>Monday - Friday: 8am - 6pm</p>
              <p>Saturday: 9am - 4pm</p>
              <p>Sunday: Closed</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p>24/7 Available</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p>Response within 24 hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;