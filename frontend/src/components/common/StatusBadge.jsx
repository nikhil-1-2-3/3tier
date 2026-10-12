import React from 'react';

export default function StatusBadge({ status, className = '' }) {
  const normalized = (status || '').toUpperCase();

  const configs = {
    REQUESTED: {
      label: 'Request Submitted',
      classes: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    CONFIRMED: {
      label: 'Confirmed',
      classes: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    COMPLETED: {
      label: 'Completed',
      classes: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    CANCELLED: {
      label: 'Cancelled',
      classes: 'bg-slate-100 text-slate-600 border-slate-200',
    },
    PENDING: {
      label: 'Pending Review',
      classes: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    RESOLVED: {
      label: 'Resolved',
      classes: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
  };

  const current = configs[normalized] || {
    label: status || 'Unknown',
    classes: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current.classes} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
      {current.label}
    </span>
  );
}
