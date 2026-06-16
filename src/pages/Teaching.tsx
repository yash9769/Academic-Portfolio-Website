import { useState } from 'react';
import { BookOpen, GraduationCap, ChevronDown, Award, FileText } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

function Accordion({ title, level, children }: { title: string; level: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card-base overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors touch-target"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
            level === 'UG'
              ? 'bg-blue-50 dark:bg-blue-900/30'
              : 'bg-indigo-50 dark:bg-indigo-900/30'
          }`}>
            {level === 'UG'
              ? <BookOpen className="w-4 h-4 text-navy dark:text-blue-400" strokeWidth={1.75} />
              : <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" strokeWidth={1.75} />
            }
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug truncate">{title}</p>
            <span className={`chip mt-0.5 text-[10px] border ${
              level === 'UG'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800'
                : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800'
            }`}>
              {level}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="pt-3">{children}</div>
        </div>
      )}
    </div>
  );
}

export function Teaching() {
  const { profile } = useProfile();
  const [ugOpen, setUgOpen] = useState(false);
  const [pgOpen, setPgOpen] = useState(false);

  const ugCourses = profile.subjectsTaught?.ug || [];
  const pgCourses = profile.subjectsTaught?.pg || [];
  const phdStudents = profile.studentGuidance?.phd || [];

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">

      {/* Page header */}
      <div className="bg-navy dark:bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Teaching</h1>
          <p className="text-blue-200 text-sm max-w-lg">
            {ugCourses.length + pgCourses.length} courses taught across UG and PG programs over {profile.stats.experience} years.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
          <div className="card-base p-4 text-center">
            <BookOpen className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{ugCourses.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">UG Courses</p>
          </div>
          <div className="card-base p-4 text-center">
            <GraduationCap className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{pgCourses.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">PG Courses</p>
          </div>
          <div className="card-base p-4 text-center">
            <Award className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.stats.experience}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Experience</p>
          </div>
          <div className="card-base p-4 text-center">
            <FileText className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.stats.publications}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Publications</p>
          </div>
          <div className="card-base p-4 text-center">
            <GraduationCap className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{phdStudents.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Ph.D.</p>
          </div>
          <div className="card-base p-4 text-center">
            <FileText className="w-6 h-6 text-navy dark:text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{profile.stats.copyrights}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Copyrights</p>
          </div>
        </div>

        {/* UG Courses – accordion */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-navy dark:text-blue-400" />
              Undergraduate Courses
            </h2>
            <button
              onClick={() => setUgOpen(o => !o)}
              className="text-xs font-semibold text-navy dark:text-blue-400 hover:underline touch-target"
            >
              {ugOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          <div className="space-y-2">
            {ugCourses.map((course, i) => (
              <Accordion key={i} title={course} level="UG">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Undergraduate-level course taught under Mumbai University / VIT curriculum.
                </p>
              </Accordion>
            ))}
          </div>
        </section>

        {/* PG Courses – accordion */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-navy dark:text-blue-400" />
              Postgraduate Courses
            </h2>
            <button
              onClick={() => setPgOpen(o => !o)}
              className="text-xs font-semibold text-navy dark:text-blue-400 hover:underline touch-target"
            >
              {pgOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          <div className="space-y-2">
            {pgCourses.map((course, i) => (
              <Accordion key={i} title={course} level="PG">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Postgraduate-level course for ME/MTech programs under Mumbai University curriculum.
                </p>
              </Accordion>
            ))}
          </div>
        </section>

        {/* Teaching philosophy */}
        <section className="card-base bg-gray-50 dark:bg-gray-900 border-0 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Teaching Philosophy</h2>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              My teaching philosophy centers on fostering critical thinking and nurturing curiosity.
              Education should empower students to think deeply and develop problem-solving skills applicable across domains.
            </p>
            <p>
              I emphasize active learning through hands-on problem-solving, collaborative projects,
              and research-oriented coursework — exposing students to the frontier of technology.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
