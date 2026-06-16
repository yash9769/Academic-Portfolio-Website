import { Trophy, Award, Star, BookOpen, TrendingUp, FileText } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

export function Awards() {
  const { profile } = useProfile();
  const administrativeRoles = profile.administrativeRoles || [];
  const memberships = profile.memberships || [];
  const patents = profile.patents || [];
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">

      {/* Page header */}
      <div className="bg-navy dark:bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Awards & Achievements</h1>
          <p className="text-blue-200 text-sm max-w-lg">
            Recognition for excellence in research, teaching, and academic service.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
          <div className="card-base p-4 text-center">
            <Trophy className="w-6 h-6 text-amber-500 dark:text-amber-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.stats.awards}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Awards</p>
          </div>
          <div className="card-base p-4 text-center">
            <Award className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{patents.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Patents</p>
          </div>
          <div className="card-base p-4 text-center">
            <Star className="w-6 h-6 text-amber-500 dark:text-amber-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{memberships.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Memberships</p>
          </div>
          <div className="card-base p-4 text-center">
            <BookOpen className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.stats.publications}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Publications</p>
          </div>
          <div className="card-base p-4 text-center">
            <TrendingUp className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.stats.citations}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Citations</p>
          </div>
          <div className="card-base p-4 text-center">
            <FileText className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.stats.copyrights}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Copyrights</p>
          </div>
        </div>

        {/* Timeline of achievements */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Key Achievements & Roles</h2>

          {/* Timeline layout: year indicator left, text right */}
          <div className="relative border-l-2 border-blue-100 dark:border-blue-900 ml-4 space-y-4 pb-2">
            {administrativeRoles.map((role, i) => {
              // Extract year range from role string
              const yearMatch = role.match(/\((\d{4})[^)]*\)/);
              const year = yearMatch ? yearMatch[1] : null;

              return (
                <div key={i} className="relative pl-8">
                  {/* Dot */}
                  <div className="absolute -left-[9px] top-3.5 w-4 h-4 rounded-full bg-white dark:bg-gray-950 border-2 border-navy dark:border-blue-500" />

                  <div className="card-base p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                      <div>
                        {year && (
                          <span className="chip bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-800 text-[10px] mb-1.5">
                            {year}
                          </span>
                        )}
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Professional Memberships */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Professional Memberships</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {memberships.map((m, i) => (
              <div key={i} className="card-base p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-navy dark:text-blue-400" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{m}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
