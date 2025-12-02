import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import profileImage from '../images/profile_photo.png';
import { profile } from '../data/profile';

export function About() {
  return (
    <div className="bg-[#FFF9F0]">
      {/* Header Section */}
      <section className="py-20 bg-[#F5EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <h1 className="text-[#8B4513] mb-4">{profile.name}</h1>
              <h3 className="text-[#5C5346] mb-2">{profile.title}</h3>
              <p className="text-[#5C5346]">{profile.institution}</p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-[#8B4513] shadow-xl">
                <ImageWithFallback
                  src={profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Biography */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#8B4513] mb-8">Academic Biography</h2>
          <div className="space-y-6 text-[#5C5346] whitespace-pre-line">
            <p>{profile.bio}</p>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="py-20 bg-[#F5EFE6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#8B4513] mb-12 text-center">Education</h2>
          <div className="space-y-8">
            {profile.education.map((edu, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-32 text-[#8B4513] font-bold">{edu.year}</div>
                <div className="flex-grow border-l-4 border-[#8B4513] pl-8 pb-8">
                  <h4 className="text-[#2C2416] mb-1">{edu.degree}</h4>
                  <p className="text-[#5C5346] font-medium">{edu.institution}</p>
                  {edu.details && <p className="text-[#5C5346] text-sm mt-1">{edu.details}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Appointments */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#8B4513] mb-12 text-center">Professional Appointments</h2>
          <div className="space-y-6">
            {profile.experience.map((appt, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8] flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h4 className="text-[#2C2416] font-semibold">{appt.position}</h4>
                  <p className="text-[#5C5346]">{appt.institution}</p>
                  {appt.details && <p className="text-sm text-gray-500 mt-1">{appt.details}</p>}
                </div>
                <span className="text-[#8B4513] whitespace-nowrap font-medium">{appt.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Administrative Roles */}
      <section className="py-20 bg-[#F5EFE6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#8B4513] mb-12 text-center">Administrative Roles</h2>
          <div className="grid grid-cols-1 gap-4">
            {profile.administrativeRoles.map((role, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-[#E8DCC8]">
                <p className="text-[#5C5346]">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#8B4513] mb-12 text-center">Professional Memberships</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.memberships.map((membership, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-[#E8DCC8]"
              >
                <p className="text-[#2C2416]">{membership}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
