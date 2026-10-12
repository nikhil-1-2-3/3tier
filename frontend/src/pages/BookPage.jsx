import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import FormField from '../components/common/FormField';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { Calendar, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
];

export default function BookPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get('serviceId') || '';

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    phone: '',
    serviceId: preselectedServiceId,
    requestedDate: '',
    timeSlot: '',
    description: '',
    notes: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});

  // Auto-populate user info if authenticated
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        customerName: prev.customerName || user.fullName || '',
        customerEmail: prev.customerEmail || user.email || '',
      }));
    }
  }, [user]);

  // Load services list
  useEffect(() => {
    async function loadServices() {
      try {
        const res = await api.services.getAll();
        if (res.success && res.data) {
          setServices(res.data);
          // If preselectedServiceId exists in list, set it
          if (preselectedServiceId && res.data.some((s) => s.id === preselectedServiceId)) {
            setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
          }
        }
      } catch (err) {
        setErrorMsg('Failed to load available services list. Please reload the page.');
      } finally {
        setLoadingServices(false);
      }
    }
    loadServices();
  }, [preselectedServiceId]);

  // Minimum allowed date is tomorrow or today
  const todayString = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.customerName.trim()) {
      errors.customerName = 'Full name is required.';
    }
    if (!formData.customerEmail.trim()) {
      errors.customerEmail = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail.trim())) {
      errors.customerEmail = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    }
    if (!formData.serviceId) {
      errors.serviceId = 'Please select a service.';
    }
    if (!formData.requestedDate) {
      errors.requestedDate = 'Please select a booking date.';
    } else if (formData.requestedDate < todayString) {
      errors.requestedDate = 'Date cannot be in the past.';
    }
    if (!formData.timeSlot) {
      errors.timeSlot = 'Please choose an available time slot.';
    }
    if (!formData.description.trim()) {
      errors.description = 'Please describe your project or consultation needs.';
    } else if (formData.description.trim().length < 10) {
      errors.description = 'Description should be at least 10 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.bookings.create(formData);
      if (res.success && res.data) {
        // Navigate to confirmation page
        navigate(`/booking/success?ref=${res.data.bookingReference}`);
      } else {
        setErrorMsg(res.message || 'Failed to submit booking request.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Server error occurred while creating booking.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
          Consultation Scheduling
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Book a Technology Consultation
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Reserve an introductory discovery session with our engineering leads to discuss your requirements, architecture, and timeline.
        </p>
      </div>

      {errorMsg && (
        <Alert
          type="error"
          title="Submission Notice"
          message={errorMsg}
          onClose={() => setErrorMsg(null)}
        />
      )}

      {/* Booking Notice */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-xs text-sky-800 flex items-start gap-2.5">
        <Clock className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-semibold">Notice:</span> Submissions are initially registered as{' '}
          <span className="font-bold underline">Booking Requests</span>. Our team will verify technical scope and send formal confirmation and calendar invites within 24 hours.
        </div>
      </div>

      <Card className="p-6 sm:p-10 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label="Full Name"
              htmlFor="customerName"
              required
              error={fieldErrors.customerName}
            >
              <Input
                id="customerName"
                name="customerName"
                placeholder="e.g. Alex Morgan"
                value={formData.customerName}
                onChange={handleChange}
                error={!!fieldErrors.customerName}
              />
            </FormField>

            <FormField
              label="Work Email"
              htmlFor="customerEmail"
              required
              error={fieldErrors.customerEmail}
            >
              <Input
                id="customerEmail"
                name="customerEmail"
                type="email"
                placeholder="alex@company.com"
                value={formData.customerEmail}
                onChange={handleChange}
                error={!!fieldErrors.customerEmail}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label="Phone Number"
              htmlFor="phone"
              required
              error={fieldErrors.phone}
            >
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 019-2834"
                value={formData.phone}
                onChange={handleChange}
                error={!!fieldErrors.phone}
              />
            </FormField>

            <FormField
              label="Service of Interest"
              htmlFor="serviceId"
              required
              error={fieldErrors.serviceId}
            >
              <Select
                id="serviceId"
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                error={!!fieldErrors.serviceId}
                disabled={loadingServices}
                placeholder={loadingServices ? 'Loading services...' : 'Select a service...'}
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category || 'General'})
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label="Preferred Date"
              htmlFor="requestedDate"
              required
              error={fieldErrors.requestedDate}
            >
              <Input
                id="requestedDate"
                name="requestedDate"
                type="date"
                min={todayString}
                value={formData.requestedDate}
                onChange={handleChange}
                error={!!fieldErrors.requestedDate}
              />
            </FormField>

            <FormField
              label="Available Time Slot"
              htmlFor="timeSlot"
              required
              error={fieldErrors.timeSlot}
            >
              <Select
                id="timeSlot"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                error={!!fieldErrors.timeSlot}
                placeholder="Choose time window..."
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          {/* Description */}
          <FormField
            label="Project Requirements & Objectives"
            htmlFor="description"
            required
            error={fieldErrors.description}
            helpText="Briefly describe what you're looking to build, technical stack preferences, or consultation questions."
          >
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="e.g. We are building a B2B SaaS web portal and need architecture advisory and full-stack development..."
              value={formData.description}
              onChange={handleChange}
              error={!!fieldErrors.description}
            />
          </FormField>

          {/* Optional Notes */}
          <FormField
            label="Additional Notes (Optional)"
            htmlFor="notes"
            helpText="Any additional details, timezone constraints, or video platform preferences."
          >
            <Input
              id="notes"
              name="notes"
              placeholder="e.g. Please send Google Meet link or Zoom invite"
              value={formData.notes}
              onChange={handleChange}
            />
          </FormField>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              * By booking, you agree to our standard confidentiality and privacy policies.
            </p>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={submitting}
              className="w-full sm:w-auto"
            >
              Submit Booking Request
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
