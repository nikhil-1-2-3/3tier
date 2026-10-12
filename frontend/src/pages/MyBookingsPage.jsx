import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import Alert from '../components/common/Alert';
import { Calendar, Clock, Plus, Ban, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Cancellation Modal state
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await api.bookings.getMyBookings();
      if (res.success && res.data) {
        setBookings(res.data);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to retrieve your booking history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelConfirm = async () => {
    if (!cancellingBooking) return;
    try {
      setCancelLoading(true);
      const res = await api.bookings.cancel(cancellingBooking.id);
      if (res.success) {
        setSuccessMsg(`Booking ${cancellingBooking.bookingReference} has been cancelled.`);
        setCancellingBooking(null);
        await fetchBookings();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to cancel the booking.');
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Client Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            My Consultation Bookings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and manage your scheduled technology discovery sessions and project reviews.
          </p>
        </div>

        <Link to="/book">
          <Button variant="primary" size="md" icon={Plus}>
            New Booking Request
          </Button>
        </Link>
      </div>

      {successMsg && (
        <Alert
          type="success"
          message={successMsg}
          onClose={() => setSuccessMsg(null)}
        />
      )}

      {errorMsg && (
        <Alert
          type="error"
          message={errorMsg}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {/* Bookings List */}
      {loading ? (
        <div className="py-24 text-center">
          <Spinner size="lg" />
          <p className="text-xs text-slate-500 mt-3 font-medium">Fetching your bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <Card className="text-center py-16 px-6 space-y-4">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No Bookings Found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You don't have any consultation requests on file yet. Book your first session with our engineering leads today.
          </p>
          <div className="pt-2">
            <Link to="/book">
              <Button variant="primary" size="md">
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <Card key={b.id} className="p-6 transition-all hover:border-slate-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-extrabold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
                      {b.bookingReference}
                    </span>
                    <StatusBadge status={b.status} />
                    <span className="text-xs text-slate-400">
                      Submitted on {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {b.service ? b.service.name : 'Technical Consultation'}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-2">
                    {b.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-brand-500" />
                      <span>{b.requestedDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-brand-500" />
                      <span>{b.timeSlot}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-row lg:flex-col items-center gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {b.status !== 'CANCELLED' && b.status !== 'COMPLETED' && (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Ban}
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                      onClick={() => setCancellingBooking(b)}
                    >
                      Cancel Request
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={!!cancellingBooking}
        onClose={() => setCancellingBooking(null)}
        title="Confirm Cancellation"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to cancel booking reference{' '}
            <span className="font-mono font-bold text-slate-900">
              {cancellingBooking?.bookingReference}
            </span>
            ? This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCancellingBooking(null)}
              disabled={cancelLoading}
            >
              Keep Booking
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleCancelConfirm}
              loading={cancelLoading}
            >
              Confirm Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
