import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import profileImage from '../images/profile_photo.png';
import { useProfile } from '../context/ProfileContext';
import { GraduationCap, Briefcase, Award, Users, MapPin, Mail, Phone, FileText } from 'lucide-react';

export function About() {
  const { profile } = useProfile();

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-navy via-[hsl(220,55%,22%)] to-[hsl(213,60%,25%)] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start sm:gap-8">
            {/* Photo */}
            <div className="flex-shrink-0 mb-5 sm:mb-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl mx-auto">
                <ImageWithFallback
                  src={profile.photoUrl || profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold mb-3 border border-white/10">
                <Award className="w-3.5 h-3.5" />
                Distinguished Professor
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1.5 tracking-tight">
                {profile.name}
              </h1>
              <p className="text-blue-200 text-sm font-medium mb-1">{profile.title}</p>

              <div className="flex items-start gap-1.5 text-blue-300/80 text-xs mt-2 justify-center sm:justify-start">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>{profile.institution}</span>
              </div>

              {/* Contact chips */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-blue-100 text-xs hover:bg-white/20 transition-colors border border-white/10 touch-target"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {profile.email}
                </a>
                <a
                  href={`tel:${profile.mobile}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-blue-100 text-xs hover:bg-white/20 transition-colors border border-white/10 touch-target"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {profile.mobile}
                </a>
                {profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    download={`${profile.name.replace(/\s+/g, '_')}_CV.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold text-white text-xs hover:opacity-90 transition-opacity border border-gold touch-target"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Download Resume
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-8 pt-8 border-t border-white/10">
            {Object.entries(profile.stats).map(([k, v]) => (
              <div key={k} className="bg-white/10 rounded-xl px-3 py-4 text-center border border-white/10">
                <div className="text-2xl font-extrabold text-white">{v}</div>
                <div className="text-xs text-blue-200 mt-1 capitalize">{k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Biography ───────────────────────────────────────────── */}
      <section className="section-pad bg-gray-50 dark:bg-gray-900">
        <div className="container-max max-w-3xl">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-navy dark:text-blue-400" />
            Academic Biography
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {profile.bio}
          </p>
        </div>
      </section>

      {/* ── Experience ──────────────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-gray-950">
        <div className="container-max">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-navy dark:text-blue-400" />
            Professional Experience
          </h2>

          <div className="space-y-3">
            {profile.experience.map((exp, i) => (
              <div
                key={i}
                className="card-base p-4 sm:p-5 border-l-4 border-l-navy dark:border-l-blue-500"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{exp.institution}</p>
                  </div>
                  <span className="inline-flex items-center self-start px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-navy dark:text-blue-300 text-xs font-medium whitespace-nowrap flex-shrink-0">
                    {exp.duration}
                  </span>
                </div>
                {exp.details && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                    {exp.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ───────────────────────────────────────────── */}
      <section className="section-pad bg-gray-50 dark:bg-gray-900">
        <div className="container-max">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-navy dark:text-blue-400" />
            Education
          </h2>

          {/* Timeline */}
          <div className="relative border-l-2 border-blue-100 dark:border-blue-900 ml-3 space-y-6 pb-2">
            {profile.education.map((edu, i) => (
              <div key={i} className="relative pl-8">
                {/* Dot */}
                <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-2 border-navy dark:border-blue-500" />

                <div className="card-base p-4 sm:p-5">
                  <span className="chip bg-blue-50 dark:bg-blue-900/30 text-navy dark:text-blue-300 border border-blue-100 dark:border-blue-800 mb-3">
                    {edu.year}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-2">{edu.degree}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{edu.institution}</p>
                  {edu.details && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                      {edu.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Administrative Roles ────────────────────────────────── */}
      <section className="section-pad bg-gray-950 text-white">
        <div className="container-max">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Administrative Roles
          </h2>
          <div className="space-y-2">
            {profile.administrativeRoles.map((role, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/8 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
                <p className="text-gray-300 text-xs leading-relaxed">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Memberships ─────────────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-gray-950">
        <div className="container-max">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-navy dark:text-blue-400" />
            Professional Memberships
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {profile.memberships.map((m, i) => (
              <div key={i} className="card-base p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-navy dark:text-blue-400" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{m}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
