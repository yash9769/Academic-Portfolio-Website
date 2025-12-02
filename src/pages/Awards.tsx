import { Trophy, Award, Star } from 'lucide-react';
import { profile } from '../data/profile';

export function Awards() {
  return (
    <div className="bg-[#FFF9F0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-[#8B4513] mb-8">Awards & Achievements</h1>
        <p className="text-[#5C5346] mb-12 max-w-3xl">
          Recognition for excellence in research, teaching, and service to the academic community.
        </p>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] text-center">
            <Trophy className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
            <div className="text-[#2C2416] mb-1">{profile.stats.awards}</div>
            <p className="text-[#5C5346]">Awards & Honors</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] text-center">
            <Award className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
            <div className="text-[#2C2416] mb-1">{profile.patents.length}</div>
            <p className="text-[#5C5346]">Patents</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] text-center">
            <Star className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
            <div className="text-[#2C2416] mb-1">{profile.memberships.length}</div>
            <p className="text-[#5C5346]">Professional Memberships</p>
          </div>
        </div>

        {/* Administrative Roles as Achievements */}
        <section className="mb-20">
          <h2 className="text-[#8B4513] mb-8">Key Achievements & Roles</h2>
          <div className="space-y-6">
            {profile.administrativeRoles.map((role, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] flex items-start gap-4"
              >
                <Trophy className="w-6 h-6 text-[#8B4513] flex-shrink-0 mt-1" />
                <p className="text-[#5C5346]">{role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Memberships */}
        <section className="bg-[#F5EFE6] p-12 rounded-lg">
          <h2 className="text-[#8B4513] mb-8 text-center">Professional Memberships</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {profile.memberships.map((membership, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] text-center">
                <Award className="w-8 h-8 text-[#8B4513] mx-auto mb-3" />
                <p className="text-[#2C2416] font-medium">{membership}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
