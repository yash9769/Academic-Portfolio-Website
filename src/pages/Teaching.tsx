import { BookOpen, GraduationCap } from 'lucide-react';
import { profile } from '../data/profile';

export function Teaching() {
  return (
    <div className="bg-[#FFF9F0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-[#8B4513] mb-8">Teaching</h1>
        <p className="text-[#5C5346] mb-12 max-w-3xl">
          Committed to excellence in education through innovative teaching methods and
          mentorship that prepares students for careers in research and industry.
        </p>

        {/* Undergraduate Courses */}
        <section className="mb-20">
          <h2 className="text-[#8B4513] mb-8">Undergraduate (UG) Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile.subjectsTaught.ug.map((course, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8] hover:shadow-xl transition-shadow"
              >
                <BookOpen className="w-10 h-10 text-[#8B4513] mb-4" />
                <h4 className="text-[#2C2416] mb-2">{course}</h4>
                <span className="inline-block px-3 py-1 bg-[#F5EFE6] text-[#8B4513] rounded-full mb-4">
                  Undergraduate
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Postgraduate Courses */}
        <section className="mb-20">
          <h2 className="text-[#8B4513] mb-8">Postgraduate (PG) Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile.subjectsTaught.pg.map((course, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8] hover:shadow-xl transition-shadow"
              >
                <GraduationCap className="w-10 h-10 text-[#8B4513] mb-4" />
                <h4 className="text-[#2C2416] mb-2">{course}</h4>
                <span className="inline-block px-3 py-1 bg-[#F5EFE6] text-[#8B4513] rounded-full mb-4">
                  Postgraduate
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Teaching Philosophy */}
        <section className="mb-20 bg-[#F5EFE6] p-12 rounded-lg">
          <h2 className="text-[#8B4513] mb-8 text-center">Teaching Philosophy</h2>
          <div className="max-w-4xl mx-auto space-y-6 text-[#5C5346]">
            <p>
              My teaching philosophy centers on fostering critical thinking and nurturing curiosity in
              students. I believe that education should go beyond memorizing equations and
              formulas—it should empower students to think deeply about fundamental questions and
              develop problem-solving skills applicable to any field.
            </p>
            <p>
              I emphasize active learning through hands-on problem-solving sessions, collaborative
              projects, and research-oriented coursework. By integrating cutting-edge research topics
              into my courses, I expose students to the frontier of technology and inspire them to
              contribute to advancing human knowledge.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
