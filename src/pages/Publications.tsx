import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { FileText, ExternalLink, Book } from 'lucide-react';
import { profile } from '../data/profile';

export function Publications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const allPublications = [
    ...profile.publications.journals.map(p => ({ ...p, type: 'journal' })),
    ...profile.publications.conferences.map(p => ({ ...p, type: 'conference' })),
    ...profile.publications.books.map(p => ({ ...p, type: 'book' })),
    ...profile.publications.bookChapters.map(p => ({ ...p, type: 'chapter' })),
  ];

  const filteredPublications = allPublications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ('authors' in pub && pub.authors?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesYear = filterYear === 'all' || pub.year === filterYear;
    const matchesType = filterType === 'all' || pub.type === filterType;
    return matchesSearch && matchesYear && matchesType;
  });

  const journals = filteredPublications.filter(p => p.type === 'journal');
  const conferences = filteredPublications.filter(p => p.type === 'conference');
  const books = filteredPublications.filter(p => p.type === 'book');
  const chapters = filteredPublications.filter(p => p.type === 'chapter');

  return (
    <div className="bg-[#FFF9F0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-[#8B4513] mb-8">Publications</h1>
        <p className="text-[#5C5346] mb-12 max-w-3xl">
          A comprehensive list of peer-reviewed publications, conference proceedings, and book chapters.
        </p>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-[#E8DCC8]"
            />
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger className="border-[#E8DCC8]">
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="border-[#E8DCC8]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="journal">Journal Papers</SelectItem>
                <SelectItem value="conference">Conference Papers</SelectItem>
                <SelectItem value="book">Books</SelectItem>
                <SelectItem value="chapter">Book Chapters</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Journal Papers */}
        {journals.length > 0 && (
          <section className="mb-16">
            <h2 className="text-[#8B4513] mb-8">Journal Papers</h2>
            <div className="space-y-6">
              {journals.map((paper: any, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <FileText className="w-6 h-6 text-[#8B4513] flex-shrink-0 mt-1" />
                    <div className="flex-grow">
                      <h4 className="text-[#2C2416] mb-2">{paper.title}</h4>
                      <p className="text-[#5C5346] mb-1">{paper.authors}</p>
                      <p className="text-[#5C5346] mb-2">
                        <em>{paper.journal}</em>
                      </p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-[#8B4513]">{paper.year}</span>
                        {paper.link && (
                          <a href={paper.link} target="_blank" rel="noopener noreferrer">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#8B4513] text-[#8B4513] hover:bg-[#F5EFE6]"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Conference Papers */}
        {conferences.length > 0 && (
          <section className="mb-16">
            <h2 className="text-[#8B4513] mb-8">Conference Papers</h2>
            <div className="space-y-6">
              {conferences.map((paper: any, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <FileText className="w-6 h-6 text-[#8B4513] flex-shrink-0 mt-1" />
                    <div className="flex-grow">
                      <h4 className="text-[#2C2416] mb-2">{paper.title}</h4>
                      <p className="text-[#5C5346] mb-1">{paper.authors}</p>
                      <p className="text-[#5C5346] mb-2">
                        <em>{paper.journal}</em>
                      </p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-[#8B4513]">{paper.year}</span>
                        {paper.link && (
                          <a href={paper.link} target="_blank" rel="noopener noreferrer">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#8B4513] text-[#8B4513] hover:bg-[#F5EFE6]"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Books */}
        {books.length > 0 && (
          <section className="mb-16">
            <h2 className="text-[#8B4513] mb-8">Books</h2>
            <div className="space-y-6">
              {books.map((book: any, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <Book className="w-6 h-6 text-[#8B4513] flex-shrink-0 mt-1" />
                    <div className="flex-grow">
                      <h4 className="text-[#2C2416] mb-2">{book.title}</h4>
                      <p className="text-[#5C5346] mb-1">{book.publisher}</p>
                      {book.isbn && <p className="text-[#5C5346] mb-2">ISBN: {book.isbn}</p>}
                      <span className="text-[#8B4513]">{book.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Book Chapters */}
        {chapters.length > 0 && (
          <section>
            <h2 className="text-[#8B4513] mb-8">Book Chapters</h2>
            <div className="space-y-6">
              {chapters.map((chapter: any, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <FileText className="w-6 h-6 text-[#8B4513] flex-shrink-0 mt-1" />
                    <div className="flex-grow">
                      <h4 className="text-[#2C2416] mb-2">{chapter.title}</h4>
                      <p className="text-[#5C5346] mb-2">
                        In: <em>{chapter.book}</em>
                      </p>
                      <span className="text-[#8B4513]">{chapter.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
