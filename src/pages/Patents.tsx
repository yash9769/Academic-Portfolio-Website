import { Award, CheckCircle, Clock, FileText, BookOpen, AlertCircle, GraduationCap, TrendingUp } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

const statusConfig = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes('granted'))
    return { icon: CheckCircle, color: 'text-green-600 dark:text-green-400', chip: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800' };
  if (s.includes('published'))
    return { icon: BookOpen, color: 'text-blue-600 dark:text-blue-400', chip: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800' };
  if (s.includes('applied'))
    return { icon: Clock, color: 'text-amber-600 dark:text-amber-400', chip: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800' };
  return { icon: AlertCircle, color: 'text-gray-500', chip: 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700' };
};

export function Patents() {
  const { profile } = useProfile();
  const grantedCount = (profile.patents || []).filter(p => p.status.toLowerCase().includes('granted')).length;

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">

      {/* Page header */}
      <div className="bg-navy dark:bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Patents & Copyrights</h1>
          <p className="text-blue-200 text-sm max-w-lg">
            Innovation portfolio in agriculture technology, ML, and healthcare.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
          <div className="card-base p-4 text-center">
            <Award className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.patents.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Patents</p>
          </div>
          <div className="card-base p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{grantedCount}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Granted</p>
          </div>
          <div className="card-base p-4 text-center">
            <FileText className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.copyrights.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Copyrights</p>
          </div>
          <div className="card-base p-4 text-center">
            <BookOpen className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.stats.publications}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Publications</p>
          </div>
          <div className="card-base p-4 text-center">
            <GraduationCap className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.stats.experience}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Experience</p>
          </div>
          <div className="card-base p-4 text-center">
            <TrendingUp className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.stats.citations}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Citations</p>
          </div>
        </div>

        {/* Patents list */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Patents</h2>
          <div className="space-y-3">
            {profile.patents.map((patent, i) => {
              const { icon: StatusIcon, chip } = statusConfig(patent.status);
              return (
                <div key={i} className="card-base p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-navy dark:text-blue-400 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug mb-2">
                        {patent.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`chip border text-[10px] ${chip}`}>
                          {patent.status}
                        </span>
                        {patent.number && (
                          <span className="text-[10px] text-gray-500 dark:text-gray-400">
                            No: {patent.number}
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">{patent.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Copyrights list */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Copyrights ({profile.copyrights.length})
          </h2>
          <div className="card-base overflow-hidden">
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {profile.copyrights.map((c, i) => (
                <li key={i} className="flex items-start gap-3 px-4 py-3">
                  <FileText className="w-4 h-4 text-navy dark:text-blue-400 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
