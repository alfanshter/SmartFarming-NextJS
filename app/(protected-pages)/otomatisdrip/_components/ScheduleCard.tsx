import { Switch } from "@/shared/components/ui/Switch";

interface TimeSlot {
  id: string;
  startTime: string;
  durationMinutes: number;
  durationSeconds: number;
}

interface Schedule {
  id: string;
  zoneName: string;
  zoneId: string;
  isActive: boolean;
  timeSlots: TimeSlot[];
  activeDays: string[];
}

interface ScheduleCardProps {
  schedule: Schedule;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ScheduleCard({
  schedule,
  onToggle,
  onEdit,
  onDelete,
}: ScheduleCardProps) {
  // Format single duration display
  const formatDuration = (minutes: number, seconds: number) => {
    const parts = [];
    if (minutes > 0) {
      parts.push(`${minutes} menit`);
    }
    if (seconds > 0) {
      parts.push(`${seconds} detik`);
    }
    return parts.length > 0 ? parts.join(" ") : "0 detik";
  };

  return (
    <div
      className={`p-6 rounded-xl border transition-all ${
        schedule.isActive
          ? "bg-blue-50 border-blue-200 shadow-sm"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between">
        {/* Left: Icon + Info */}
        <div className="flex items-start gap-4 flex-1">
          {/* Clock Icon */}
          <div
            className={`p-3 rounded-2xl ${
              schedule.isActive ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-6 h-6 ${
                schedule.isActive ? "text-white" : "text-gray-500"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>

          {/* Zone Name + Schedule Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {schedule.zoneName}
              </h3>
              {schedule.isActive && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Aktif
                </span>
              )}
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                {schedule.timeSlots.length}x Penyiraman
              </span>
            </div>

            {/* Time Slots List */}
            <div className="space-y-2 mb-3">
              {schedule.timeSlots.map((slot, index) => (
                <div
                  key={slot.id}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                    schedule.isActive ? "bg-white/50" : "bg-gray-50"
                  }`}
                >
                  <span className="text-xs font-bold text-gray-500 w-5">
                    #{index + 1}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span className="font-semibold text-gray-700">
                    {slot.startTime}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 text-sm">
                    {formatDuration(slot.durationMinutes, slot.durationSeconds)}
                  </span>
                </div>
              ))}
            </div>

            {/* Active Days */}
            <div className="flex flex-wrap gap-2">
              {schedule.activeDays.map((day) => (
                <span
                  key={day}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    schedule.isActive
                      ? "bg-blue-200 text-blue-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Toggle Switch */}
        <Switch checked={schedule.isActive} onChange={onToggle} />
      </div>

      {/* Bottom: Edit & Delete Buttons */}
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <span className="font-medium">Edit</span>
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          <span className="font-medium">Hapus</span>
        </button>
      </div>
    </div>
  );
}
