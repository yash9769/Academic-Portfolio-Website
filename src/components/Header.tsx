import { useLocation } from 'react-router';
import ShinyText from './ui/ShinyText';
import PillNav from './ui/PillNav';

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
    <header className="sticky top-0 z-50">
      <PillNav
        logo={<ShinyText text="Dr. Sushopti Gawade" speed={3} className="text-lg font-bold" />}
        items={[{ label: 'Home', href: '/', ariaLabel: 'Home' }, ...navItems]}
        activeHref={location.pathname}
        baseColor="#FFF9F0"
        pillColor="#8B4513"
        pillTextColor="#5C5346"
        hoveredPillTextColor="#FFF9F0"
      />
    </header>
  );
}
