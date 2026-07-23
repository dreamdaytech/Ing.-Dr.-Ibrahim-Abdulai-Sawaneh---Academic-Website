import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Award, Briefcase, GraduationCap, Compass, ExternalLink, Loader2 } from 'lucide-react';
import { saveDocument } from '../lib/firebase';
import { HERO_INFO } from '../data/academicData';

interface ContactSectionProps {
  heroInfo?: typeof HERO_INFO;
}

export default function ContactSection({ heroInfo = HERO_INFO }: ContactSectionProps) {
  const [activeForm, setActiveForm] = useState<'message' | 'inquiry'>('message');
  
  // General message form state
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgSubject, setMsgSubject] = useState('');
  const [msgText, setMsgText] = useState('');
  const [msgSuccess, setMsgSuccess] = useState(false);
  const [isSubmittingMsg, setIsSubmittingMsg] = useState(false);

  // Collaboration form state
  const [collabOrg, setCollabOrg] = useState('');
  const [collabType, setCollabType] = useState('Supervision');
  const [collabEmail, setCollabEmail] = useState('');
  const [collabProposal, setCollabProposal] = useState('');
  const [collabSuccess, setCollabSuccess] = useState(false);
  const [isSubmittingCollab, setIsSubmittingCollab] = useState(false);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgName || !msgEmail || !msgText) return;
    setIsSubmittingMsg(true);
    try {
      const newMsg = {
        id: `msg-dynamic-${Date.now()}`,
        type: 'General Inquiry',
        name: msgName,
        email: msgEmail,
        subject: msgSubject,
        text: msgText,
        date: new Date().toISOString(),
        status: 'Pending'
      };
      await saveDocument('messages', newMsg.id, newMsg);
      setMsgSuccess(true);
      setTimeout(() => {
        setMsgSuccess(false);
        setMsgName('');
        setMsgEmail('');
        setMsgSubject('');
        setMsgText('');
      }, 3500);
    } catch (e) {
      console.error(e);
      alert("Error sending message.");
    } finally {
      setIsSubmittingMsg(false);
    }
  };

  const handleCollabSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collabEmail || !collabProposal) return;
    setIsSubmittingCollab(true);
    try {
      const newCollab = {
        id: `collab-dynamic-${Date.now()}`,
        type: 'Partnership Request',
        org: collabOrg,
        collabType: collabType,
        email: collabEmail,
        proposal: collabProposal,
        date: new Date().toISOString(),
        status: 'Pending'
      };
      await saveDocument('messages', newCollab.id, newCollab);
      
      // Send email notification
      try {
        await fetch('/api/notify-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: newCollab.type,
            email: newCollab.email,
            org: newCollab.org,
            proposal: newCollab.proposal
          }),
        });
      } catch (err) {
        console.error('Failed to send notification email', err);
      }

      setCollabSuccess(true);
      setTimeout(() => {
        setCollabSuccess(false);
        setCollabOrg('');
        setCollabEmail('');
        setCollabProposal('');
      }, 3500);
    } catch (e) {
      console.error(e);
      alert("Error sending proposal.");
    } finally {
      setIsSubmittingCollab(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="mb-12 border-b border-editorial-border pb-6 text-center lg:text-left">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-editorial-gold">Secure Dispatch Gateway</span>
        <h2 className="font-serif text-3xl font-extrabold tracking-tight text-editorial-navy sm:text-4xl mt-1">
          Academic Collaboration Gateway
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-mono">
          Initiate partnerships, submit thesis research supervision files, or book advisory panels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Coordinates & Social Portals */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-editorial-border bg-white p-6 shadow-xs rounded-none">
            <h3 className="font-serif text-base font-bold text-editorial-navy mb-5 flex items-center gap-2 border-b border-editorial-border-light pb-2">
              <Compass className="h-5 w-5 text-editorial-gold" />
              Institutional Coordinates
            </h3>

            <div className="space-y-4 text-xs text-slate-600 font-sans">
              {/* Department Address */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F1F4F8] text-editorial-navy shrink-0 mt-0.5 rounded-none">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest">Office Location</span>
                  <span className="block font-bold text-slate-800 leading-normal mt-0.5">{heroInfo.address}</span>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F1F4F8] text-editorial-navy shrink-0 mt-0.5 rounded-none">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest">Scholarly Email</span>
                  <span className="block font-bold text-slate-800 leading-normal mt-0.5 select-all">{heroInfo.email}</span>
                </div>
              </div>

              {/* Mobile Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F1F4F8] text-editorial-navy shrink-0 mt-0.5 rounded-none">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest">Mobile Telephony</span>
                  <span className="block font-bold text-slate-800 leading-normal mt-0.5 select-all">{heroInfo.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines block */}
          <div className="border border-editorial-border bg-[#FBFBF9] p-6 shadow-xs rounded-none">
            <h4 className="font-serif text-xs font-bold text-editorial-navy uppercase tracking-wider mb-2.5">Collaboration Rubrics</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed list-disc list-inside font-sans">
              <li><strong>Academic Supervision:</strong> Specify your MSc/PhD dissertation topic and draft hypothesis.</li>
              <li><strong>Speaking Engagements:</strong> Provide the exact summit dates, theme color, and draft program panels.</li>
              <li><strong>Advisory Panels:</strong> Outline cybersecurity audits, network deployments, or risk assessment scopes.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Interaction Form Engine */}
        <div className="lg:col-span-7">
          <div className="border border-editorial-border bg-white p-6 shadow-xs rounded-none">
            {/* Form category tab switches */}
            <div className="flex border-b border-editorial-border-light pb-3 mb-6 gap-4 font-serif">
              <button
                onClick={() => { setActiveForm('message'); }}
                className={`pb-1.5 px-1.5 text-xs font-bold uppercase tracking-widest transition-all border-b-2 cursor-pointer ${
                  activeForm === 'message'
                    ? 'border-editorial-navy text-editorial-navy'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                General Inquiry
              </button>
              <button
                onClick={() => { setActiveForm('inquiry'); }}
                className={`pb-1.5 px-1.5 text-xs font-bold uppercase tracking-widest transition-all border-b-2 cursor-pointer ${
                  activeForm === 'inquiry'
                    ? 'border-editorial-navy text-editorial-navy'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Partnership Request
              </button>
            </div>

            {/* FORM A: GENERAL MESSAGE */}
            {activeForm === 'message' && (
              <div>
                {msgSuccess ? (
                  <div className="text-center py-10 font-sans">
                    <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3.5">
                      <CheckCircle2 className="h-6 w-6 animate-bounce" />
                    </div>
                    <h4 className="font-serif text-base font-bold text-slate-900">Inquiry Received</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Thank you for contacting Dr. Sawaneh. Your technical query has been logged and queued for evaluation.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleMessageSubmit} className="space-y-4 text-xs font-sans">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Alusine Sesay"
                          value={msgName}
                          onChange={(e) => setMsgName(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Email Coordinates *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. researcher@freetown.edu"
                          value={msgEmail}
                          onChange={(e) => setMsgEmail(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Subject Topic</label>
                      <input
                        type="text"
                        placeholder="e.g. Cybersecurity Policy Inquiry"
                        value={msgSubject}
                        onChange={(e) => setMsgSubject(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Inquiry Description *</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Please draft your technical questions or suggestions in detail..."
                        value={msgText}
                        onChange={(e) => setMsgText(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9] resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingMsg}
                      className={`w-full py-2.5 bg-editorial-navy hover:bg-editorial-navy/95 text-white font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-none ${isSubmittingMsg ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmittingMsg ? <Loader2 className="h-4 w-4 text-editorial-gold animate-spin" /> : <Send className="h-4 w-4 text-editorial-gold" />}
                      {isSubmittingMsg ? "Dispatching..." : "Dispatch Message"}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* FORM B: COLLABORATION PROPOSAL */}
            {activeForm === 'inquiry' && (
              <div>
                {collabSuccess ? (
                  <div className="text-center py-10 font-sans">
                    <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3.5">
                      <CheckCircle2 className="h-6 w-6 animate-bounce" />
                    </div>
                    <h4 className="font-serif text-base font-bold text-slate-900">Proposal Dispatched</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Your institutional partnership docket has been received. Our office will reach out shortly for coordinating steps.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCollabSubmit} className="space-y-4 text-xs font-sans">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Institution / Organ *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ministry of ICT SL"
                          value={collabOrg}
                          onChange={(e) => setCollabOrg(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Primary Email Coordinates *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. director@ministry.gov.sl"
                          value={collabEmail}
                          onChange={(e) => setCollabEmail(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Collaboration Segment *</label>
                      <select
                        value={collabType}
                        onChange={(e) => setCollabType(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9] font-semibold"
                      >
                        <option value="Supervision">Thesis Supervision / Academic Panel</option>
                        <option value="Speaking">Conference Keynote / Panel Invitation</option>
                        <option value="Advisory">Government Policy Advisory / Expert Witness</option>
                        <option value="Research">Joint Research Grant / Technical Pre-print</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Proposal Overview / Deliverables *</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Draft your executive deliverables, dates, or database integration scopes..."
                        value={collabProposal}
                        onChange={(e) => setCollabProposal(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9] resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingCollab}
                      className={`w-full py-2.5 bg-editorial-navy hover:bg-editorial-navy/95 text-white font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-none ${isSubmittingCollab ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmittingCollab ? <Loader2 className="h-4 w-4 text-editorial-gold animate-spin" /> : <Send className="h-4 w-4 text-editorial-gold" />}
                      {isSubmittingCollab ? "Submitting..." : "Submit Partnership Proposal"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
