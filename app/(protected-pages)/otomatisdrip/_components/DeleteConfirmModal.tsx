interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  scheduleName: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  scheduleName,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-orange-900/20 to-pink-900/20 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-slideUp">
        {/* Decorative Header Background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-red-400 via-red-500 to-red-600 opacity-10 rounded-t-3xl"></div>

        {/* Content */}
        <div className="relative px-8 py-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-red-400 to-red-600 p-4 rounded-full shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
            Hapus Jadwal?
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-center mb-2">
            Apakah Anda yakin ingin menghapus jadwal untuk:
          </p>
          <p className="text-lg font-bold text-red-600 text-center mb-6 bg-red-50 py-3 px-4 rounded-xl border-2 border-red-200">
            {scheduleName}
          </p>

          {/* Warning Message */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">
                  Perhatian!
                </p>
                <p className="text-sm text-amber-700">
                  Tindakan ini tidak dapat dibatalkan. Semua data jadwal akan
                  dihapus secara permanen.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
            >
              Batal
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-semibold shadow-lg shadow-red-200 hover:shadow-xl hover:scale-105 transform"
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
