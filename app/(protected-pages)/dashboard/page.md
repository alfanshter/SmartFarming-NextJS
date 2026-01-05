/**
 * Dashboard Home Page
 * Letakkan di: src/app/dashboard/page.tsx
 */
'use client';

import React from 'react';

export default function DashboardPage() {
  // Data Dummy
  const stats = [
    {
      title: 'Total Tanaman',
      value: '12',
      icon: '🌱',
      color: 'green',
      change: '+8%',
      changeType: 'increase',
    },
    {
      title: 'Sensor Aktif',
      value: '3',
      icon: '📡',
      color: 'blue',
      change: '100%',
      changeType: 'neutral',
    },
    {
      title: 'Kelembaban Rata-rata',
      value: '65%',
      icon: '💧',
      color: 'cyan',
      change: '-3%',
      changeType: 'decrease',
    },
    {
      title: 'Suhu Rata-rata',
      value: '28°C',
      icon: '🌡️',
      color: 'orange',
      change: '+2°C',
      changeType: 'increase',
    },
  ];

  const recentActivities = [
    { time: '10 menit lalu', action: 'Sensor kelembaban diaktifkan', icon: '💧', color: 'blue' },
    { time: '1 jam lalu', action: 'Irigasi otomatis berjalan', icon: '🌊', color: 'cyan' },
    { time: '2 jam lalu', action: 'Tanaman baru ditambahkan', icon: '🌱', color: 'green' },
    { time: '5 jam lalu', action: 'Laporan mingguan dibuat', icon: '📊', color: 'purple' },
  ];

  const crops = [
    { name: 'Padi Sawah A1', status: 'Tumbuh Baik', health: 95, image: '🌾' },
    { name: 'Jagung B2', status: 'Butuh Perhatian', health: 65, image: '🌽' },
    { name: 'Tomat C3', status: 'Tumbuh Baik', health: 88, image: '🍅' },
    { name: 'Cabai D4', status: 'Sangat Baik', health: 98, image: '🌶️' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Selamat Datang, Pak Tani! 👋</h1>
        <p className="text-green-100">
          Senin, 6 Januari 2025 • Sistem berjalan normal
        </p>
        <div className="mt-4 flex gap-4">
          <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
            📊 Lihat Laporan
          </button>
          <button className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition-all">
            ➕ Tambah Tanaman
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center text-2xl`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded ${
                  stat.changeType === 'increase'
                    ? 'bg-green-100 text-green-700'
                    : stat.changeType === 'decrease'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Crops Status */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Status Tanaman</h2>
            <button className="text-green-600 hover:text-green-700 font-semibold">
              Lihat Semua →
            </button>
          </div>

          <div className="space-y-4">
            {crops.map((crop, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{crop.image}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{crop.name}</h3>
                    <p className="text-sm text-gray-600">{crop.status}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Kesehatan</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          crop.health >= 80
                            ? 'bg-green-500'
                            : crop.health >= 60
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${crop.health}%` }}
                      />
                    </div>
                    <span className="font-bold text-gray-900">{crop.health}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Aktivitas Terbaru</h2>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div
                  className={`w-8 h-8 bg-${activity.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <ActionCard
          title="Monitor Sensor"
          description="Pantau sensor real-time"
          icon="📡"
          color="blue"
        />
        <ActionCard
          title="Kontrol Irigasi"
          description="Atur sistem pengairan"
          icon="💧"
          color="cyan"
        />
        <ActionCard
          title="Lihat Cuaca"
          description="Prediksi cuaca hari ini"
          icon="🌤️"
          color="yellow"
        />
      </div>
    </div>
  );
}

// Action Card Component
function ActionCard({
  title,
  description,
  icon,
  color,
}: {
  title: string;
  description: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer group">
      <div
        className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}