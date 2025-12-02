import { Link } from 'react-router';
import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="bg-[#F5EFE6] border-t border-[#E8DCC8] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <span className="text-[#8B4513] font-semibold">{profile.name}</span>
            <p className="mt-4 text-[#5C5346]">
              {profile.title}
              <br />
              {profile.institution}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#2C2416] mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/publications" className="text-[#5C5346] hover:text-[#8B4513]">
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/research" className="text-[#5C5346] hover:text-[#8B4513]">
                  Research
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-[#5C5346] hover:text-[#8B4513]">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#5C5346] hover:text-[#8B4513]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#2C2416] mb-4 font-semibold">Contact</h4>
            <p className="text-[#5C5346]">
              {profile.institution}<br />
              Email: {profile.email}
            </p>
          </div>
        </div>

        <div className="border-t border-[#E8DCC8] mt-8 pt-8 text-center text-[#5C5346]">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
