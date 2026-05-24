// components/RadioButton.tsx
import React from "react";

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  tabIndex?: number;
  labelClassName?: string;
  onChange: (value: string) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  tabIndex,
  labelClassName,
  onChange,
}) => {
  return (
    <label className="flex items-center cursor-pointer gap-x-2">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        tabIndex={tabIndex}
        onChange={() => onChange(value)}
        className="hidden"
      />
      <div
        className={`w-[18px] h-[18px] border-2 rounded-full flex items-center justify-center transition ${checked ? "border-black-100 dark:border-white-100" : "border-gray-300"
          }`}
      >
        {checked && <div className="w-2 h-2 bg-black-100 dark:bg-white-100 rounded-full"></div>}
      </div>
      <span className={labelClassName}>{label}</span>
    </label>
  );
};