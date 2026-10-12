import React from 'react';

export default function FormField({
  label,
  htmlFor,
  required = false,
  error,
  helpText,
  children,
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="text-rose-500 ml-1" title="Required">*</span>}
        </label>
      )}

      {children}

      {error ? (
        <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
          <span className="w-1 h-1 rounded-full bg-rose-500 inline-block"></span>
          {error}
        </p>
      ) : helpText ? (
        <p className="text-xs text-slate-500 mt-1">{helpText}</p>
      ) : null}
    </div>
  );
}
