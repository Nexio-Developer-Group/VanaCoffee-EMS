import { MapPin, Phone, Clock, Heart } from "lucide-react";
import Logo from '@/components/template/Logo'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-primary-deep text-white py-12">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/home">
              <Logo className="hidden lg:block"  mode="dark" logoWidth={120} imgClass="mb-3"/>
            </Link>
            <p className="text-warm-white/80 mb-4 leading-relaxed">
              Udaipur&apos;s finest coffee destination near Gulab Bagh.
              Experience premium coffee, delicious food, and exceptional ambiance
              at unbeatable prices.
            </p>
            <p className="text-sm text-warm-white/60">
              Made with <Heart className="h-4 w-4 inline text-white" /> in Udaipur
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-warm-white/80 hover:text-caramel transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="text-warm-white/80 hover:text-caramel transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#about" className="text-warm-white/80 hover:text-caramel transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#location" className="text-warm-white/80 hover:text-caramel transition-colors">
                  Location
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-caramel mt-0.5 flex-shrink-0" />
                <span className="text-warm-white/80 text-sm">
                  Near Gulab Bagh, Udaipur, Rajasthan
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-caramel flex-shrink-0" />
                <span className="text-warm-white/80 text-sm">+91 88756 40905</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-caramel flex-shrink-0" />
                <span className="text-warm-white/80 text-sm">
                  Daily 9:00 AM - 7:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-warm-white/20 mt-8 pt-8 text-center">
            <p className="text-warm-white/60 text-sm">
            © {new Date().getFullYear()} Vans Cafe. All rights reserved. |
            <span className="text-caramel"> Best Coffee in Udaipur</span>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;