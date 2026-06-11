import { Mail, BookOpen, FileDown, ExternalLink } from 'lucide-react';
import { profile } from '../data/profile';

/**
 * Sticky bottom action bar — visible only on mobile (hidden lg:hidden).
 * Gives one-thumb access to the four most-used actions.
 */
export function BottomActionBar() {
  const actions = [
    {
      label: 'Email',
      icon: Mail,
      href: `mailto:${profile.email}`,
      external: false,
    },
    {
      label: 'Scholar',
      icon: BookOpen,
      href: profile.urls.googleScholar,
      external: true,
    },
    {
      label: 'ORCID',
      icon: ExternalLink,
      href: profile.urls.orcid,
      external: true,
    },
    {
      label: 'Scopus',
      icon: FileDown,
      href: profile.urls.scopus,
      external: true,
    },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="toolbar"
      aria-label="Quick actions"
    >
      <div className="flex items-stretch">
        {actions.map(({ label, icon: Icon, href, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 touch-target text-gray-500 dark:text-gray-400 hover:text-navy dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            aria-label={label}
          >
            <Icon className="w-5 h-5" strokeWidth={1.75} />
            <span className="text-[10px] font-medium leading-none">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
