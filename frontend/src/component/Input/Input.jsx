import React from "react";

function Input({ labelVis, label, type, onChange,labelClass, className, ...props }) {
  return (
    <div className="flex flex-col  w-full justify-center items-center py-1">
      {labelVis && (
        <label className={`text-gray-300 mt-1.5 mr-auto ${labelClass} `} htmlFor={label}>
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 rounded-md bg-[#1e1f26] text-gray-200 placeholder-gray-500
              border border-gray-700 focus:border-blue-600 focus:ring-1 focus:ring-blue-600
              outline-none transition-all duration-200 ${className}`}
        type={type}
        id={label}
        name={label}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default Input;
