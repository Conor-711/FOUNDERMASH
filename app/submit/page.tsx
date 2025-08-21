'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    founder: '',
    nickname: '',
    email: '',
    story: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: result.message || 'Story submitted successfully!' });
        setFormData({ founder: '', nickname: '', email: '', story: '' });
        
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[800px] px-4">
      <Link href="/" className="text-[#0b88b6] font-bold">← Back to Choose</Link>
      
      <div className="mt-6">
        <h1 className="text-3xl font-extrabold mb-2">Submit Founder Story</h1>
        <p className="text-gray-600 mb-8">Share a founder story with the community.</p>
        
        {message && (
          <div className={`mb-6 p-4 rounded border ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {message.text}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="founder" className="block text-sm font-bold mb-2">
              FOUNDER *
            </label>
            <input
              type="text"
              id="founder"
              name="founder"
              value={formData.founder}
              onChange={handleChange}
              required
              maxLength={100}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0b88b6] focus:border-transparent"
              placeholder="who's story would u like to share"
            />
          </div>

          <div>
            <label htmlFor="nickname" className="block text-sm font-bold mb-2">
              NICKNAME *
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
              maxLength={50}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0b88b6] focus:border-transparent"
              placeholder="what should we call u"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              EMAIL (OPTIONAL)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={100}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0b88b6] focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="story" className="block text-sm font-bold mb-2">
              STORY *
            </label>
            <textarea
              id="story"
              name="story"
              value={formData.story}
              onChange={handleChange}
              required
              maxLength={5000}
              rows={8}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0b88b6] focus:border-transparent"
              placeholder="story goes here"
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded font-bold transition-colors flex-1 ${
                isSubmitting 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-[#0b88b6] text-white hover:bg-[#096d8a]'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Story'}
            </button>
            <Link
              href="/"
              className="bg-gray-500 text-white px-8 py-3 rounded font-bold hover:bg-gray-600 transition-colors text-center flex items-center justify-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}