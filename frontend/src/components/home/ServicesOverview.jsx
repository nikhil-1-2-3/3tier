import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import ServiceCard from '../services/ServiceCard';
import Spinner from '../common/Spinner';
import Button from '../common/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ServicesOverview() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await api.services.getAll();
        if (res.success && res.data) {
          setServices(res.data.slice(0, 3)); // top 3 on landing page
        }
      } catch (err) {
        console.error('Failed to load services on landing page:', err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <section className="py-24 bg-[#080E1E] text-white border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
              Specialized Competencies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              High-Impact Capabilities for Scalable Platforms
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Decoupled systems, secure authentication pipelines, and responsive presentation layers architected for longevity.
            </p>
          </div>

          <Link to="/services">
            <Button
              variant="secondary"
              size="md"
              icon={ArrowRight}
              className="bg-white/[0.05] hover:bg-white/[0.1] text-white border-white/10"
            >
              All 6 Services
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <Spinner size="lg" className="text-sky-400" />
            <p className="text-xs text-slate-400 mt-3 font-mono">Fetching active capabilities...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
