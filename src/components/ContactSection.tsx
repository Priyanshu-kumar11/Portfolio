import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, Linkedin, Github, MessageSquare } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Data/Business Analyst Opportunity',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(
      formState.subject
    )}&body=${encodeURIComponent(
      `Hi Priyanshu,\n\nName: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className={`py-16 sm:py-20 border-t transition-colors duration-300 ${
      isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-3 mb-10">
            <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border ${
              isDark ? 'bg-slate-900 border-slate-800 text-sky-400' : 'bg-white border-blue-200 text-blue-800 shadow-sm'
            }`}>
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Let’s Connect &amp; Collaborate</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              Get In Touch With Priyanshu
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Looking for a Data Analyst, Business Analyst, or Power BI specialist? Feel free to reach out directly via email, phone, or LinkedIn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8">
            {/* Contact Direct Cards */}
            <div className="md:col-span-2 space-y-3.5">
              {/* Email Card */}
              <div className={`p-4 sm:p-5 rounded-xl border space-y-2 transition ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                    isDark ? 'bg-blue-950 text-sky-400 border-blue-800' : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <button
                    onClick={() => handleCopy(profileData.email, 'email')}
                    className={`p-1.5 text-xs rounded-lg border transition cursor-pointer ${
                      isDark ? 'bg-slate-800 text-slate-400 hover:text-white border-slate-700' : 'bg-white text-slate-700 hover:text-slate-950 border-slate-300'
                    }`}
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Direct Email</div>
                  <a
                    href={`mailto:${profileData.email}`}
                    className={`text-sm font-bold transition break-all ${
                      isDark ? 'text-white hover:text-sky-400' : 'text-slate-950 hover:text-blue-700'
                    }`}
                  >
                    {profileData.email}
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className={`p-4 sm:p-5 rounded-xl border space-y-2 transition ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                    isDark ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <button
                    onClick={() => handleCopy(profileData.phone, 'phone')}
                    className={`p-1.5 text-xs rounded-lg border transition cursor-pointer ${
                      isDark ? 'bg-slate-800 text-slate-400 hover:text-white border-slate-700' : 'bg-white text-slate-700 hover:text-slate-950 border-slate-300'
                    }`}
                    title="Copy Phone Number"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Mobile / WhatsApp</div>
                  <a
                    href={`tel:${profileData.phone.replace(/[^0-9+]/g, '')}`}
                    className={`text-sm font-bold transition ${
                      isDark ? 'text-white hover:text-emerald-400' : 'text-slate-950 hover:text-emerald-700'
                    }`}
                  >
                    {profileData.phone}
                  </a>
                </div>
              </div>

              {/* Location & Socials */}
              <div className={`p-4 sm:p-5 rounded-xl border space-y-3 transition ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-sm'
              }`}>
                <div className="flex items-start gap-2.5 text-xs">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-950'}`}>Current Location: Udaipur, Rajasthan</div>
                    <div className={`text-[11px] font-medium mt-0.5 flex items-center gap-1 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-700'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Open to Relocate Anywhere in India / Remote
                    </div>
                  </div>
                </div>
                <div className={`pt-2 border-t flex gap-2 ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <a
                    href={profileData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                      isDark 
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
                    }`}
                  >
                    <Linkedin className={`w-3.5 h-3.5 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition border ${
                      isDark 
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
                    }`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Message Form */}
            <div className={`md:col-span-3 rounded-xl p-6 sm:p-7 border shadow-sm transition ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-sm'
            }`}>
              <h3 className={`text-base sm:text-lg font-bold mb-4 flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                <Send className={`w-4 h-4 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} />
                <span>Send a Direct Inquiry</span>
              </h3>

              {submitted ? (
                <div className={`p-5 rounded-lg border text-center space-y-2 ${
                  isDark ? 'bg-emerald-950/30 border-emerald-800' : 'bg-emerald-50 border-emerald-200'
                }`}>
                  <Check className="w-7 h-7 text-emerald-500 mx-auto" />
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>Opening Email Client...</h4>
                  <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    If your email client didn't launch automatically, please email Priyanshu directly at{' '}
                    <strong className={isDark ? 'text-sky-400' : 'text-blue-700'}>{profileData.email}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className={`mt-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition ${
                      isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-white text-slate-800 border-slate-300'
                    }`}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hiring Manager / Recruiter"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border transition focus:outline-none ${
                        isDark 
                          ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' 
                          : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400 focus:border-blue-600 shadow-xs'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border transition focus:outline-none ${
                        isDark 
                          ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' 
                          : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400 focus:border-blue-600 shadow-xs'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Subject / Role Focus</label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border transition focus:outline-none ${
                        isDark 
                          ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' 
                          : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400 focus:border-blue-600 shadow-xs'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Message</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Hi Priyanshu, we would like to discuss an opportunity..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg border transition focus:outline-none resize-none ${
                        isDark 
                          ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' 
                          : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400 focus:border-blue-600 shadow-xs'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition active:scale-95 shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Priyanshu</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
