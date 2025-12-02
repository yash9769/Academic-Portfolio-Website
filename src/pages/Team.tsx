import { User, GraduationCap } from 'lucide-react';
import { profile } from '../data/profile';

export function Team() {
  return (
    <div className="bg-[#FFF9F0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-[#8B4513] mb-8">Research Team & Guidance</h1>
        <p className="text-[#5C5346] mb-12 max-w-3xl">
          Mentoring the next generation of researchers through Ph.D. supervision and postgraduate project guidance.
        </p>

        {/* PhD Scholars */}
        <section className="mb-20">
          <h2 className="text-[#8B4513] mb-8">Ph.D. Scholars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile.studentGuidance.phd.map((scholar, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#F5EFE6] flex items-center justify-center border-2 border-[#8B4513]">
                  <User className="w-12 h-12 text-[#8B4513]" />
                </div>
                <h4 className="text-[#2C2416] text-lg font-semibold mb-2">{scholar.name}</h4>
                <p className="text-[#5C5346] mb-2">{scholar.university}</p>
                <span className="inline-block px-3 py-1 bg-[#F5EFE6] text-[#8B4513] rounded-full text-sm">
                  {scholar.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PG Projects */}
        <section className="mb-20">
          <h2 className="text-[#8B4513] mb-8">Postgraduate (PG) Dissertations</h2>
          <div className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.studentGuidance.pg.map((project, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-[#FFF9F0] rounded-lg">
                  <GraduationCap className="w-6 h-6 text-[#8B4513] flex-shrink-0 mt-1" />
                  <span className="text-[#5C5346] font-medium">{project}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="bg-[#F5EFE6] p-12 rounded-lg text-center">
          <h2 className="text-[#8B4513] mb-6">Join Our Research Group</h2>
          <p className="text-[#5C5346] max-w-3xl mx-auto mb-8">
            We are always looking for motivated students and researchers to join our team. If you are
            interested in Usability Engineering, AI/ML, or Agriculture Technology,
            please reach out to discuss potential opportunities.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#8B4513] hover:bg-[#6B3410] text-white px-8 py-3 rounded-lg transition-colors"
          >
            Get in Touch
          </a>
        </section>
      </div>
    </div>
  );
}
