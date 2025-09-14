import React from "react";

export const InputText = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="border px-3 py-2 rounded w-full"
    />
  );
};
