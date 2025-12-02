import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { profile } from '../data/profile';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-[#FFF9F0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-[#8B4513] mb-8">Get in Touch</h1>
        <p className="text-[#5C5346] mb-12 max-w-3xl">
          Feel free to reach out for research collaborations, academic inquiries, or speaking
          engagements. I look forward to hearing from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8]">
            <h2 className="text-[#8B4513] mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-[#2C2416]">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-[#E8DCC8] mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-[#2C2416]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-[#E8DCC8] mt-2"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-[#2C2416]">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border-[#E8DCC8] mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-[#2C2416]">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="border-[#E8DCC8] mt-2"
                />
              </div>

              <Button type="submit" className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Office Address */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8]">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#8B4513] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-[#2C2416] mb-3">Institution</h3>
                  <p className="text-[#5C5346]">
                    {profile.institution}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8]">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#8B4513] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-[#2C2416] mb-3">Email</h3>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-[#8B4513] hover:text-[#6B3410]"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8]">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#8B4513] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-[#2C2416] mb-3">Phone</h3>
                  <p className="text-[#5C5346]">{profile.mobile}</p>
                </div>
              </div>
            </div>

            {/* Professional Profiles */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-[#E8DCC8]">
              <h3 className="text-[#2C2416] mb-6">Professional Profiles</h3>
              <div className="space-y-4">
                {profile.urls.googleScholar && (
                  <a
                    href={profile.urls.googleScholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#8B4513] hover:text-[#6B3410]"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Google Scholar
                  </a>
                )}
                {profile.urls.orcid && (
                  <a
                    href={profile.urls.orcid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#8B4513] hover:text-[#6B3410]"
                  >
                    <ExternalLink className="w-5 h-5" />
                    ORCID
                  </a>
                )}
                {profile.urls.scopus && (
                  <a
                    href={profile.urls.scopus}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#8B4513] hover:text-[#6B3410]"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Scopus
                  </a>
                )}
                {profile.urls.researchGate && (
                  <a
                    href={profile.urls.researchGate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#8B4513] hover:text-[#6B3410]"
                  >
                    <ExternalLink className="w-5 h-5" />
                    ResearchGate
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
