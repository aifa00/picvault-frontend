import React from "react";

const InputGroup: React.FC<any> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div className="text-left mb-3">
      <label>
        {label}
        <input
          className="w-full bg-slate-100 p-2 border-0 outline-0 rounded-md"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
      <span className="text-red-500">{error}</span>
    </div>
  );
};

export default InputGroup;
