import React from 'react';
import { FaLeaf, FaAward, FaShippingFast, FaHandsHelping } from 'react-icons/fa';
import { FiUsers, FiGlobe, FiHeart } from 'react-icons/fi';

const About = () => {
  const teamMembers = [
    {
      name: "Biden  @micJ",
      role: "Founder & CEO",
      bio: "Passionate about creating exceptional shopping experiences",
      img: "👨‍💼"
    },
    {
      name: "Sarah Williams",
      role: "Head of Operations",
      bio: "Ensures your orders are processed quickly and accurately",
      img: "👩‍💼"
    },
    {
      name: "David Kim",
      role: "Customer Support",
      bio: "Dedicated to making every customer happy",
      img: "👨‍💻"
    },
    {
      name: "Emma Michael",
      role: "Product Curator",
      bio: "Selects only the best products for our customers",
      img: "👩‍🎨"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Happy Customers", icon: <FiUsers className="text-3xl" /> },
    { value: "50+", label: "Countries Served", icon: <FiGlobe className="text-3xl" /> },
    { value: "24/7", label: "Customer Support", icon: <FaHandsHelping className="text-3xl" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-400 to-amber-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            From humble beginnings to becoming your favorite shopping destination
          </p>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white rounded-full opacity-10"></div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white rounded-full opacity-10"></div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Who We Are</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2020, we started as a small team passionate about bringing quality products to your doorstep. 
                Today, we've grown into a trusted e-commerce platform serving customers worldwide.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our mission is simple: to make online shopping enjoyable, reliable, and accessible to everyone.
              </p>
              <div className="flex items-center text-amber-600">
                <FiHeart className="mr-2" />
                <span className="font-medium">Proudly serving you since 2020</span>
              </div>
            </div>
            <div className="bg-amber-100 flex items-center justify-center p-8 text-8xl">
              🛍️
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-800 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                <FaLeaf className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to eco-friendly practices and reducing our environmental impact at every step.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                <FaAward className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-3">Quality</h3>
              <p className="text-gray-600">
                Every product in our catalog meets rigorous standards before we offer it to you.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                <FaShippingFast className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                We partner with reliable carriers to get your orders to you as quickly as possible.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 mb-16 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-4">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-amber-800 mb-12 text-center">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow text-center">
                <div className="bg-amber-100 h-48 flex items-center justify-center text-7xl p-6">
                  {member.img}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-800 mb-1">{member.name}</h3>
                  <p className="text-amber-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-amber-100 flex items-center justify-center p-8 text-8xl">
              ✉️
            </div>
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-4">Get In Touch</h2>
              <p className="text-lg text-gray-700 mb-6">
                Have questions? Our team is always happy to help you with anything you need.
              </p>
              <button className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;