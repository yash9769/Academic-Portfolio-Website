import { Calendar, Users, GraduationCap, ChevronRight, Microscope, FileText } from 'lucide-react';
import { profile } from '../data/profile';

export function Research() {
  const totalFunding = profile.grants.reduce((sum, g) => {
    return sum + parseInt(g.amount.replace(/[^0-9]/g, ''), 10);
  }, 0);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">

      {/* Page header */}
      <div className="bg-navy dark:bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Research</h1>
          <p className="text-blue-200 text-sm max-w-xl">
            Federally-funded projects spanning agriculture technology, machine learning, and e-governance.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Research Interests */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Microscope className="w-5 h-5 text-navy dark:text-blue-400" />
            Research Areas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.researchInterests.map((r, i) => (
              <div key={i} className="card-base p-4 border-l-4 border-l-navy dark:border-l-blue-500">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{r.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{r.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary stats */}
        <section className="mb-10">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            <div className="card-base p-4 text-center">
              <Users className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.grants.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Funded</p>
            </div>
            <div className="card-base p-4 text-center">
              <span className="flex items-center justify-center text-xl font-extrabold text-navy dark:text-blue-400 h-6 mb-2">₹</span>
              <div className="text-lg font-extrabold text-gray-900 dark:text-white">{(totalFunding / 100000).toFixed(1)}L</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Funding</p>
            </div>
            <div className="card-base p-4 text-center">
              <GraduationCap className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.studentGuidance.phd.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Ph.D.</p>
            </div>
            <div className="card-base p-4 text-center">
              <FileText className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.stats.publications}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Papers</p>
            </div>
            <div className="card-base p-4 text-center">
              <Microscope className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.studentGuidance.pg.length}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">PG Guided</p>
            </div>
            <div className="card-base p-4 text-center">
              <FileText className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.stats.copyrights}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Copyrights</p>
            </div>
          </div>
        </section>

        {/* Funded Projects */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Funded Projects</h2>
          <div className="space-y-4">
            {profile.grants.map((grant, i) => (
              <div key={i} className="card-base p-4 sm:p-5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 leading-snug">
                  {grant.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">Funding Agency</p>
                    <p className="text-xs font-semibold text-navy dark:text-blue-400">{grant.agency}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">Amount</p>
                    <p className="text-xs font-semibold text-green-700 dark:text-green-400">{grant.amount}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">Duration</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{grant.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ph.D. Students */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-navy dark:text-blue-400" />
            Ph.D. Research Supervision
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.studentGuidance.phd.map((s, i) => (
              <div key={i} className="card-base p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug mb-1">{s.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.university}</p>
                  </div>
                  <span className={`chip flex-shrink-0 border text-[10px] ${
                    s.status.includes('Awarded')
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800'
                      : 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800'
                  }`}>
                    {s.status.includes('Awarded') ? 'Awarded' : 'Ongoing'}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">{s.status}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PG Dissertations */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-navy dark:text-blue-400" />
            PG Dissertations Guided ({profile.studentGuidance.pg.length})
          </h2>
          <div className="card-base p-4 sm:p-5">
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {profile.studentGuidance.pg.map((p, i) => (
                <li key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <ChevronRight className="w-4 h-4 text-navy dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Collaborations */}
        <section className="card-base p-5 bg-gray-50 dark:bg-gray-900 border-0 text-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Research Collaborations</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Past and ongoing collaborations with Suncreattica Mumbai, Innoshri Pvt. Ltd. Pune,
            A2AW Pvt. Ltd. Pune, Arthavedh Consulting Pune, and IIT Bombay TIH.
          </p>
        </section>
      </div>
    </div>
  );
}
