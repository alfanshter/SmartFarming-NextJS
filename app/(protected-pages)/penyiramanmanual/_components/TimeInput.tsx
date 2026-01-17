export default function TimeInput({ value = "020", unit = "menit", isPenyiraman = false, onChange }: { value?: string; unit?: string; isPenyiraman?: boolean, onChange?: (val : string) => void;}) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        defaultValue={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={isPenyiraman}
        className={`w-full text-center text-black font-semibold text-xl transition-colors ${isPenyiraman ? "bg-blue-50 border-none" : "bg-green-50 border-2 border-green-300"}
          
          
          rounded-2xl
          py-6
          pr-16
          outline-none
          focus:border-green-500
          focus:ring-2 focus:ring-green-300
          `}
      />

      {/* UNIT */}
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-lg pointer-events-none">
        {unit}
      </span>
    </div>
  );
}
