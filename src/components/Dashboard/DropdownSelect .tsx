import React from "react";
import { ChevronDown } from "lucide-react";

interface DropdownSelectProps {
  options: string[];
  leftIcon?: React.ReactNode;
  className?: string;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({ options, leftIcon, className }) => {
  return (
    <div className={`relative w-48 ${className}`}>
      {/* Left icon */}
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {leftIcon}
        </div>
      )}

      {/* Select */}
      <select
        className={`appearance-none w-full bg-neutral-900 text-white text-sm border border-neutral-700 rounded-md py-2 pr-10 pl-${leftIcon ? "10" : "3"} focus:outline-none focus:ring-1 focus:ring-orange-500`}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* Chevron icon */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronDown className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};

export default DropdownSelect;
