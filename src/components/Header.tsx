import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router';
import { Menu, X, BookOpen, GraduationCap, FlaskConical, Microscope, Award, Users, Mail, FileText, ChevronRight } from 'lucide-react';

const navItems = [
  { label: 'About', href: '/about', icon: GraduationCap },
  { label: 'Research', href: '/research', icon: Microscope },
  { label: 'Publications', href: '/publications', icon: BookOpen },
  { label: 'Teaching', href: '/teaching', icon: BookOpen },
  { label: 'Patents', href: '/patents', icon: FileText },
  { label: 'Team', href: '/team', icon: Users },
  { label: 'Awards', href: '/awards', icon: Award },
  { label: 'Contact', href: '/contact', icon: Mail },
];

export function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Sticky header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur shadow-sm border-b border-gray-100 dark:border-gray-800'
            : 'bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800'
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4 max-w-6xl mx-auto">
          {/* Logo / Name */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-sm text-navy dark:text-blue-300 hover:opacity-80 transition-opacity"
            aria-label="Dr. Sushopti Gawade – Home"
          >
            <span className="w-7 h-7 rounded-full bg-navy flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              SG
            </span>
            <span>Dr. Sushopti Gawade</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'bg-navy text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden touch-target flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <nav
            id="mobile-nav"
            className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-white dark:bg-gray-950 shadow-2xl flex flex-col overflow-y-auto"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-navy">
              <div>
                <p className="text-white font-bold text-sm">Dr. Sushopti Gawade</p>
                <p className="text-blue-200 text-xs mt-0.5">Professor, IT Dept.</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="touch-target flex items-center justify-center w-10 h-10 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <ul className="flex-1 py-3 px-3" role="list">
              <li>
                <Link
                  to="/"
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-navy dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="flex items-center gap-3 flex-1">Home</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              </li>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-navy dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-navy dark:text-blue-400' : 'text-gray-400'}`} />
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Drawer footer */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Vidyalankar Institute of Technology
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-0.5">
                Wadala, Mumbai, India
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
