import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Card from '../components/common/Card';
import TiltCard from '../components/common/TiltCard';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import StatusBadge from '../components/common/StatusBadge';
import Alert from '../components/common/Alert';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import FormField from '../components/common/FormField';
import Textarea from '../components/common/Textarea';
import Select from '../components/common/Select';
import {
  ShieldAlert,
  Calendar,
  MessageSquare,
  Layers,
  Users,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings'); // bookings, enquiries, services, users
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Bookings State
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingStatusFilter, setBookingStatusFilter] = useState('ALL');
  const [bookingSearch, setBookingSearch] = useState('');

  // Enquiries State
  const [enquiries, setEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('ALL');

  // Services State
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    category: 'Engineering',
    icon: 'Code2',
    active: true,
  });

  // Users State
  const [usersList, setUsersList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Notifications
  const [alert, setAlert] = useState(null);

  // 1. Load Stats
  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const res = await api.admin.getStats();
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Failed to load administrative analytics.' });
    } finally {
      setLoadingStats(false);
    }
  };

  // 2. Load Bookings
  const loadBookings = async () => {
    try {
      setLoadingBookings(true);
      const res = await api.admin.getAllBookings({
        status: bookingStatusFilter,
        search: bookingSearch,
      });
      if (res.success && res.data) {
        setBookings(res.data);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Failed to retrieve bookings.' });
    } finally {
      setLoadingBookings(false);
    }
  };

  // 3. Load Enquiries
  const loadEnquiries = async () => {
    try {
      setLoadingEnquiries(true);
      const res = await api.admin.getAllEnquiries({
        status: enquiryStatusFilter,
      });
      if (res.success && res.data) {
        setEnquiries(res.data);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Failed to retrieve enquiries.' });
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // 4. Load Services
  const loadServices = async () => {
    try {
      setLoadingServices(true);
      const res = await api.services.getAll();
      if (res.success && res.data) {
        setServices(res.data);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Failed to retrieve services.' });
    } finally {
      setLoadingServices(false);
    }
  };

  // 5. Load Users
  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await api.admin.getAllUsers();
      if (res.success && res.data) {
        setUsersList(res.data);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Failed to retrieve user accounts.' });
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadStats();
    loadBookings();
  }, []);

  useEffect(() => {
    loadBookings();
  }, [bookingStatusFilter, bookingSearch]);

  useEffect(() => {
    if (activeTab === 'enquiries') loadEnquiries();
    if (activeTab === 'services') loadServices();
    if (activeTab === 'users') loadUsers();
  }, [activeTab, enquiryStatusFilter]);

  // Action: Change booking status
  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const res = await api.admin.updateBookingStatus(id, status);
      if (res.success) {
        setAlert({ type: 'success', message: res.message });
        await loadBookings();
        await loadStats();
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Status update failed.' });
    }
  };

  // Action: Change enquiry status
  const handleUpdateEnquiryStatus = async (id, status) => {
    try {
      const res = await api.admin.updateEnquiryStatus(id, status);
      if (res.success) {
        setAlert({ type: 'success', message: res.message });
        await loadEnquiries();
        await loadStats();
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Status update failed.' });
    }
  };

  // Action: Save Service (Create or Update)
  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        const res = await api.admin.updateService(editingService.id, serviceForm);
        if (res.success) {
          setAlert({ type: 'success', message: 'Service updated successfully.' });
        }
      } else {
        const res = await api.admin.createService(serviceForm);
        if (res.success) {
          setAlert({ type: 'success', message: 'New service created successfully.' });
        }
      }
      setServiceModalOpen(false);
      setEditingService(null);
      await loadServices();
      await loadStats();
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to save service.' });
    }
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-400 text-xs font-mono font-bold tracking-wider uppercase mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Administrative Command Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Logicwind Operations & Governance
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time management for consultation requests, support communications, service definitions, and platform users.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              loadStats();
              if (activeTab === 'bookings') loadBookings();
              if (activeTab === 'enquiries') loadEnquiries();
              if (activeTab === 'services') loadServices();
              if (activeTab === 'users') loadUsers();
            }}
            icon={RefreshCw}
            className="bg-white/[0.05] border-white/10 text-slate-300 hover:text-white"
          >
            Refresh Data
          </Button>
        </div>
      </div>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          className="bg-slate-900 border-white/20 text-white"
        />
      )}

      {/* Top 4 KPI Metrics */}
      {loadingStats ? (
        <div className="py-12 text-center">
          <Spinner size="lg" className="text-sky-400" />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TiltCard
            maxTilt={6}
            className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl space-y-3"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Total Bookings</span>
              <Calendar className="w-5 h-5 text-sky-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {stats.totalBookings}
            </div>
            <div className="flex gap-2 text-[11px] font-mono">
              <span className="text-amber-400">{stats.statusCounts.REQUESTED} pending</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">{stats.statusCounts.CONFIRMED} active</span>
            </div>
          </TiltCard>

          <TiltCard
            maxTilt={6}
            className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl space-y-3"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Support Messages</span>
              <MessageSquare className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {stats.totalEnquiries}
            </div>
            <div className="text-xs text-slate-400">Database audited enquiries</div>
          </TiltCard>

          <TiltCard
            maxTilt={6}
            className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl space-y-3"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Active Services</span>
              <Layers className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {stats.totalServices}
            </div>
            <div className="text-xs text-slate-400">Published offerings</div>
          </TiltCard>

          <TiltCard
            maxTilt={6}
            className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl space-y-3"
          >
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider">Client Accounts</span>
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {stats.totalUsers}
            </div>
            <div className="text-xs text-slate-400">Registered users</div>
          </TiltCard>
        </div>
      ) : null}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'bookings', label: 'Bookings Oversight', icon: Calendar },
          { id: 'enquiries', label: 'Support Enquiries', icon: MessageSquare },
          { id: 'services', label: 'Services Catalog', icon: Layers },
          { id: 'users', label: 'User Directory', icon: Users },
        ].map((tab) => {
          const TIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-sky-500 text-white shadow-[0_0_15px_-2px_#0284c7]'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/5'
              }`}
            >
              <TIcon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {/* Controls: Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
            <div className="relative w-full sm:w-80">
              <Input
                type="text"
                placeholder="Search reference, customer name, email..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="pl-10 bg-slate-900 border-white/10 text-white placeholder:text-slate-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {['ALL', 'REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setBookingStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    bookingStatusFilter === st
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'bg-white/[0.05] text-slate-300 hover:bg-white/[0.1] border border-white/10'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Table/Card List */}
          {loadingBookings ? (
            <div className="py-20 text-center">
              <Spinner size="lg" className="text-sky-400" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-16 text-center bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-slate-400">
              No consultation records match the active criteria.
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-6 bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl backdrop-blur-xl transition-all space-y-4"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-sm font-extrabold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-400/20">
                          {b.bookingReference}
                        </span>
                        <StatusBadge status={b.status} />
                        <span className="text-xs text-slate-400">
                          {new Date(b.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white">
                        {b.customerName}{' '}
                        <span className="text-slate-400 text-sm font-normal">
                          ({b.customerEmail} • {b.phone})
                        </span>
                      </h3>

                      <div className="text-sm text-sky-300 font-medium">
                        Service: {b.service?.name || 'General Consultation'}
                      </div>
                    </div>

                    {/* Status Update Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      {b.status !== 'CONFIRMED' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleUpdateBookingStatus(b.id, 'CONFIRMED')}
                          className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 text-xs"
                        >
                          Confirm
                        </Button>
                      )}
                      {b.status !== 'COMPLETED' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleUpdateBookingStatus(b.id, 'COMPLETED')}
                          className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30 text-xs"
                        >
                          Complete
                        </Button>
                      )}
                      {b.status !== 'CANCELLED' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleUpdateBookingStatus(b.id, 'CANCELLED')}
                          className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/30 text-xs"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Requirements Body */}
                  <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-sm text-slate-300 space-y-2">
                    <div>
                      <span className="font-semibold text-white">Date & Slot:</span>{' '}
                      {b.requestedDate} • {b.timeSlot}
                    </div>
                    <div>
                      <span className="font-semibold text-white">Scope & Requirements:</span>{' '}
                      {b.description}
                    </div>
                    {b.notes && (
                      <div className="text-xs text-slate-400 italic">
                        Notes: {b.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SUPPORT ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
            <h3 className="text-sm font-bold text-slate-300">Filter Enquiries by Status:</h3>
            <div className="flex gap-2">
              {['ALL', 'PENDING', 'RESOLVED', 'CLOSED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setEnquiryStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    enquiryStatusFilter === st
                      ? 'bg-brand-500 text-white'
                      : 'bg-white/[0.05] text-slate-300 border border-white/10'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {loadingEnquiries ? (
            <div className="py-20 text-center">
              <Spinner size="lg" className="text-sky-400" />
            </div>
          ) : enquiries.length === 0 ? (
            <div className="py-16 text-center bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-slate-400">
              No support enquiries found.
            </div>
          ) : (
            <div className="space-y-4">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-white/10 text-slate-300 uppercase">
                          {enq.category}
                        </span>
                        <StatusBadge status={enq.status} />
                        <span className="text-xs text-slate-400">
                          {new Date(enq.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">
                        {enq.name} ({enq.email})
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      {enq.status !== 'RESOLVED' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleUpdateEnquiryStatus(enq.id, 'RESOLVED')}
                          className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs"
                        >
                          Mark Resolved
                        </Button>
                      )}
                      {enq.status !== 'CLOSED' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleUpdateEnquiryStatus(enq.id, 'CLOSED')}
                          className="bg-slate-700 text-slate-300 text-xs"
                        >
                          Close Ticket
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-sm text-slate-300 leading-relaxed">
                    {enq.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SERVICES CATALOG CRUD */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              Manage live technology capabilities displayed across the company website and booking portal.
            </p>
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => {
                setEditingService(null);
                setServiceForm({
                  name: '',
                  description: '',
                  category: 'Engineering',
                  icon: 'Code2',
                  active: true,
                });
                setServiceModalOpen(true);
              }}
            >
              Add New Service
            </Button>
          </div>

          {loadingServices ? (
            <div className="py-20 text-center">
              <Spinner size="lg" className="text-sky-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/10 text-sky-300">
                        {s.category || 'Engineering'}
                      </span>
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                          s.active
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {s.active ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white">{s.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{s.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">Icon: {s.icon}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingService(s);
                        setServiceForm({
                          name: s.name,
                          description: s.description,
                          category: s.category || 'Engineering',
                          icon: s.icon || 'Code2',
                          active: s.active,
                        });
                        setServiceModalOpen(true);
                      }}
                      className="text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 text-xs"
                    >
                      Edit Service
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Service Add/Edit Modal */}
          <Modal
            isOpen={serviceModalOpen}
            onClose={() => setServiceModalOpen(false)}
            title={editingService ? 'Edit Capability' : 'Add New Service Capability'}
          >
            <form onSubmit={handleSaveService} className="space-y-4 text-slate-900">
              <FormField label="Service Name" required>
                <Input
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  placeholder="e.g. AI Workflow Engineering"
                  required
                />
              </FormField>

              <FormField label="Category">
                <Select
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Design">Design</option>
                  <option value="DevOps">DevOps</option>
                  <option value="AI & Data">AI & Data</option>
                  <option value="Quality">Quality</option>
                </Select>
              </FormField>

              <FormField label="Lucide Icon Identifier">
                <Input
                  value={serviceForm.icon}
                  onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                  placeholder="Code2, Smartphone, Cloud, Cpu, Palette..."
                />
              </FormField>

              <FormField label="Detailed Description" required>
                <Textarea
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  rows={3}
                  placeholder="Describe technical deliverables..."
                  required
                />
              </FormField>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeCheckbox"
                  checked={serviceForm.active}
                  onChange={(e) => setServiceForm({ ...serviceForm, active: e.target.checked })}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="activeCheckbox" className="text-sm font-semibold text-slate-700">
                  Publish as Active on Website
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button variant="secondary" size="sm" onClick={() => setServiceModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Service
                </Button>
              </div>
            </form>
          </Modal>
        </div>
      )}

      {/* TAB 4: USERS DIRECTORY */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <p className="text-sm text-slate-400">
            Registered user directory with role access tracking and consultation volume.
          </p>

          {loadingUsers ? (
            <div className="py-20 text-center">
              <Spinner size="lg" className="text-sky-400" />
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-white/[0.05] text-xs uppercase font-mono text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Bookings Created</th>
                    <th className="px-6 py-4">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{u.fullName}</div>
                        <div className="text-xs text-slate-400 font-mono">{u.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                            u.role === 'ADMIN'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                              : 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-semibold text-white">
                        {u._count?.bookings || 0}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
