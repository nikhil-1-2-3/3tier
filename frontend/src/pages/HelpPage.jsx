import React, { useState } from 'react';
import { api } from '../services/api';
import FaqAccordion from '../components/help/FaqAccordion';
import Card from '../components/common/Card';
import FormField from '../components/common/FormField';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { HelpCircle, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

const SAMPLE_FAQS = [
  {
    id: 1,
    category: 'Booking',
    question: 'How does the technical consultation booking process work?',
    answer:
      'You can submit a booking request through our online portal by selecting an engineering service, preferred date, and time slot. Once submitted, our leads review your scope and follow up with a confirmed calendar invitation within 24 business hours.',
  },
  {
    id: 2,
    category: 'Services',
    question: 'What technologies and frameworks does Logicwind specialize in?',
    answer:
      'We specialize in modern full-stack web architectures (React, Node.js, Next.js, Express), relational and document databases (PostgreSQL, Prisma), mobile development (React Native, Flutter), and cloud DevOps (Docker, Kubernetes, AWS).',
  },
  {
    id: 3,
    category: 'Security',
    question: 'How do you safeguard client IP and application security?',
    answer:
      'We execute standard non-disclosure agreements (NDAs) prior to detailed discovery. In development, we strictly enforce environment parameter separation, password hashing, HttpOnly authentication tokens, and principle of least privilege access.',
  },
  {
    id: 4,
    category: 'Pricing',
    question: 'What engagement models and pricing structures do you offer?',
    answer:
      'We offer flexible engagement models tailored to your project phase: Fixed-price milestone delivery for clearly defined MVPs, Dedicated Agile Sprint Teams for evolving platforms, and On-demand hourly technical consulting.',
  },
  {
    id: 5,
    category: 'Support',
    question: 'What post-launch maintenance and support options are available?',
    answer:
      'Every production deployment includes complimentary post-launch warranty support. We also provide ongoing Service Level Agreements (SLAs) covering 24/7 uptime monitoring, security patching, and continuous feature enhancements.',
  },
];

export default function HelpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Enquiry',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.category) errors.category = 'Please choose a category.';
    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!validate()) return;

    try {
      setSubmitting(true);
      const res = await api.support.submit(formData);
      if (res.success) {
        setSuccessMsg(res.message);
        setFormData({
          name: '',
          email: '',
          category: 'General Enquiry',
          message: '',
        });
      } else {
        setErrorMsg(res.message || 'Failed to submit enquiry.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Server error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
          Knowledge Base & Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How Can We Help You?
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Find answers to common questions about our services and process, or send a direct support ticket to our technical leads.
        </p>
      </div>

      {/* FAQs Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
          <HelpCircle className="w-5 h-5 text-brand-600" />
          <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>
        <FaqAccordion faqs={SAMPLE_FAQS} />
      </div>

      {/* Support Enquiry Form */}
      <div className="pt-8 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-100">
              Direct Contact
            </span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Submit a Support Enquiry
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Have a specific question not covered in our FAQ? Complete this form and our support engineers will review and respond promptly.
            </p>

            <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">Database Persistence:</p>
              <p>All enquiries are recorded securely in our PostgreSQL database for auditing and resolution tracking.</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8 shadow-sm">
              {successMsg && (
                <Alert
                  type="success"
                  title="Enquiry Received"
                  message={successMsg}
                  onClose={() => setSuccessMsg(null)}
                  className="mb-6"
                />
              )}

              {errorMsg && (
                <Alert
                  type="error"
                  title="Submission Notice"
                  message={errorMsg}
                  onClose={() => setErrorMsg(null)}
                  className="mb-6"
                />
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="Your Name" htmlFor="name" required error={fieldErrors.name}>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!fieldErrors.name}
                    />
                  </FormField>

                  <FormField label="Email Address" htmlFor="email" required error={fieldErrors.email}>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!fieldErrors.email}
                    />
                  </FormField>
                </div>

                <FormField
                  label="Category / Subject"
                  htmlFor="category"
                  required
                  error={fieldErrors.category}
                >
                  <Select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    error={!!fieldErrors.category}
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Technical Scoping">Technical Scoping</option>
                    <option value="Booking Assistance">Booking Assistance</option>
                    <option value="Billing & Invoicing">Billing & Invoicing</option>
                    <option value="Security & Compliance">Security & Compliance</option>
                  </Select>
                </FormField>

                <FormField
                  label="Your Message"
                  htmlFor="message"
                  required
                  error={fieldErrors.message}
                  helpText="Describe your question or issue in detail (minimum 10 characters)."
                >
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    error={!!fieldErrors.message}
                  />
                </FormField>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={submitting}
                    icon={Send}
                  >
                    Send Support Message
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
