import { Link } from 'react-router';
import { BookOpen, Award, GraduationCap, TrendingUp, Trophy, Cpu, Network, Zap, Mail, ExternalLink, ChevronRight, FlaskConical, FileText } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import profileImage from '../images/profile_photo.png';
import { profile } from '../data/profile';

const iconMap: Record<string, React.ElementType> = {
  'Machine Learning': Cpu,
  'Internet of Things': Network,
  'Usability Engineering': Zap,
  'Data Science': TrendingUp,
};

const stats = [
  { icon: BookOpen, label: 'Publications', value: profile.stats.publications },
  { icon: Award, label: 'Patents', value: profile.stats.patents },
  { icon: GraduationCap, label: 'Experience', value: profile.stats.experience },
  { icon: TrendingUp, label: 'Citations', value: profile.stats.citations },
  { icon: Trophy, label: 'Awards', value: profile.stats.awards },
  { icon: FileText, label: 'Copyrights', value: profile.stats.copyrights },
];

const featuredPublications = profile.publications.journals.slice(0, 3);

export function Home() {
  return (
    <div className="bg-white dark:bg-gray-950">

      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-navy via-[hsl(220,55%,22%)] to-[hsl(213,60%,25%)] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-start lg:gap-14">

            {/* Profile photo */}
            <div className="flex-shrink-0 mb-6 lg:mb-0">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl mx-auto">
                <ImageWithFallback
                  src={profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold mb-4 border border-white/10">
                <Trophy className="w-3.5 h-3.5" />
                Professor · 28.5+ Years Experience
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">
                {profile.name}
              </h1>
              <p className="text-blue-200 text-base sm:text-lg font-medium mb-1">
                {profile.title}
              </p>
              <p className="text-blue-300/80 text-sm mb-6 max-w-lg mx-auto lg:mx-0">
                {profile.institution}
              </p>

              <p className="text-blue-100/90 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0 mb-7">
                {profile.summary}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/publications"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-navy font-semibold text-sm hover:bg-blue-50 transition-colors shadow touch-target"
                >
                  <BookOpen className="w-4 h-4" />
                  Publications
                </Link>
                <a
                  href={profile.urls.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20 touch-target"
                >
                  <ExternalLink className="w-4 h-4" />
                  Google Scholar
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20 touch-target"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </div>

              {/* Research interest chips */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
                {profile.researchInterests.map((r) => (
                  <span
                    key={r.title}
                    className="chip bg-white/10 text-blue-200 border border-white/10"
                  >
                    {r.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ─────────────────────────────────────────── */}
      <section className="bg-gray-950 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-px bg-gray-800">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-gray-950 dark:bg-gray-900 flex flex-col items-center justify-center py-6 px-3 text-center">
                <Icon className="w-5 h-5 text-blue-400 mb-2" strokeWidth={1.5} />
                <div className="text-2xl font-extrabold text-white">{value}</div>
                <div className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Research Areas ──────────────────────────────────── */}
      <section className="section-pad bg-gray-50 dark:bg-gray-900">
        <div className="container-max">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Core Research Areas</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
              Interdisciplinary research spanning AI, IoT, HCI, and data science
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {profile.researchInterests.map((area) => {
              const Icon = iconMap[area.title] ?? FlaskConical;
              return (
                <div
                  key={area.title}
                  className="card-base p-5 hover:shadow-md transition-shadow group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-navy group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5 text-navy dark:text-blue-400 group-hover:text-white transition-colors" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{area.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{area.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-6">
            <Link
              to="/research"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy dark:text-blue-400 hover:underline"
            >
              View All Research <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Selected Publications ────────────────────────────────── */}
      <section className="section-pad bg-white dark:bg-gray-950">
        <div className="container-max">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Selected Publications</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
              Peer-reviewed work in Springer, Elsevier, IEEE, and other venues
            </p>
          </div>

          <div className="space-y-4">
            {featuredPublications.map((pub, i) => (
              <div key={i} className="card-base p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Year badge */}
                <div className="flex-shrink-0">
                  <span className="chip bg-blue-50 dark:bg-blue-900/30 text-navy dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                    {pub.year}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug mb-1 line-clamp-2">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{pub.authors}</p>
                  <p className="text-xs text-navy dark:text-blue-400 font-medium italic mb-3">{pub.journal}</p>
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy dark:text-blue-400 hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Paper
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/publications"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-navy-light transition-colors shadow touch-target"
            >
              <BookOpen className="w-4 h-4" />
              View All Publications
            </Link>
          </div>
        </div>
      </section>

      {/* ── Research Metrics / Quick CTA ────────────────────────── */}
      <section className="section-pad bg-navy dark:bg-gray-900">
        <div className="container-max text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Collaborate or Learn More</h2>
          <p className="text-blue-200 text-sm mb-8 max-w-lg mx-auto">
            Open to research collaborations, Ph.D. supervision, and academic engagements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-navy font-semibold text-sm hover:bg-blue-50 transition-colors shadow touch-target"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20 touch-target"
            >
              <GraduationCap className="w-4 h-4" />
              About & CV
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
