import { useState } from "react";

type SwitchProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export default function Switch({
  checked = false,
  onChange,
  disabled = false,
}: SwitchProps) {
  const handleToogle = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  return (
    <button
      onClick={handleToogle}
      disabled={disabled}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all ${checked ? "bg-green-500" : "bg-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-7" : "translate-x-1"}`}
      ></span>
    </button>
  );
}
