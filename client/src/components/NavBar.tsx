import { useState } from 'react';
import { Link, useLocation } from 'wouter';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-dark text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <i className="fas fa-play text-white"></i>
          </div>
          <span className="font-bold text-xl">Amateur Sports FAST</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`hover:text-primary font-medium ${location === '/' ? 'text-primary' : ''}`}>
            Home
          </Link>
          <Link href="/live" className={`hover:text-primary font-medium ${location === '/live' ? 'text-primary' : ''}`}>
            Live Now
          </Link>
          <Link href="/highlights" className={`hover:text-primary font-medium ${location === '/highlights' ? 'text-primary' : ''}`}>
            Highlights
          </Link>
          <Link href="/upload" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition duration-200">
            Upload Game
          </Link>
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <button onClick={toggleMobileMenu} className="md:hidden text-white text-2xl">
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-dark-lighter`}>
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
          <Link href="/" className="text-white hover:text-primary py-2 border-b border-gray-700">
            Home
          </Link>
          <Link href="/live" className="text-white hover:text-primary py-2 border-b border-gray-700">
            Live Now
          </Link>
          <Link href="/highlights" className="text-white hover:text-primary py-2 border-b border-gray-700">
            Highlights
          </Link>
          <Link href="/upload" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition duration-200 text-center my-2">
            Upload Game
          </Link>
        </div>
      </div>
    </header>
  );
}
