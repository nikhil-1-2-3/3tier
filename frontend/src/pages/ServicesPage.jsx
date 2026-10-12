import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import ServiceCard from '../components/services/ServiceCard';
import Spinner from '../components/common/Spinner';
import Input from '../components/common/Input';
import { Search, Sparkles } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const res = await api.services.getAll();
        if (res.success && res.data) {
          setServices(res.data);
        }
      } catch (err) {
        setError('Unable to load service listings. Please check server connection.');
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const categories = ['All', ...new Set(services.map((s) => s.category).filter(Boolean))];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
          Technology Offerings
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Our Professional Services
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Tailored engineering, design, and cloud consulting capabilities built to help modern enterprises succeed.
        </p>
      </div>

      {/* Controls: Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Input
            type="text"
            placeholder="Search services (e.g. cloud, web, ai)..."
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
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="py-24 text-center">
          <Spinner size="lg" />
          <p className="text-xs text-slate-500 mt-3 font-medium">Loading service catalog...</p>
        </div>
      ) : error ? (
        <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center text-rose-800 text-sm">
          {error}
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <Sparkles className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No services match your criteria</h3>
          <p className="text-sm text-slate-500 mt-1">Try clearing your search terms or selecting another category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
