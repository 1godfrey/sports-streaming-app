import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <i className="fas fa-play text-white text-xs"></i>
              </div>
              <span className="font-bold text-lg">Amateur Sports FAST</span>
            </div>
            <p className="text-gray-400 text-sm">
              A free, fast-streaming platform for amateur sports games worldwide. Watch live games, browse highlights, and upload your own content.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Watch</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/live" className="hover:text-primary transition">Live Games</Link></li>
              <li><Link href="/highlights" className="hover:text-primary transition">Highlights</Link></li>
              <li><Link href="/teams" className="hover:text-primary transition">Teams</Link></li>
              <li><Link href="/sports/all" className="hover:text-primary transition">All Sports</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Upload</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/upload" className="hover:text-primary transition">Upload Game</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition">How It Works</Link></li>
              <li><Link href="/guidelines" className="hover:text-primary transition">Content Guidelines</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-primary transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Amateur Sports FAST. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
