import type { JSX } from "react/jsx-runtime";
import { 
  FiGithub, 
  FiHeart, 
  FiFilm, 
  FiTrendingUp,
  FiStar,
  FiClock,
  FiMail,
  FiTwitter,
  FiInstagram,
  FiYoutube
} from "react-icons/fi";
import type { Movie } from "./api/movieApi";

interface IFooter {
  movie: Movie[]
}

function Footer({movie}: IFooter): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="text-xl">🍿</span>
              </div>
              <div>
                <h2 className="text-white text-lg font-bold tracking-wide">
                  usePopcorn
                </h2>
                <p className="text-xs text-gray-400">
                  discover your next movie
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your ultimate destination for discovering and exploring movies from around the world.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-xs text-gray-500">Made with</span>
              <FiHeart className="text-red-500 animate-pulse" />
              <span className="text-xs text-gray-500">by Movie Lovers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FiFilm className="text-xs group-hover:text-orange-400 transition-colors" />
                  Browse Movies
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FiTrendingUp className="text-xs group-hover:text-orange-400 transition-colors" />
                  Trending Now
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FiStar className="text-xs group-hover:text-orange-400 transition-colors" />
                  Top Rated
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FiClock className="text-xs group-hover:text-orange-400 transition-colors" />
                  Coming Soon
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wide">
              Support
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FiMail className="text-xs group-hover:text-orange-400 transition-colors" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className="col-span-1">
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wide">
              Follow Us
            </h3>
            <div className="flex items-center gap-3 mb-6">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-400/50 hover:bg-orange-500/10 transition-all duration-300 group"
              >
                <FiGithub className="text-lg group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-400/50 hover:bg-orange-500/10 transition-all duration-300 group"
              >
                <FiTwitter className="text-lg group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-400/50 hover:bg-orange-500/10 transition-all duration-300 group"
              >
                <FiInstagram className="text-lg group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-400/50 hover:bg-orange-500/10 transition-all duration-300 group"
              >
                <FiYoutube className="text-lg group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Newsletter */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-xs text-gray-400 mb-2">
                Subscribe to our newsletter
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 outline-none focus:border-orange-400/50 transition-colors"
                />
                <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} usePopcorn. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              {movie.length} movies available
            </span>
            <span className="text-xs text-gray-500">
              Made with 🧡 using React & TypeScript
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;