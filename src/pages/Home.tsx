import { Link } from 'react-router';
import { BookOpen, Award, GraduationCap, TrendingUp, Trophy, Cpu, Shield, Network, Zap } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import profileImage from '../images/profile_photo.png';
import { profile } from '../data/profile';
import TextType from '../components/ui/TextType';

import SpotlightCard from '../components/ui/SpotlightCard';

export function Home() {
  const stats = [
    { icon: BookOpen, label: 'Publications', value: profile.stats.publications },
    { icon: Award, label: 'Patents', value: profile.stats.patents },
    { icon: GraduationCap, label: 'Experience', value: profile.stats.experience },
    { icon: TrendingUp, label: 'Citations', value: profile.stats.citations },
    { icon: Trophy, label: 'Awards', value: profile.stats.awards },
  ];

  const researchAreas = profile.researchInterests.map(area => ({
    icon: area.title.includes('Machine Learning') ? Cpu :
      area.title.includes('Security') ? Shield :
        area.title.includes('Internet of Things') ? Network : Zap,
    title: area.title,
    description: area.description
  }));

  const featuredPublications = profile.publications.journals.slice(0, 3);

  return (
    <div className="bg-[#FFF9F0]">
      {/* Hero Section */}
      <section className="py-20 bg-[#F5EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-[#8B4513] shadow-xl">
                  <ImageWithFallback
                    src={profileImage}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right - Info */}
            <div>
              <TextType
                text={profile.name}
                as="h1"
                className="text-[#8B4513] mb-2"
                typingSpeed={100}
                showCursor={true}
                loop={false}
              />
              <TextType
                text={profile.title}
                as="h3"
                className="text-[#5C5346] mb-2"
                typingSpeed={50}
                initialDelay={2500}
                showCursor={true}
                loop={false}
              />
              <p className="text-[#5C5346] mb-6">{profile.institution}</p>

              <p className="text-[#5C5346] mb-8">{profile.summary}</p>

              <div className="flex flex-wrap gap-4">
                <Link to="/publications">
                  <Button className="bg-[#8B4513] hover:bg-[#6B3410] text-white">
                    View Publications
                  </Button>
                </Link>
                <a href={profile.urls.googleScholar} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#F5EFE6]">
                    Google Scholar
                  </Button>
                </a>
                <a href={profile.urls.scopus} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#F5EFE6]">
                    Scopus
                  </Button>
                </a>
                <a href={profile.urls.orcid} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#F5EFE6]">
                    ORCID
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Highlights Strip */}
      <section className="py-12 bg-[#8B4513]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-[#FFF9F0]" />
                <div className="text-[#FFF9F0] mb-1">{stat.value}</div>
                <div className="text-[#F5EFE6]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Areas of Work */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[#8B4513] mb-12">Core Research Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchAreas.map((area) => (
              <SpotlightCard
                key={area.title}
                className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8] transition-shadow"
                spotlightColor="rgba(139, 69, 19, 0.1)"
              >
                <area.icon className="w-12 h-12 text-[#8B4513] mb-4" />
                <h4 className="text-[#2C2416] mb-3">{area.title}</h4>
                <p className="text-[#5C5346]">{area.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-20 bg-[#F5EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-[#8B4513] mb-12">Selected Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPublications.map((pub, index) => (
              <SpotlightCard
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8]"
                spotlightColor="rgba(139, 69, 19, 0.1)"
              >
                <h4 className="text-[#2C2416] mb-3 line-clamp-2" title={pub.title}>{pub.title}</h4>
                <p className="text-[#5C5346] mb-2">{pub.journal}</p>
                <p className="text-[#8B4513] mb-4">{pub.year}</p>
                {pub.link && (
                  <a href={pub.link} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="border-[#8B4513] text-[#8B4513] hover:bg-[#F5EFE6]"
                    >
                      Read More
                    </Button>
                  </a>
                )}
              </SpotlightCard>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/publications">
              <Button className="bg-[#8B4513] hover:bg-[#6B3410] text-white">
                View All Publications
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
