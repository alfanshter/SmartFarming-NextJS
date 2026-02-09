"use client";

import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
}

export default function BarcodeScannerModal({
  isOpen,
  onClose,
  onScanSuccess,
}: BarcodeScannerModalProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isOpen && !scannerRef.current) {
      // Initialize scanner
      const scanner = new Html5QrcodeScanner(
        "barcode-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          // Success callback
          onScanSuccess(decodedText);
          scanner.clear();
          scannerRef.current = null;
          setIsScanning(false);
          onClose();
        },
        () => {
          // Error callback (optional, untuk debugging)
          // console.warn(error);
        }
      );

      scannerRef.current = scanner;
      // Set scanning state in next tick to avoid setState in effect warning
      setTimeout(() => setIsScanning(true), 0);
    }

    // Cleanup
    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .catch((error) => console.error("Failed to clear scanner:", error));
        scannerRef.current = null;
      }
    };
  }, [isOpen, onScanSuccess, onClose]);

  const handleClose = () => {
    if (scannerRef.current) {
      scannerRef.current
        .clear()
        .catch((error) => console.error("Failed to clear scanner:", error));
      scannerRef.current = null;
    }
    setIsScanning(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Modern Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-md"
        onClick={handleClose}
      ></div>

      {/* Modal Container with Animation */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 animate-slideUp">
        {/* Decorative Header Background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600 opacity-10"></div>

        {/* Header */}
        <div className="relative px-8 pt-8 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Icon Badge */}
              <div className="bg-gradient-to-br from-indigo-400 to-purple-600 p-3 rounded-2xl shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Scan Barcode
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Arahkan kamera ke barcode
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition-all duration-200 hover:rotate-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Scanner Container */}
        <div className="px-8 pb-8">
          {/* Scanner Box */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div id="barcode-reader" className="w-full"></div>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              <div className="text-sm text-indigo-900">
                <p className="font-semibold mb-1">Tips Scanning:</p>
                <ul className="space-y-1 text-indigo-800">
                  <li>• Pastikan barcode dalam pencahayaan yang baik</li>
                  <li>• Jaga jarak 10-20 cm dari kamera</li>
                  <li>• Barcode harus berada dalam kotak scan</li>
                  <li>• Support: QR Code, EAN, Code128, dll</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Status */}
          {isScanning && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Kamera aktif, siap scan...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
