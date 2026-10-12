import React, { forwardRef } from 'react';

const Select = forwardRef(function Select(
  {
    options = [],
    error,
    className = '',
    id,
    placeholder = 'Select an option...',
    disabled = false,
    children,
    ...props
  },
  ref
) {
  const baseClasses =
    'w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all duration-150 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed';

  const stateClasses = error
    ? 'border-rose-300 text-rose-900 focus:ring-rose-500 focus:border-rose-500'
    : 'border-slate-300 text-slate-900 focus:ring-brand-500 focus:border-brand-500 hover:border-slate-400';

  return (
    <select
      ref={ref}
      id={id}
      disabled={disabled}
      className={`${baseClasses} ${stateClasses} ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children
        ? children
        : options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
    </select>
  );
});

export default Select;
