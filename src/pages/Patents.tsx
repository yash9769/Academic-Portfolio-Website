import { Button } from '../components/ui/button';
import { Award, Download, CheckCircle, Clock, FileText } from 'lucide-react';
import { profile } from '../data/profile';

export function Patents() {
  const grantedPatents = profile.patents.filter(p => p.status.toLowerCase().includes('granted'));
  const publishedPatents = profile.patents.filter(p => !p.status.toLowerCase().includes('granted'));

  return (
    <div className="bg-[#FFF9F0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-[#8B4513] mb-8">Patents & Copyrights</h1>
        <p className="text-[#5C5346] mb-12 max-w-3xl">
          A portfolio of innovative patents and copyrights covering agriculture technology, machine learning,
          and healthcare solutions.
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] text-center">
            <Award className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
            <div className="text-[#2C2416] mb-1">{profile.patents.length}</div>
            <p className="text-[#5C5346]">Total Patents</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] text-center">
            <CheckCircle className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
            <div className="text-[#2C2416] mb-1">{grantedPatents.length}</div>
            <p className="text-[#5C5346]">Granted</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] text-center">
            <FileText className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
            <div className="text-[#2C2416] mb-1">{profile.copyrights.length}</div>
            <p className="text-[#5C5346]">Copyrights</p>
          </div>
        </div>

        {/* Patent List */}
        <h2 className="text-[#8B4513] mb-8">Patents</h2>
        <div className="space-y-8 mb-20">
          {profile.patents.map((patent, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8] hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-grow">
                  <h3 className="text-[#2C2416] mb-2">{patent.title}</h3>
                  <div className="flex items-center gap-4 flex-wrap mb-4">
                    {patent.number && <span className="text-[#8B4513]">Patent No: {patent.number}</span>}
                    <span
                      className={`px-3 py-1 rounded-full ${patent.status.toLowerCase().includes('granted')
                          ? 'bg-[#8B4513] text-white'
                          : 'bg-[#F5EFE6] text-[#8B4513]'
                        }`}
                    >
                      {patent.status}
                    </span>
                    <span className="text-[#5C5346]">{patent.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Copyright List */}
        <h2 className="text-[#8B4513] mb-8">Copyrights</h2>
        <div className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8]">
          <ul className="space-y-4">
            {profile.copyrights.map((copyright, index) => (
              <li key={index} className="flex items-start gap-3 border-b border-[#F5EFE6] last:border-0 pb-3 last:pb-0">
                <div className="w-2 h-2 bg-[#8B4513] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-[#5C5346]">{copyright}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
