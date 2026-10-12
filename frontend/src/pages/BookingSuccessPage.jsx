import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import StatusBadge from '../components/common/StatusBadge';
import { CheckCircle, Calendar, Clock, User, Mail, ArrowRight, Bookmark } from 'lucide-react';

export default function BookingSuccessPage() {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref');

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooking() {
      if (!refCode) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.bookings.getById(refCode);
        if (res.success && res.data) {
          setBooking(res.data);
        }
      } catch (err) {
        console.warn('Could not fetch booking record details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBooking();
  }, [refCode]);

  return (
    <div className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="text-center p-8 sm:p-12 space-y-8 shadow-xl">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Submission Received
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Consultation Request Submitted!
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Your booking request has been securely recorded in our system. An engineer will review your requirements and reach out with confirmation details.
          </p>
        </div>

        {/* Reference Highlight */}
        {refCode && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-md mx-auto space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Unique Booking Reference
            </span>
            <div className="text-2xl font-mono font-extrabold text-brand-600 tracking-wider">
              {refCode}
            </div>
            <p className="text-[11px] text-slate-400">
              Please save this reference code for future tracking and correspondence.
            </p>
          </div>
        )}

        {/* Booking Snapshot if loaded */}
        {loading ? (
          <div className="py-4">
            <Spinner size="md" />
          </div>
        ) : booking ? (
          <div className="text-left bg-white border border-slate-200/80 rounded-xl p-6 space-y-4 max-w-lg mx-auto text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500 font-medium">Status</span>
              <StatusBadge status={booking.status} />
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500 font-medium">Service</span>
              <span className="font-semibold text-slate-800">
                {booking.service ? booking.service.name : 'Consultation'}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-slate-500 font-medium">Date & Time</span>
              <span className="font-semibold text-slate-800">
                {booking.requestedDate} • {booking.timeSlot}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Contact</span>
              <span className="font-semibold text-slate-800">
                {booking.customerName} ({booking.customerEmail})
              </span>
            </div>
          </div>
        ) : null}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/my-bookings">
            <Button variant="primary" size="md" icon={Bookmark}>
              View My Bookings
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" size="md">
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
