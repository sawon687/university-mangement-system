"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function page() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Add API submission logic here
  };

  return (
    <div className="min-h-screen bg-slate-50/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
            Contact Us
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            We'd love to hear from you
          </h1>
          <p className="text-base text-slate-500">
            Have questions about UniSphere or need a custom institutional demo? Reach out to our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Contact Information Sidebar */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm space-y-8 lg:col-span-1">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Get in Touch</h2>
              <p className="text-sm text-slate-500 mt-1">
                Fill out the form or contact us directly through the channels below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Email us</p>
                  <p className="text-sm text-slate-500 mt-0.5">support@unisphere.edu</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Call us</p>
                  <p className="text-sm text-slate-500 mt-0.5">+880 1234 567890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Office Location</p>
                  <p className="text-sm text-slate-500 mt-0.5">Gulshan Avenue, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
              <p className="text-xs font-medium text-slate-600">Support Hours:</p>
              <p className="text-xs text-slate-400 mt-1">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Sent Successfully!</h3>
                <p className="text-sm text-slate-500 max-w-md">
                  Thank you for reaching out. Our support team will get back to you via email within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Send us a Message</h2>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@university.edu"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="How can we help you?"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 sm:w-auto"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}