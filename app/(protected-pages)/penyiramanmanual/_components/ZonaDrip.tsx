import { Switch } from "@/shared/components/ui/Switch";
import TimeInput from "./TimeInput";
import { useEffect, useState, useRef } from "react";

interface ZonaDripProps {
  zona: { id: number; name: string };
  active: boolean;
  onToggle: () => void;
  sisaDetik: number | null;
  onSisaDetikChange: (sisaDetik: number | null) => void;
}

export default function ZonaDrip({
  zona,
  active,
  onToggle,
  sisaDetik,
  onSisaDetikChange,
}: ZonaDripProps) {
  const [menit, setMenit] = useState("");
  const [detik, setDetik] = useState("");
  const [timerTarget, setTimerTarget] = useState<number | null>(null);
  const prevActiveRef = useRef(active);

  const totalDetik = (Number(menit) || 0) * 60 + (Number(detik) || 0);
  const isTimeEmpty = totalDetik === 0;

  const handleToggle = () => {
    if (active) {
      // MATI - reset state
      onSisaDetikChange(null);
      setTimerTarget(null);
      onToggle();
    } else {
      // NYALA
      if (totalDetik > 0) {
        // Mode countdown: set timer
        setTimerTarget(totalDetik);
        onSisaDetikChange(totalDetik);
      } else {
        // Mode count-up: mulai dari 0
        onSisaDetikChange(0);
      }
      onToggle();
    }
  };

  // Sinkronisasi saat active berubah dari parent (contoh: Aktifkan Semua)
  useEffect(() => {
    // Cek apakah active berubah dari false ke true
    if (active && !prevActiveRef.current && sisaDetik === null) {
      // Zona diaktifkan dari parent, tapi belum ada sisaDetik
      // Gunakan queueMicrotask untuk menghindari setState dalam render
      queueMicrotask(() => {
        if (totalDetik > 0) {
          // Mode countdown
          setTimerTarget(totalDetik);
          onSisaDetikChange(totalDetik);
        } else {
          // Mode count-up
          onSisaDetikChange(0);
        }
      });
    }
    // Cek apakah active berubah dari true ke false
    else if (!active && prevActiveRef.current) {
      // Zona dimatikan dari parent
      queueMicrotask(() => {
        onSisaDetikChange(null);
        setTimerTarget(null);
      });
    }
    
    // Update ref
    prevActiveRef.current = active;
  }, [active, sisaDetik, totalDetik, onSisaDetikChange]);

  // Timer logic
  useEffect(() => {
    if (!active || sisaDetik === null) return;

    const interval = setInterval(() => {
      if (timerTarget !== null) {
        // Mode COUNTDOWN (jika ada timer target)
        if (sisaDetik > 0) {
          onSisaDetikChange(sisaDetik - 1);
        }
      } else {
        // Mode COUNT UP (jika tidak ada timer target)
        onSisaDetikChange(sisaDetik + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [active, sisaDetik, timerTarget, onSisaDetikChange]);

  // Auto-stop saat countdown selesai
  useEffect(() => {
    if (timerTarget !== null && sisaDetik === 0 && active) {
      onToggle();
    }
  }, [sisaDetik, timerTarget, active, onToggle]);

  const menitSisa = Math.floor((sisaDetik ?? 0) / 60);
  const detikSisa = (sisaDetik ?? 0) % 60;
  const format = (n: number) => n.toString().padStart(2, "0");


  return (
    <div
      className={`p-4 rounded-xl border transition-colors ${active ? "bg-blue-100 border-blue-300" : "bg-white border-green-100"}   mt-5`}
    >
      {/* zona switch */}
      <div className="flex items-center justify-between">
        {/* icon + zona */}
        <div className="flex items-center justify-center">
          {/* icon */}
          <div
            className={`inline-flex items-center justify-center p-3 rounded-2xl ${active ? "bg-blue-500" : "bg-gray-200"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.0}
              stroke="currentColor"
              className="size-6"
              color={`${active ? "white" : "gray"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
              />
            </svg>
          </div>
          {/* teks zona a  tidak aktif*/}
          <div className="ml-4">
            <p className="text-black font-normal">{zona.name}</p>
            <p className="text-gray-500 font-normal text-sm">Tidak Aktif</p>
          </div>
        </div>
        {/* switch */}
        <Switch
          checked={active}
          onChange={handleToggle}
          disabled={false}
        />
      </div>

      {/* intensitas */}
      <p className="mt-10 text-sm text-black">Atur durasi penyiraman</p>
      {/* layout detik dan menit */}
      <div className="flex items-center justify-between gap-5 mt-4">
        {/* card layout 1 */}
        <TimeInput
          value={menit}
          unit="menit"
          isPenyiraman={active}
          onChange={setMenit}
        />
        {/* card layout 2 */}
        <TimeInput
          value={detik}
          unit="detik"
          isPenyiraman={active}
          onChange={setDetik}
        />
      </div>
      {/* layout durasi */}
      <div className="flex justify-between px-4 py-4 mt-4 bg-gray-200 border border-gray-300 rounded-xl ">
        <p className="text-gray-700 text-md font-mono">Total Durasi :</p>
        <p className="text-black text-lg font-semibold">
          {menit || detik ? `${menit || "0"} menit ${detik || "0"} detik` : "Belum diatur"}
        </p>
      </div>
      {!active ? (
        <p className="text-sm text-gray-500 mt-4 mb-2">
          💡 {isTimeEmpty 
            ? "Aktifkan zona untuk memulai penyiraman dengan durasi bebas (count up)" 
            : "Aktifkan zona untuk memulai countdown timer"}
        </p>
      ) : (
        <div className="flex flex-start items-center  w-full rounded-xl bg-blue-100 px-4 py-3 mt-10 text-blue-600 text-sm font-mono">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          <span className="ml-2">
            {timerTarget !== null ? "⏱️ Countdown: " : "⏰ Durasi: "}
            {sisaDetik !== null
              ? `${format(menitSisa)} menit ${format(detikSisa)} detik`
              : "-"}
          </span>
        </div>
      )}
    </div>
  );
}
