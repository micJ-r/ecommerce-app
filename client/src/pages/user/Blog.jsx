import React, { useState } from 'react';
import { FiCalendar, FiUser, FiHeart, FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import { FaSearch, FaRegBookmark, FaBookmark } from 'react-icons/fa';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const categories = ['All', 'Shopping Tips', 'Product Guides', 'Trends', 'Sustainability', 'Company News'];

  const blogPosts = [
    {
      id: 1,
      title: '10 Essential Summer Fashion Must-Haves',
      excerpt: 'Discover the key pieces you need to refresh your wardrobe this season with our curated summer collection.',
      category: 'Shopping Tips',
      date: 'June 15, 2023',
      author: 'Sarah Williams',
      readTime: '5 min read',
      image: '👗',
      likes: 124,
      comments: 28
    },
    {
      id: 2,
      title: 'How to Choose the Perfect Running Shoes',
      excerpt: 'Our comprehensive guide helps you find the ideal pair based on your foot type and running style.',
      category: 'Product Guides',
      date: 'May 28, 2023',
      author: 'David Kim',
      readTime: '8 min read',
      image: '👟',
      likes: 89,
      comments: 14
    },
    {
      id: 3,
      title: 'The Rise of Sustainable Fashion in 2023',
      excerpt: 'Explore how eco-friendly materials and ethical production are transforming the fashion industry.',
      category: 'Trends',
      date: 'May 10, 2023',
      author: 'Emma Rodriguez',
      readTime: '6 min read',
      image: '🌱',
      likes: 215,
      comments: 42
    },
    {
      id: 4,
      title: 'Behind the Scenes: Our New Warehouse Tour',
      excerpt: 'Take an exclusive look at how we process and ship your orders with maximum efficiency.',
      category: 'Company News',
      date: 'April 22, 2023',
      author: 'Michael Johnson',
      readTime: '4 min read',
      image: '🏭',
      likes: 76,
      comments: 9
    },
    {
      id: 5,
      title: 'Minimalist Wardrobe: Less is More',
      excerpt: 'Learn how to build a capsule wardrobe with versatile pieces that never go out of style.',
      category: 'Shopping Tips',
      date: 'April 15, 2023',
      author: 'Sarah Williams',
      readTime: '7 min read',
      image: '👚',
      likes: 182,
      comments: 31
    },
    {
      id: 6,
      title: 'Tech Gadgets That Will Change Your Daily Routine',
      excerpt: 'We tested the latest innovative products that can truly make life easier.',
      category: 'Product Guides',
      date: 'March 30, 2023',
      author: 'David Kim',
      readTime: '9 min read',
      image: '📱',
      likes: 143,
      comments: 27
    }
  ];

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Blog Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">The Journal</h1>
          <p className="text-xl text-amber-600 max-w-3xl mx-auto">
            Discover shopping guides, style tips, and the latest trends from our experts
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-amber-100 flex items-center justify-center p-8 text-9xl">
              {featuredPost.image}
            </div>
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-amber-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
                <button 
                  onClick={() => toggleBookmark(featuredPost.id)}
                  className="text-amber-600 hover:text-amber-700"
                >
                  {bookmarkedPosts.includes(featuredPost.id) ? (
                    <FaBookmark className="text-xl" />
                  ) : (
                    <FaRegBookmark className="text-xl" />
                  )}
                </button>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
              <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
                <span className="flex items-center"><FiUser className="mr-1" /> {featuredPost.author}</span>
                <span className="flex items-center"><FiCalendar className="mr-1" /> {featuredPost.date}</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <span className="flex items-center text-gray-600">
                    <FiHeart className="mr-1" /> {featuredPost.likes}
                  </span>
                  <span className="flex items-center text-gray-600">
                    <FiMessageSquare className="mr-1" /> {featuredPost.comments}
                  </span>
                </div>
                <button className="flex items-center text-amber-600 font-medium hover:text-amber-700">
                  Read more <FiArrowRight className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-700 hover:bg-amber-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-12 relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-5 pr-12 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600">
            <FaSearch />
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.slice(1).map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-amber-100 h-48 flex items-center justify-center text-7xl">
                {post.image}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <button 
                    onClick={() => toggleBookmark(post.id)}
                    className="text-gray-400 hover:text-amber-600"
                  >
                    {bookmarkedPosts.includes(post.id) ? (
                      <FaBookmark className="text-lg" />
                    ) : (
                      <FaRegBookmark className="text-lg" />
                    )}
                  </button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap items-center text-xs text-gray-500 mb-4 gap-3">
                  <span className="flex items-center"><FiUser className="mr-1" /> {post.author}</span>
                  <span className="flex items-center"><FiCalendar className="mr-1" /> {post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex space-x-3">
                    <span className="flex items-center text-gray-500 text-sm">
                      <FiHeart className="mr-1" /> {post.likes}
                    </span>
                    <span className="flex items-center text-gray-500 text-sm">
                      <FiMessageSquare className="mr-1" /> {post.comments}
                    </span>
                  </div>
                  <button className="flex items-center text-amber-600 text-sm font-medium hover:text-amber-700">
                    Read more <FiArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest blog posts, exclusive deals, and style inspiration
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;