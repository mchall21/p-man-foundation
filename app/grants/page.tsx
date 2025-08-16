'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { EXTERNAL_LINKS } from '@/lib/constants';

const faqs = [
  {
    question: "Who's eligible?",
    answer: "Community organizations, recovery centers, sober living homes, and initiatives that create safe, sober social spaces."
  },
  {
    question: "What's the typical grant size?",
    answer: "Grants typically range from $500 to $10,000, with most awards between $3,000 and $5,000."
  },
  {
    question: "What won't you fund?",
    answer: "We don't fund medical treatment, individual rent/bills, or general operating expenses. Grants must directly create sober social activities."
  },
  {
    question: "Can individuals apply?",
    answer: "We primarily fund organizations, but individuals with community-focused initiatives may apply with proper fiscal sponsorship."
  },
  {
    question: "Can we re-apply if not selected?",
    answer: "Yes! We encourage organizations to refine their proposals and reapply in future cycles."
  },
  {
    question: 'How do you define "one more good day"?',
    answer: "It's any sober social activity that helps someone in recovery build connections, find joy, and strengthen their sobriety."
  },
  {
    question: "When are funds disbursed?",
    answer: "Grants are reviewed throughout the year and disbursed primarily in Spring."
  },
  {
    question: "What are the reporting requirements?",
    answer: "We ask for a brief impact report showing how funds were used and estimated participant numbers."
  },
  {
    question: "Do you partially fund large initiatives?",
    answer: "Yes! If you need $50,000 total, show us exactly how our $5,000 portion would be used if the rest doesn't materialize."
  }
];

export default function GrantsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Grants</h1>
      
      {/* Overview Section */}
      <div className="prose prose-lg max-w-none mb-12">
        <div className="bg-blue-50 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">What We Fund</h2>
          <p className="text-lg mb-4">
            Microgrants ($500–$10,000) that increase the availability and frequency of 
            sober social activities. Priority: <strong>post-treatment reintegration</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-3">Who Can Apply</h3>
            <ul className="space-y-2">
              <li>• Community organizations</li>
              <li>• Recovery centers</li>
              <li>• Sober living homes</li>
              <li>• New initiatives creating safe spaces</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Examples We Fund</h3>
            <ul className="space-y-2">
              <li>• Sober sports leagues</li>
              <li>• Recovery art programs</li>
              <li>• Outdoor adventure groups</li>
              <li>• Community dinners & events</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 p-8 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-3">Strong Applications Show:</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Clear <strong>budget</strong> with line-item breakdown</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Who benefits</strong> tied directly to creating "one more good day"</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Realistic plan if we fund <strong>$3–5k</strong> as part of a larger goal</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>How you'll measure and report impact</span>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-bold mb-2">Timing</h3>
          <p>
            Rolling submissions accepted year-round. Grants are <strong>reviewed and paid in Spring</strong>.
          </p>
        </div>
      </div>

      {/* Application Button */}
      <div className="text-center mb-12">
        <a
          href={EXTERNAL_LINKS.grantApplication}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Apply Now
        </a>
        <p className="text-sm text-gray-600 mt-2">Applications reviewed on a rolling basis</p>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <span className="text-gray-400">
                  {openFaq === index ? '−' : '+'}
                </span>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Partial Funding Note */}
      <div className="bg-gray-50 p-8 rounded-lg mb-8">
        <h3 className="text-xl font-bold mb-3">Note on Partial Funding</h3>
        <p className="text-gray-700">
          If you need $50,000 for a comprehensive program, show us exactly how our 
          $3,000–$5,000 portion would still create value if the rest doesn't come through. 
          We love being part of bigger initiatives when our contribution has clear, 
          standalone impact.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
        <p className="mb-6">
          Join the growing community of organizations creating more good days.
        </p>
        <a
          href={EXTERNAL_LINKS.grantApplication}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
        >
          Start Your Application
        </a>
      </div>
    </div>
  );
}