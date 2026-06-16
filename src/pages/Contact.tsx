import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Mail, MapPin, Phone, ExternalLink, Send } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

export function Contact() {
  const { profile } = useProfile();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { label: 'Google Scholar', href: profile.urls.googleScholar },
    { label: 'ORCID', href: profile.urls.orcid },
    { label: 'Scopus', href: profile.urls.scopus },
    { label: 'ResearchGate', href: profile.urls.researchGate },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">

      {/* Page header */}
      <div className="bg-navy dark:bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Get in Touch</h1>
          <p className="text-blue-200 text-sm max-w-lg">
            Open to research collaborations, academic inquiries, and speaking engagements.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Quick contact cards — mobile first stacked, then row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <a
            href={`mailto:${profile.email}`}
            className="card-base p-4 flex items-center gap-3 hover:shadow-md transition-shadow group touch-target"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-navy group-hover:text-white transition-colors">
              <Mail className="w-5 h-5 text-navy dark:text-blue-400 group-hover:text-white transition-colors" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Email</p>
              <p className="text-xs font-medium text-gray-800 dark:text-white truncate">{profile.email}</p>
            </div>
          </a>

          <a
            href={`tel:${profile.mobile}`}
            className="card-base p-4 flex items-center gap-3 hover:shadow-md transition-shadow group touch-target"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-navy group-hover:text-white transition-colors">
              <Phone className="w-5 h-5 text-navy dark:text-blue-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Phone</p>
              <p className="text-xs font-medium text-gray-800 dark:text-white">{profile.mobile}</p>
            </div>
          </a>

          <div className="card-base p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-navy dark:text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Institution</p>
              <p className="text-xs font-medium text-gray-800 dark:text-white leading-relaxed">{profile.institution}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Contact form */}
          <div className="card-base p-5 sm:p-6">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <Send className="w-4 h-4 text-navy dark:text-blue-400" />
              Send a Message
            </h2>

            {submitted && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm font-medium">
                ✓ Message sent! I'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <Label htmlFor="name" className="text-xs font-semibold text-gray-700 dark:text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="mt-1.5 h-11 text-sm border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-xs font-semibold text-gray-700 dark:text-gray-300">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="mt-1.5 h-11 text-sm border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-xs font-semibold text-gray-700 dark:text-gray-300">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Research collaboration / inquiry"
                  className="mt-1.5 h-11 text-sm border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-xs font-semibold text-gray-700 dark:text-gray-300">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your message…"
                  className="mt-1.5 text-sm border-gray-200 dark:border-gray-700 dark:bg-gray-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-lg bg-navy text-white font-semibold text-sm hover:bg-navy-light transition-colors shadow touch-target"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Professional profiles */}
          <div>
            <div className="card-base p-5 sm:p-6 mb-4">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Academic Profiles</h2>
              <div className="space-y-3">
                {socialLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-navy dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group touch-target"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-navy dark:group-hover:text-blue-400 transition-colors">
                      {label}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-navy dark:group-hover:text-blue-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Prominent email CTA */}
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-navy dark:bg-blue-600 text-white font-semibold text-sm hover:bg-navy-light dark:hover:bg-blue-500 transition-colors shadow touch-target"
            >
              <Mail className="w-5 h-5" />
              Send Direct Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
