import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import profileImage from '../images/profile_photo.png';
import { profile } from '../data/profile';
import { GraduationCap, Briefcase, Award, Users, MapPin, Mail, Phone, BookOpen } from 'lucide-react';

export function About() {
  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden text-slate-800 font-sans">
      {/* Background ambient gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-amber-100/40 via-orange-50/20 to-transparent -z-0"></div>
      <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-bl from-rose-100/40 to-transparent rounded-full blur-[100px] -z-0"></div>
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 text-orange-800 text-sm font-semibold tracking-wide border border-orange-200/60 shadow-sm backdrop-blur-sm transition-transform hover:scale-105 cursor-default">
                <Award className="w-4 h-4" />
                <span>Distinguished Professor</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 pb-2">
                {profile.name}
              </h1>
              <h3 className="text-2xl text-slate-600 font-medium">{profile.title}</h3>
            </div>
            
            <div className="flex flex-col gap-4 text-slate-600">
              <div className="flex items-center gap-3 bg-white/60 p-3 rounded-2xl border border-slate-100 backdrop-blur-md shadow-sm w-max pr-6 hover:bg-white hover:shadow-md transition-all">
                <div className="p-2 rounded-full bg-slate-50 border border-slate-100 text-orange-600"><MapPin className="w-5 h-5" /></div>
                <span className="font-medium">{profile.institution}</span>
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 bg-white/60 p-3 rounded-2xl border border-slate-100 backdrop-blur-md shadow-sm pr-6 hover:bg-white hover:text-orange-600 hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="p-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 group-hover:text-orange-500 group-hover:bg-orange-50 transition-colors"><Mail className="w-5 h-5" /></div>
                  <span className="font-medium">{profile.email}</span>
                </a>
                <a href={`tel:${profile.mobile}`} className="flex items-center gap-3 bg-white/60 p-3 rounded-2xl border border-slate-100 backdrop-blur-md shadow-sm pr-6 hover:bg-white hover:text-orange-600 hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="p-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 group-hover:text-orange-500 group-hover:bg-orange-50 transition-colors"><Phone className="w-5 h-5" /></div>
                  <span className="font-medium">{profile.mobile}</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-6 mt-6 border-t border-slate-200/60">
                {Object.entries(profile.stats).map(([k, v]) => (
                  <div key={k} className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="text-3xl font-extrabold text-slate-800 tracking-tight group-hover:text-orange-600 transition-colors">{v}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{k}</div>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="flex-1 flex justify-center lg:justify-end relative mr-4 lg:mr-8 animate-in fade-in slide-in-from-right-8 duration-1000 delay-150">
             <div className="absolute inset-0 bg-gradient-to-tr from-amber-300 to-rose-300 rounded-full blur-3xl opacity-30 transform scale-[1.3] animate-pulse"></div>
             <div className="relative w-72 h-72 lg:w-[420px] lg:h-[420px] rounded-full p-2 bg-gradient-to-tr from-orange-400 via-rose-300 to-indigo-300 shadow-2xl origin-center hover:scale-[1.02] transition-transform duration-500">
               <div className="w-full h-full rounded-full overflow-hidden border-8 border-white bg-white relative">
                  <ImageWithFallback src={profileImage} alt={profile.name} className="w-full h-full object-cover scale-[1.05]" />
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-24 relative z-10 bg-white/70 border-y border-slate-200/50 backdrop-blur-2xl">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
            <span className="absolute -top-16 -left-8 text-[160px] leading-none text-orange-50 font-serif font-black select-none pointer-events-none z-0">"</span>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold mb-8 text-slate-800 inline-flex items-center gap-3 border-b-2 border-orange-200 pb-2">
                <BookOpen className="w-7 h-7 text-orange-500" />
                Academic Biography
              </h2>
              <p className="text-lg lg:text-2xl text-slate-600 leading-relaxed font-light tracking-wide">
                {profile.bio}
              </p>
            </div>
         </div>
      </section>

      {/* Experience & Education Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
           {/* Experience */}
           <div>
              <div className="flex items-center gap-4 mb-12">
                 <div className="p-4 bg-orange-100 rounded-2xl text-orange-700 shadow-inner">
                   <Briefcase className="w-7 h-7" />
                 </div>
                 <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">Professional Journey</h2>
              </div>
              <div className="space-y-6">
                {profile.experience.map((exp, i) => (
                  <div key={i} className="group relative bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200/60 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-400 to-amber-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                        <div>
                          <h4 className="text-xl font-bold text-slate-800">{exp.position}</h4>
                          <p className="text-slate-500 font-medium mt-1">{exp.institution}</p>
                        </div>
                        <div className="inline-flex items-center justify-center px-4 py-1.5 bg-slate-50/80 text-slate-600 text-sm font-semibold rounded-full border border-slate-200 whitespace-nowrap">
                          {exp.duration}
                        </div>
                      </div>
                      {exp.details && (
                         <div className="pt-4 border-t border-slate-100">
                           <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl">{exp.details}</p>
                         </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Education */}
           <div>
              <div className="flex items-center gap-4 mb-12">
                 <div className="p-4 bg-indigo-100 rounded-2xl text-indigo-700 shadow-inner">
                   <GraduationCap className="w-7 h-7" />
                 </div>
                 <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">Education Timeline</h2>
              </div>
              <div className="relative border-l-2 border-slate-200 ml-6 space-y-10 pb-4">
                {profile.education.map((edu, i) => (
                  <div key={i} className="relative pl-10 group">
                    <div className="absolute -left-[11px] top-4 w-5 h-5 rounded-full bg-white border-4 border-indigo-400 group-hover:border-indigo-600 group-hover:scale-125 transition-all duration-300 shadow-sm"></div>
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                       <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">{edu.year}</span>
                       <h4 className="text-xl font-bold text-slate-800 leading-tight">{edu.degree}</h4>
                       <p className="text-slate-500 font-medium mt-2">{edu.institution}</p>
                       {edu.details && <p className="text-sm text-slate-600 mt-4 pt-4 border-t border-slate-100">{edu.details}</p>}
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* Admin Roles & Memberships */}
      <section className="py-24 bg-slate-900 text-white relative z-10 overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
            {/* Admin Roles */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="p-4 bg-white/10 rounded-2xl text-white backdrop-blur-md shadow-xl border border-white/5">
                   <Users className="w-7 h-7" />
                 </div>
                 <h2 className="text-4xl font-extrabold tracking-tight">Administrative Roles</h2>
              </div>
              <div className="space-y-4">
                {profile.administrativeRoles.map((role, i) => (
                  <div key={i} className="flex gap-4 items-start p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0 shadow-[0_0_12px_rgba(129,140,248,0.6)]"></div>
                    <p className="text-slate-300 leading-relaxed text-base font-light">{role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Memberships */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="p-4 bg-white/10 rounded-2xl text-white backdrop-blur-md shadow-xl border border-white/5">
                   <Award className="w-7 h-7" />
                 </div>
                 <h2 className="text-4xl font-extrabold tracking-tight">Professional Memberships</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {profile.memberships.map((membership, i) => (
                  <div key={i} className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:-translate-y-1 hover:border-white/10 transition-all duration-300 flex flex-col items-center justify-center text-center gap-4">
                    <div className="p-3 bg-white/5 rounded-full text-amber-400">
                      <Award className="w-6 h-6" />
                    </div>
                    <p className="text-slate-200 font-medium">{membership}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
