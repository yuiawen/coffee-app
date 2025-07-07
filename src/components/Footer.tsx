import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-coffee-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-coffee-cream rounded-full flex items-center justify-center">
                <span className="text-coffee-primary font-bold text-sm">☕</span>
              </div>
              <span className="font-heading text-xl font-bold">KopiKata</span>
            </div>
            <p className="text-coffee-light text-sm">
              Menghadirkan cita rasa kopi terbaik untuk setiap momen istimewa Anda.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-coffee-light hover:text-coffee-cream transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-coffee-light hover:text-coffee-cream transition-colors">
                  Menu Kopi
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-coffee-light hover:text-coffee-cream transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-coffee-light hover:text-coffee-cream transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Kontak Kami</h3>
            <div className="space-y-2 text-sm text-coffee-light">
              <p>📍 Jl. Kopi Raya No. 123, Jakarta</p>
              <p>📞 +62 21 1234 5678</p>
              <p>✉️ info@kopikita.com</p>
              <p>🕒 Senin - Minggu: 07:00 - 22:00</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Ikuti Kami</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="text-coffee-light hover:text-coffee-cream transition-colors block">
                📘 Facebook
              </a>
              <a href="#" className="text-coffee-light hover:text-coffee-cream transition-colors block">
                📷 Instagram
              </a>
              <a href="#" className="text-coffee-light hover:text-coffee-cream transition-colors block">
                🐦 Twitter
              </a>
              <a href="#" className="text-coffee-light hover:text-coffee-cream transition-colors block">
                📺 YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-coffee-secondary mt-8 pt-8 text-center">
          <p className="text-coffee-light text-sm">
            © 2024 KopiKata. All rights reserved. | Ready for CodeIgniter 4 Integration
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;