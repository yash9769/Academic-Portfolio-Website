import { User, GraduationCap, ChevronRight } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { Link } from 'react-router';

export function Team() {
  const { profile } = useProfile();
  const phdScholars = profile.studentGuidance?.phd || [];
  const pgDissertations = profile.studentGuidance?.pg || [];
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">

      {/* Page header */}
      <div className="bg-navy dark:bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Research Team</h1>
          <p className="text-blue-200 text-sm max-w-lg">
            Mentoring the next generation of researchers through Ph.D. supervision and PG project guidance.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Ph.D. Scholars */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-navy dark:text-blue-400" />
            Ph.D. Scholars
          </h2>

          {/* 2-col grid on mobile, 3-col on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {phdScholars.map((s, i) => (
              <div key={i} className="card-base p-4 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3 border-2 border-blue-100 dark:border-blue-800">
                  <User className="w-7 h-7 text-navy dark:text-blue-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug mb-2 line-clamp-3">
                  {s.name}
                </h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2">{s.university}</p>
                <span className={`chip border text-[10px] ${
                  s.status.includes('Awarded')
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800'
                    : 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800'
                }`}>
                  {s.status.includes('Awarded') ? '✓ Awarded' : '● Ongoing'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PG Dissertations */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-navy dark:text-blue-400" />
            PG Dissertations ({pgDissertations.length})
          </h2>
          <div className="card-base overflow-hidden">
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {pgDissertations.map((p, i) => (
                <li key={i} className="flex items-start gap-3 px-4 py-3">
                  <ChevronRight className="w-4 h-4 text-navy dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Join our group */}
        <section className="card-base bg-navy dark:bg-gray-900 border-0 p-6 text-center">
          <h2 className="text-lg font-bold text-white mb-3">Join Our Research Group</h2>
          <p className="text-blue-200 text-sm max-w-lg mx-auto mb-6">
            Looking for motivated students and researchers interested in Usability Engineering, AI/ML,
            or Agriculture Technology. Reach out to discuss opportunities.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-navy font-semibold text-sm hover:bg-blue-50 transition-colors touch-target shadow"
          >
            Get in Touch
          </Link>
        </section>
      </div>
    </div>
  );
}
