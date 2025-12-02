import { DollarSign, Calendar, Users, GraduationCap } from 'lucide-react';
import { profile } from '../data/profile';

export function Research() {
  const totalFunding = profile.grants.reduce((sum, grant) => {
    const amount = parseInt(grant.amount.replace(/[^0-9]/g, ''));
    return sum + amount;
  }, 0);

  return (
    <div className="bg-[#FFF9F0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-[#8B4513] mb-8">Research Projects & Grants</h1>
        <p className="text-[#5C5346] mb-12 max-w-3xl">
          Currently directing and collaborating on multiple federally-funded research projects spanning
          agriculture technology, machine learning, and e-governance.
        </p>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] text-center">
            <Users className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
            <div className="text-[#2C2416] mb-1">{profile.grants.length}</div>
            <p className="text-[#5C5346]">Funded Projects</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] text-center">
            <DollarSign className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
            <div className="text-[#2C2416] mb-1">Rs. {totalFunding.toLocaleString()}</div>
            <p className="text-[#5C5346]">Total Funding</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] text-center">
            <Calendar className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
            <div className="text-[#2C2416] mb-1">{profile.studentGuidance.phd.length}</div>
            <p className="text-[#5C5346]">Ph.D. Scholars</p>
          </div>
        </div>

        {/* Project Cards */}
        <h2 className="text-[#8B4513] mb-8">Funded Projects</h2>
        <div className="space-y-8 mb-20">
          {profile.grants.map((grant, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8] hover:shadow-xl transition-shadow"
            >
              <div className="mb-6">
                <h3 className="text-[#2C2416] mb-4">{grant.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-[#5C5346] mb-1">Funding Agency</p>
                    <p className="text-[#8B4513]">{grant.agency}</p>
                  </div>
                  <div>
                    <p className="text-[#5C5346] mb-1">Amount</p>
                    <p className="text-[#8B4513]">{grant.amount}</p>
                  </div>
                  <div>
                    <p className="text-[#5C5346] mb-1">Duration</p>
                    <p className="text-[#8B4513]">{grant.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Student Guidance */}
        <section className="mb-20">
          <h2 className="text-[#8B4513] mb-8">Research Supervision</h2>

          <div className="mb-12">
            <h3 className="text-[#5C5346] text-xl mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6" /> Ph.D. Students
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.studentGuidance.phd.map((student, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8]">
                  <h4 className="text-[#2C2416] font-semibold mb-2">{student.name}</h4>
                  <p className="text-[#5C5346] mb-1">{student.university}</p>
                  <span className="inline-block px-3 py-1 bg-[#F5EFE6] text-[#8B4513] rounded-full text-sm">
                    {student.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#5C5346] text-xl mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6" /> PG Dissertations
            </h3>
            <div className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8]">
              <ul className="space-y-4">
                {profile.studentGuidance.pg.map((project, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#8B4513] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-[#5C5346]">{project}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section className="mt-20 bg-[#F5EFE6] p-12 rounded-lg">
          <h2 className="text-[#8B4513] mb-6 text-center">Research Collaborations</h2>
          <p className="text-[#5C5346] text-center max-w-3xl mx-auto">
            We actively collaborate with industry partners and academic institutions.
            Past collaborations include projects with Suncreattica Mumbai, Innoshri Pvt. Ltd. Pune,
            A2AW Pvt. Ltd. Pune, and Arthavedh Consulting Pune.
          </p>
        </section>
      </div>
    </div>
  );
}
