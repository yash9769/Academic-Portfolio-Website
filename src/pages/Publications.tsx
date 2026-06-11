import { useState } from 'react';
import { Input } from '../components/ui/input';
import { FileText, ExternalLink, Book, BookOpen, Search, X } from 'lucide-react';
import { profile } from '../data/profile';

type PubType = 'all' | 'journal' | 'conference' | 'book' | 'chapter';

const TYPE_LABELS: Record<PubType, string> = {
  all: 'All',
  journal: 'Journal',
  conference: 'Conference',
  book: 'Book',
  chapter: 'Book Chapter',
};

const YEAR_OPTIONS = ['all', '2024', '2023', '2022', '2021'];

const allPublications = [
  ...profile.publications.journals.map(p => ({ ...p, type: 'journal' as const })),
  ...profile.publications.conferences.map(p => ({ ...p, type: 'conference' as const })),
  ...profile.publications.books.map(p => ({ ...p, type: 'book' as const })),
  ...profile.publications.bookChapters.map(p => ({ ...p, type: 'chapter' as const })),
];

const typeIcon = (type: string) => {
  if (type === 'book' || type === 'chapter') return Book;
  return FileText;
};

const typeColor: Record<string, string> = {
  journal: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800',
  conference: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-800',
  book: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800',
  chapter: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800',
};

export function Publications() {
  const [search, setSearch] = useState('');
  const [year, setYear] = useState<string>('all');
  const [type, setType] = useState<PubType>('all');

  const filtered = allPublications.filter(pub => {
    const q = search.toLowerCase();
    const matchSearch =
      pub.title.toLowerCase().includes(q) ||
      ('authors' in pub && (pub as any).authors?.toLowerCase().includes(q)) ||
      ('journal' in pub && (pub as any).journal?.toLowerCase().includes(q));
    const matchYear = year === 'all' || pub.year === year;
    const matchType = type === 'all' || pub.type === type;
    return matchSearch && matchYear && matchType;
  });

  const counts: Record<PubType, number> = {
    all: allPublications.length,
    journal: allPublications.filter(p => p.type === 'journal').length,
    conference: allPublications.filter(p => p.type === 'conference').length,
    book: allPublications.filter(p => p.type === 'book').length,
    chapter: allPublications.filter(p => p.type === 'chapter').length,
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">

      {/* Page header */}
      <div className="bg-navy dark:bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Publications</h1>
          <p className="text-blue-200 text-sm max-w-lg">
            {allPublications.length}+ peer-reviewed publications in Springer, Elsevier, IEEE, and other venues.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search bar */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            type="search"
            placeholder="Search by title, authors, or venue…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-9 h-11 text-sm border-gray-200 dark:border-gray-700 dark:bg-gray-900"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-target flex items-center justify-center"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Type filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {(Object.keys(TYPE_LABELS) as PubType[]).map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors touch-target ${
                type === t
                  ? 'bg-navy text-white border-navy dark:bg-blue-600 dark:border-blue-600'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-navy dark:hover:border-blue-500'
              }`}
            >
              {TYPE_LABELS[t]}
              <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] ${
                type === t ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              }`}>
                {counts[t]}
              </span>
            </button>
          ))}
        </div>

        {/* Year filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {YEAR_OPTIONS.map(y => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors touch-target ${
                year === y
                  ? 'bg-navy text-white border-navy dark:bg-blue-600 dark:border-blue-600'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-navy dark:hover:border-blue-500'
              }`}
            >
              {y === 'all' ? 'All Years' : y}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Showing <strong>{filtered.length}</strong> of {allPublications.length} publications
          {search && <> matching "<span className="italic">{search}</span>"</>}
        </p>

        {/* Publication list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-600">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No publications match your filters.</p>
            <button
              onClick={() => { setSearch(''); setYear('all'); setType('all'); }}
              className="mt-3 text-xs font-semibold text-navy dark:text-blue-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((pub: any, i) => {
              const Icon = typeIcon(pub.type);
              return (
                <article
                  key={i}
                  className="card-base p-4 sm:p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-navy dark:text-blue-400" strokeWidth={1.75} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`chip border text-[10px] ${typeColor[pub.type]}`}>
                          {TYPE_LABELS[pub.type as PubType]}
                        </span>
                        {pub.year && (
                          <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">
                            {pub.year}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug mb-1">
                        {pub.title}
                      </h3>

                      {pub.authors && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{pub.authors}</p>
                      )}

                      {pub.journal && (
                        <p className="text-xs text-navy dark:text-blue-400 italic mb-2">{pub.journal}</p>
                      )}

                      {pub.publisher && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {pub.publisher}
                          {pub.isbn && <> · ISBN: {pub.isbn}</>}
                        </p>
                      )}

                      {pub.book && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-2">
                          In: {pub.book}
                        </p>
                      )}

                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy dark:text-blue-400 hover:underline touch-target"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Paper
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
