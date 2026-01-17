import { useState } from "react";

export default function Slider({ value = 0, onChange }) {

    const [progress, setProgress] = useState(value);
    const handleChange = (e) => {
        const val = Number(e.target.value);
        setProgress(val);
        onChange?.(val);
    }
    return (
        <div className="w-full space-y-2">
            {/* slider */}
            <div className="relative w-full">
                {/* background bar */}
                <div className="h-4 w-full rounded-full bg-green-100">
                    {/* active bar */}
                    <div className="absolute top-0 left-0 h-4 rounded-full bg-green-500" style={{ width: `${progress}%` }} />
                    {/* thumb */}
                    <div className="absolute top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border-4 border-green-500 shadow" style={{ left: `calc(${progress}% - 12px)` }} />
                    {/* range input invisible */}
                    <input type="range" min={0} max={100} value={progress} onChange={handleChange} className="absolute top-0 left-0 w-full h-4 opacity-0 cursor-pointer" />

                </div>

                {/* label */}
                <div className="flex justify-between text-sm text-gray-400">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                </div>

            </div>
        </div>
    )
}