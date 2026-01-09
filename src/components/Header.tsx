import { useLocation, Link } from 'react-router';

export function Header() {
  const location = useLocation();

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Research', href: '/research' },
    { label: 'Publications', href: '/publications' },
    { label: 'Patents', href: '/patents' },
    { label: 'Teaching', href: '/teaching' },
    { label: 'Team', href: '/team' },
    { label: 'Awards', href: '/awards' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Dr. Sushopti Gawade</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`transition-colors hover:text-foreground/80 ${location.pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
