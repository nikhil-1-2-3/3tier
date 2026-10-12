import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import Input from '../common/Input';

export default function FaqAccordion({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(faqs.map((f) => f.category || 'General'))];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Input
            type="text"
            placeholder="Search FAQs (e.g. booking, pricing)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      {filteredFaqs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 p-6">
          <p className="text-slate-500 text-sm">
            No matching questions found for "{searchTerm}".
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('All');
            }}
            className="mt-3 text-xs text-brand-600 font-semibold hover:underline"
          >
            Clear search filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id || idx}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors focus:outline-none focus:bg-slate-50"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    {faq.category && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wide">
                        {faq.category}
                      </span>
                    )}
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    <p>{faq.answer}</p>
                    <div className="mt-3 text-[11px] text-slate-400 italic">
                      [Sample FAQ reference - editable placeholder]
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
