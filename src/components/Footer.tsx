import { Link } from 'react-router';
import { profile } from '../data/profile';
import { Mail, ExternalLink, BookOpen, MapPin } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 mt-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                SG
              </div>
              <span className="font-bold text-white text-sm">{profile.name}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              {profile.title}<br />
              {profile.institution}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              Wadala, Mumbai, India
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Publications', href: '/publications' },
                { label: 'Research Projects', href: '/research' },
                { label: 'Teaching', href: '/teaching' },
                { label: 'Patents', href: '/patents' },
                { label: 'Research Team', href: '/team' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & profiles */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact & Profiles</h4>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors mb-3"
            >
              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
              {profile.email}
            </a>
            <div className="space-y-2">
              {[
                { label: 'Google Scholar', href: profile.urls.googleScholar },
                { label: 'ORCID', href: profile.urls.orcid },
                { label: 'Scopus', href: profile.urls.scopus },
                { label: 'ResearchGate', href: profile.urls.researchGate },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {year} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <BookOpen className="w-3 h-3" />
            <span>{profile.stats.publications} Publications · {profile.stats.citations} Citations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
