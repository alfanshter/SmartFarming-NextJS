# Flushing System

Halaman ini menyediakan fitur untuk menjalankan sistem pembilasan (flushing) otomatis pada pipa irigasi.

## Fitur Utama

### 1. **Kontrol Flushing**
- **Tombol ON/OFF**: Mulai dan hentikan proses flushing
- **Pengaturan Durasi**: Set durasi flushing dari 1-120 menit (default 15 menit)
- **Countdown Timer**: Hitung mundur waktu tersisa dengan tampilan MM:SS
- **Progress Bar**: Visual progress indicator
- **Status Realtime**: Indikator status aktif/tidak aktif

### 2. **Riwayat Flushing**
- **Otomatis Tersimpan**: Setiap sesi flushing otomatis tersimpan ke localStorage
- **Status Lengkap**: Tampilkan status "Selesai" atau "Dihentikan"
- **Waktu Detail**: Catat waktu mulai dan selesai setiap sesi
- **Durasi Aktual**: Hitung durasi sebenarnya
- **Hapus Riwayat**: Opsi untuk menghapus riwayat individual atau semua

### 3. **Statistik**
- Total jumlah flushing yang pernah dilakukan
- Jumlah flushing yang selesai normal
- Total durasi kumulatif flushing

## Cara Penggunaan

1. **Mulai Flushing**:
   - Atur durasi yang diinginkan (dalam menit)
   - Klik tombol "Mulai Flushing"
   - Sistem akan mulai countdown

2. **Stop Manual**:
   - Klik tombol "Stop" untuk menghentikan flushing sebelum selesai
   - Riwayat akan mencatat sebagai "Dihentikan" dengan durasi aktual

3. **Auto Complete**:
   - Sistem akan otomatis berhenti saat countdown selesai
   - Riwayat akan mencatat sebagai "Selesai" dengan durasi sesuai setting

4. **Lihat Riwayat**:
   - Panel kanan menampilkan semua riwayat flushing
   - Info lengkap waktu mulai, selesai, durasi, dan status
   - Scroll untuk melihat riwayat lebih lama

5. **Hapus Riwayat**:
   - Klik icon hapus pada item untuk menghapus satu riwayat
   - Klik "Hapus Semua" untuk clear seluruh riwayat

## Teknologi

- **React Hooks**: useState, useEffect, useRef, useCallback
- **LocalStorage**: Persistent storage untuk riwayat
- **Countdown Timer**: Real-time countdown dengan setInterval
- **Responsive Design**: Mobile-friendly layout
- **Tailwind CSS**: Modern styling

## Manfaat

Flushing system membantu:
- Menghilangkan kotoran dan endapan dalam pipa
- Mencegah penyumbatan pipa irigasi
- Menjaga kualitas air irigasi
- Memperpanjang umur sistem irigasi
- Tracking maintenance yang teratur
