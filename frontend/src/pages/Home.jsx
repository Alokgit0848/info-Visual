import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/images/img1.jpg", 
  },
  {
    image: "/images/img2.jpg",
   
  },
  {
    image: "/images/img3.jpg",
    
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            id="slide-image"
            src={slides[currentSlide].image}
            className="w-full h-full object-cover"
            alt="Slide"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center px-4">
            <h1 id="slide-title" className="text-5xl font-bold mb-4">
              {slides[currentSlide].title}
            </h1>
            <p id="slide-description" className="text-xl mb-8">
              {slides[currentSlide].description}
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold flex items-center mx-auto">
              <Link to="/api/auth/login" className="flex items-center">
                Get Started
                <i data-lucide="arrow-right" className="ml-2"></i>
              </Link>
            </button>
          </div>
        </div>

        <button
          id="prev-slide"
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full hover:bg-opacity-50"
        >
          <i data-lucide="chevron-left" className="text-white"></i>
        </button>
        <button
          id="next-slide"
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full hover:bg-opacity-50"
        >
          <i data-lucide="chevron-right" className="text-white"></i>
        </button>
      </div>

     

      {/* Stats Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div
            id="stats-grid"
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {/* Stats will be dynamically added */}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <i data-lucide="building-2" className="text-blue-600 mb-4 w-8 h-8"></i>
              <h3 className="text-xl font-semibold mb-4">Business Consulting</h3>
              <p className="text-gray-600 mb-4">
                Strategic guidance for your business growth and success.
              </p>
              <button className="text-blue-600 font-semibold">
                Learn More →
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <i data-lucide="target" className="text-blue-600 mb-4 w-8 h-8"></i>
              <h3 className="text-xl font-semibold mb-4">Digital Marketing</h3>
              <p className="text-gray-600 mb-4">
                Reach your target audience and grow your online presence.
              </p>
              <button className="text-blue-600 font-semibold">
                Learn More →
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <i data-lucide="briefcase" className="text-blue-600 mb-4 w-8 h-8"></i>
              <h3 className="text-xl font-semibold mb-4">IT Solutions</h3>
              <p className="text-gray-600 mb-4">
                Custom software and technology solutions for your needs.
              </p>
              <button className="text-blue-600 font-semibold">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-400">
                Leading the way in business innovation and digital
                transformation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <i data-lucide="phone" className="w-4 h-4 mr-2"></i>
                  +1 234 567 890
                </li>
                <li className="flex items-center">
                  <i data-lucide="mail" className="w-4 h-4 mr-2"></i>
                  info@company.com
                </li>
                <li className="flex items-center">
                  <i data-lucide="message-square" className="w-4 h-4 mr-2"></i>
                  Live Chat
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400">
                  <i data-lucide="globe" className="w-6 h-6"></i>
                </a>
                <a href="#" className="hover:text-blue-400">
                  <i data-lucide="heart" className="w-6 h-6"></i>
                </a>
                <a href="#" className="hover:text-blue-400">
                  <i data-lucide="check-circle" className="w-6 h-6"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Infotact(Alok). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;