'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

const helpOptions = [
  'Day-of event volunteers',
  'Fundraising captains',
  'Grantee outreach specialists',
  'Board members',
  'Other'
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    helpType: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Contact</h1>
      
      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-xl text-gray-700">
          Say hello — or help out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="helpType" className="block text-sm font-medium text-gray-700 mb-2">
                  How I'd like to help
                </label>
                <select
                  id="helpType"
                  name="helpType"
                  value={formData.helpType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select an option</option>
                  {helpOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="bg-green-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-700">
                Your message has been received. We'll be in touch soon.
              </p>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          {/* Current Needs */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Current Volunteer Needs</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Day-of event volunteers for Pedal for P-Man</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Fundraising captains to expand our reach</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Grantee outreach specialists</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Board members with nonprofit experience</span>
              </li>
            </ul>
          </div>

          {/* Mailing Address */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Mailing Address</h3>
            <address className="not-italic text-gray-700">
              <strong>{SITE_CONFIG.mailingAddress.line1}</strong><br />
              {SITE_CONFIG.mailingAddress.line2 && (
                <>{SITE_CONFIG.mailingAddress.line2}<br /></>
              )}
              {SITE_CONFIG.mailingAddress.city}, {SITE_CONFIG.mailingAddress.state} {SITE_CONFIG.mailingAddress.zip}
            </address>
            <p className="text-sm text-gray-600 mt-4">
              EIN: {SITE_CONFIG.ein}<br />
              501(c)(3) Tax-Exempt Organization
            </p>
          </div>

          {/* Other Ways to Connect */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
            <p className="text-gray-700 mb-4">
              Follow our journey and join the community creating more good days.
            </p>
            <div className="flex space-x-4">
              {/* Social media links placeholder */}
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Facebook
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Instagram
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}