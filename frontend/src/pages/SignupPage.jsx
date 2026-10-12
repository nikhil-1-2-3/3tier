import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import FormField from '../components/common/FormField';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { Sparkles, UserPlus } from 'lucide-react';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!validate()) return;

    try {
      setLoading(true);
      const res = await signup(formData);
      if (res.success) {
        navigate('/my-bookings');
      } else {
        setErrorMsg(res.message || 'Registration failed.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Unable to register account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 sm:py-24 max-w-md mx-auto px-4 sm:px-6">
      <div className="text-center space-y-2 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white mx-auto shadow-md">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Your Account
        </h1>
        <p className="text-sm text-slate-500">
          Join the Logicwind portal to schedule and track consultations.
        </p>
      </div>

      {errorMsg && (
        <Alert
          type="error"
          message={errorMsg}
          onClose={() => setErrorMsg(null)}
          className="mb-6"
        />
      )}

      <Card className="p-6 sm:p-8 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Full Name" htmlFor="fullName" required error={fieldErrors.fullName}>
            <Input
              id="fullName"
              name="fullName"
              placeholder="e.g. Jane Doe"
              value={formData.fullName}
              onChange={handleChange}
              error={!!fieldErrors.fullName}
            />
          </FormField>

          <FormField label="Work Email" htmlFor="email" required error={fieldErrors.email}>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jane@company.com"
              value={formData.email}
              onChange={handleChange}
              error={!!fieldErrors.email}
            />
          </FormField>

          <FormField
            label="Password"
            htmlFor="password"
            required
            error={fieldErrors.password}
            helpText="Minimum 6 characters."
          >
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={!!fieldErrors.password}
            />
          </FormField>

          <FormField
            label="Confirm Password"
            htmlFor="confirmPassword"
            required
            error={fieldErrors.confirmPassword}
          >
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!fieldErrors.confirmPassword}
            />
          </FormField>

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            icon={UserPlus}
            className="w-full mt-2"
          >
            Create Account
          </Button>

          <div className="pt-4 text-center text-xs text-slate-500 border-t border-slate-100">
            Already registered?{' '}
            <Link to="/login" className="text-brand-600 font-semibold hover:underline">
              Sign in to your account
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
