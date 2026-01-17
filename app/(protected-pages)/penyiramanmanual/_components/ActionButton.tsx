type ActionButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  icon: React.ReactNode;
  disabled?: boolean;
};

export default function ActionButton({
  label,
  onClick,
  icon,
  variant = "primary",
  disabled = false,
}: ActionButtonProps) {
  const base =
    "flex items-center justify-center gap-4 px-6 py-3 rounded-xl w-1/4 transition-all text-sm font-medium";

  const styles = {
    primary: "bg-green-500 hover:bg-green-600 text-white",
    outline: "bg-white border border-green-300 hover:bg-green-100 text-black",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${base}
        ${styles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
