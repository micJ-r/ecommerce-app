import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiClock, FiSearch, FiChevronRight } from 'react-icons/fi';
import { FaStore, FaParking, FaWheelchair, FaWifi } from 'react-icons/fa';

const Stores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStore, setActiveStore] = useState(null);

  const stores = [
    {
      id: 1,
      name: "Downtown Flagship Store",
      address: "123 Commerce Street, San Francisco, CA 94108",
      phone: "(415) 555-1234",
      hours: {
        weekdays: "9:00 AM - 8:00 PM",
        saturday: "10:00 AM - 7:00 PM",
        sunday: "11:00 AM - 6:00 PM"
      },
      features: ["parking", "wifi", "accessible"],
      coordinates: { lat: 37.7749, lng: -122.4194 },
      image: "🏬"
    },
    {
      id: 2,
      name: "Metro Shopping Center",
      address: "456 Urban Avenue, Suite 200, New York, NY 10001",
      phone: "(212) 555-5678",
      hours: {
        weekdays: "10:00 AM - 9:00 PM",
        saturday: "10:00 AM - 9:00 PM",
        sunday: "11:00 AM - 7:00 PM"
      },
      features: ["parking", "wifi"],
      coordinates: { lat: 40.7128, lng: -74.0060 },
      image: "🏢"
    },
    {
      id: 3,
      name: "Hillside Mall Location",
      address: "789 Retail Boulevard, Los Angeles, CA 90015",
      phone: "(213) 555-9012",
      hours: {
        weekdays: "10:00 AM - 8:00 PM",
        saturday: "10:00 AM - 8:00 PM",
        sunday: "11:00 AM - 6:00 PM"
      },
      features: ["parking", "accessible"],
      coordinates: { lat: 34.0522, lng: -118.2437 },
      image: "🛍️"
    },
    {
      id: 4,
      name: "Historic District Store",
      address: "321 Heritage Lane, Boston, MA 02108",
      phone: "(617) 555-3456",
      hours: {
        weekdays: "9:30 AM - 7:30 PM",
        saturday: "10:00 AM - 7:00 PM",
        sunday: "12:00 PM - 5:00 PM"
      },
      features: ["wifi", "accessible"],
      coordinates: { lat: 42.3601, lng: -71.0589 },
      image: "🏛️"
    }
  ];

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStoreClick = (storeId) => {
    setActiveStore(activeStore === storeId ? null : storeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Our Stores</h1>
          <p className="text-xl text-amber-600 max-w-3xl mx-auto">
            Visit us in person to experience our products firsthand
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by store name or location"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="w-full md:w-auto px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              Find Nearest Store
            </button>
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Stores List */}
          <div className="lg:col-span-1 space-y-4">
            {filteredStores.length > 0 ? (
              filteredStores.map(store => (
                <div 
                  key={store.id}
                  onClick={() => handleStoreClick(store.id)}
                  className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all ${
                    activeStore === store.id ? 'ring-2 ring-amber-500' : 'hover:shadow-lg'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-3 rounded-lg mr-4 text-2xl">
                        {store.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{store.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <FiMapPin className="mr-1" /> {store.address}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FiPhone className="mr-1" /> {store.phone}
                        </div>
                      </div>
                      <FiChevronRight className={`text-gray-400 transition-transform ${
                        activeStore === store.id ? 'transform rotate-90' : ''
                      }`} />
                    </div>

                    {activeStore === store.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <FiClock className="mr-2" /> Store Hours
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>Mon-Fri: {store.hours.weekdays}</li>
                            <li>Sat: {store.hours.saturday}</li>
                            <li>Sun: {store.hours.sunday}</li>
                          </ul>
                        </div>
                        
                        {store.features.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Store Features</h4>
                            <div className="flex flex-wrap gap-3">
                              {store.features.includes("parking") && (
                                <span className="flex items-center text-sm bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                                  <FaParking className="mr-1" /> Parking
                                </span>
                              )}
                              {store.features.includes("wifi") && (
                                <span className="flex items-center text-sm bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                                  <FaWifi className="mr-1" /> Free WiFi
                                </span>
                              )}
                              {store.features.includes("accessible") && (
                                <span className="flex items-center text-sm bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                                  <FaWheelchair className="mr-1" /> Accessible
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-500">No stores found matching your search</p>
              </div>
            )}
          </div>

         {/* Map View */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-96 w-full">
              <iframe
                title="Store Location"
                src={
                  activeStore === 'dodoma'
                    ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.755069609038!2d35.74031331478635!3d-6.162848995524477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184d9b8a9f1a3a9f%3A0x8f8d7c1e1c1e1c1e!2sDodoma%20City%20Center!5e0!3m2!1sen!2stz!4v1620000000000!5m2!1sen!2stz'
                    : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.935292510343!2d39.18302931477093!3d-6.822259995058538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b0d28c38e91%3A0x9e3c4b7e6b5d1b1e!2sPosta%2C%20Dar%20es%20Salaam!5e0!3m2!1sen!2stz!4v1620000000000!5m2!1sen!2stz'
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="p-4 bg-amber-50 text-center">
              <h3 className="text-xl font-bold text-amber-800 mb-2">
                {activeStore === 'dodoma' ? 'Dodoma Store' : 'Dar es Salaam Store'}
              </h3>
              <p className="text-gray-700">
                {activeStore === 'dodoma' 
                  ? 'Dodoma City Center, Tanzania' 
                  : 'Posta, Dar es Salaam, Tanzania'}
              </p>
              <div className="flex justify-center space-x-4 mt-3">
                <button
                  onClick={() => setActiveStore('dodoma')}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeStore === 'dodoma' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  Dodoma
                </button>
                <button
                  onClick={() => setActiveStore('dar-es-salaam')}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeStore === 'dar-es-salaam' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  Dar es Salaam
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Store Services */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-amber-800 mb-6">Store Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-amber-300 transition-colors">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center text-amber-600 mb-4">
                <FaStore className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">In-Store Pickup</h3>
              <p className="text-gray-600">
                Order online and pick up your items at your nearest store, often within hours.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:border-amber-300 transition-colors">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center text-amber-600 mb-4">
                <FaWheelchair className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">
                All our stores are wheelchair accessible with trained staff to assist you.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:border-amber-300 transition-colors">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center text-amber-600 mb-4">
                <FiPhone className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Personal Shopping</h3>
              <p className="text-gray-600">
                Book a one-on-one session with our style experts for personalized recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Can't visit in person?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Our online store offers the same great products with delivery to your doorstep.
          </p>
          <button className="px-6 py-3 bg-white text-amber-700 rounded-lg font-medium hover:bg-amber-100 transition-colors">
            Shop Online Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stores;