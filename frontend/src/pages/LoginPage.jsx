import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import FormField from '../components/common/FormField';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { Sparkles, LogIn } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/my-bookings';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
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
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMsg(res.message || 'Authentication failed.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password.');
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
          Welcome to Logicwind
        </h1>
        <p className="text-sm text-slate-500">
          Sign in to access your consultations and booking history.
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

      {/* Demo Credentials Tip */}
      <div className="mb-6 p-3 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-800">
        <span className="font-bold">Test Credentials:</span> demo@logicwind.com / DemoPass123!
      </div>

      <Card className="p-6 sm:p-8 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField label="Email Address" htmlFor="email" required error={fieldErrors.email}>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              error={!!fieldErrors.email}
            />
          </FormField>

          <FormField label="Password" htmlFor="password" required error={fieldErrors.password}>
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

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            icon={LogIn}
            className="w-full mt-2"
          >
            Sign In
          </Button>

          <div className="pt-4 text-center text-xs text-slate-500 border-t border-slate-100">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-600 font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
