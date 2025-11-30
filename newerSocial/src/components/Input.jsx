import React, { useId } from 'react';

function Input({ label, type = 'text', className = '', error, ...props }) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        {...props} // includes ref from react-hook-form
        className={`
          px-3 py-2 rounded-lg bg-white text-black 
          outline-none focus:bg-gray-50 duration-200 
          border border-gray-200 w-full ${className}
        `}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default Input;
