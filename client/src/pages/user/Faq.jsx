import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiMail } from 'react-icons/fi';
import { FaShippingFast, FaExchangeAlt, FaShieldAlt, FaCreditCard } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqCategories = [
    {
      title: "Shipping & Delivery",
      icon: <FaShippingFast className="text-amber-600 text-xl mr-3" />,
      questions: [
        {
          question: "How long does delivery take?",
          answer: "Standard delivery takes 3-5 business days. Express shipping is available for next-day delivery in most locations."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to over 50 countries worldwide. International delivery typically takes 7-14 business days."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can track your package using our order tracking page."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      icon: <FaExchangeAlt className="text-amber-600 text-xl mr-3" />,
      questions: [
        {
          question: "What is your return policy?",
          answer: "We accept returns within 30 days of delivery. Items must be unused, in original packaging with tags attached."
        },
        {
          question: "How do I initiate a return?",
          answer: "Visit our Returns Center in your account dashboard or contact our customer service team for assistance."
        },
        {
          question: "Who pays for return shipping?",
          answer: "We provide free return shipping labels for domestic returns. International returns are the customer's responsibility."
        }
      ]
    },
    {
      title: "Payments & Security",
      icon: <FaShieldAlt className="text-amber-600 text-xl mr-3" />,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption and never store your full payment details on our servers."
        },
        {
          question: "Can I pay with cryptocurrency?",
          answer: "Currently, we only accept traditional payment methods. We may add crypto payments in the future."
        }
      ]
    },
    {
      title: "Account & Orders",
      icon: <FaCreditCard className="text-amber-600 text-xl mr-3" />,
      questions: [
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page and follow the instructions sent to your email."
        },
        {
          question: "Can I modify my order after placing it?",
          answer: "You can request order modifications within 1 hour of placing your order by contacting customer service."
        },
        {
          question: "How do I view my order history?",
          answer: "All your orders are available in the 'My Orders' section of your account dashboard."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-amber-600 max-w-3xl mx-auto">
            Find quick answers to common questions about shopping with us
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full py-4 px-6 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-amber-50 px-6 py-4 border-b border-amber-100 flex items-center">
                {category.icon}
                <h2 className="text-xl font-bold text-amber-800">{category.title}</h2>
              </div>
              <div className="divide-y divide-amber-100">
                {category.questions.map((item, index) => (
                  <div key={index} className="px-6 py-4">
                    <button
                      onClick={() => toggleAccordion(`${catIndex}-${index}`)}
                      className="w-full flex justify-between items-center text-left focus:outline-none"
                    >
                      <h3 className="font-medium text-gray-800">{item.question}</h3>
                      {activeIndex === `${catIndex}-${index}` ? (
                        <FiChevronUp className="text-amber-600" />
                      ) : (
                        <FiChevronDown className="text-amber-600" />
                      )}
                    </button>
                    {activeIndex === `${catIndex}-${index}` && (
                      <div className="mt-3 text-gray-600">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions? */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center bg-white/20 rounded-full p-4 mb-4">
              <FiMail className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our customer support team is happy to help with any questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-white text-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;