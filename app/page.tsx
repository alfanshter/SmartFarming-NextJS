'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────
interface NavItem { label: string; href: string }
interface MelonVariety { name: string; emoji: string; color: string; desc: string; weight: string; days: string; taste: string; badge: string }
interface StatItem { value: string; label: string; icon: string }
interface FeatureItem { icon: string; title: string; desc: string }
interface TimelineItem { step: string; title: string; desc: string; color: string }

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "Beranda", href: "#hero" },
  { label: "Tentang", href: "#about" },
  { label: "Varietas", href: "#varieties" },
  { label: "Teknologi", href: "#technology" },
  { label: "Galeri", href: "#gallery" },
  { label: "Kontak", href: "#contact" },
];

const MELON_VARIETIES: MelonVariety[] = [
  {
    name: "Lavender",
    emoji: "�",
    color: "from-yellow-400 to-yellow-600",
    desc: "Melon lonjong berwarna kuning cerah dengan permukaan kulit berjaring (net). Daging buah putih gading, tekstur krispy dan renyah, rasa sangat manis dengan aroma khas yang harum.",
    weight: "1.5 – 2.5 kg",
    days: "65 hari",
    taste: "Manis & Krispy",
    badge: "Best Seller",
  },
  {
    name: "Skidrow",
    emoji: "🍈",
    color: "from-green-400 to-emerald-600",
    desc: "Melon bulat dengan kulit hijau putih bermotif corak khas yang cantik. Daging buah putih bersih, tekstur lembut sangat juicy, rasa manis segar dan menyejukkan.",
    weight: "2.0 – 3.0 kg",
    days: "55 – 60 hari",
    taste: "Manis & Juicy",
    badge: "Premium",
  },
  {
    name: "Honeyglobe",
    emoji: "�",
    color: "from-lime-400 to-green-500",
    desc: "Mirip Skidrow, melon bulat berkulit hijau putih namun tanpa motif corak. Daging putih bersih, sangat juicy dan manis, kandungan gula tinggi cocok untuk konsumen premium.",
    weight: "1.8 – 2.8 kg",
    days: "55 – 60 hari",
    taste: "Manis & Juicy",
    badge: "Favorit",
  },
];

const STATS: StatItem[] = [
  { value: "3+", label: "Varietas Premium", icon: "🍈" },
  { value: "400+", label: "Polibag Aktif", icon: "🪴" },
  { value: "98%", label: "Tingkat Keberhasilan", icon: "✅" },
  { value: "24/7", label: "Monitoring Otomatis", icon: "📡" },
];

const FEATURES: FeatureItem[] = [
  { icon: "💧", title: "Irigasi Tetes Polibag", desc: "Sistem drip irrigation presisi yang mengalirkan air dan nutrisi langsung ke akar tanaman, menghemat air hingga 60%." },
  { icon: "🌡️", title: "Kontrol Iklim Mikro", desc: "Greenhouse dilengkapi sensor suhu, kelembaban, dan CO₂ otomatis untuk menjaga kondisi ideal pertumbuhan melon." },
  { icon: "📱", title: "Monitoring Real-time", desc: "Pantau kondisi tanaman 24 jam dari smartphone. Notifikasi otomatis jika ada anomali lingkungan atau kebutuhan nutrisi." },
  { icon: "🤖", title: "Smart Automation", desc: "Jadwal penyiraman dan pemupukan otomatis berbasis data sensor. AI membantu pengambilan keputusan bertani." },
  { icon: "🧪", title: "Nutrisi AB Mix Presisi", desc: "Formulasi pupuk AB Mix dihitung akurat sesuai kebutuhan setiap fase pertumbuhan tanaman melon premium." },
  { icon: "☀️", title: "Greenhouse Modern", desc: "Atap HDPE UV stabilized melindungi tanaman dari hujan deras dan sinar UV berlebih, menjaga kualitas buah optimal." },
];

const TIMELINE: TimelineItem[] = [
  { step: "01", title: "Pembibitan", desc: "Benih premium diseleksi ketat dan disemai di tray pembibitan menggunakan media cocopeat steril selama 7–10 hari hingga bibit kuat dan siap tanam.", color: "bg-green-500" },
  { step: "02", title: "Penanaman Polibag", desc: "Bibit dipindah ke polibag dengan media tanam murni cocopeat tanpa campuran. Nutrisi AB Mix diberikan langsung melalui sistem tetes.", color: "bg-emerald-500" },
  { step: "03", title: "Pemeliharaan", desc: "Pemangkasan tunas lateral, penyerbukan manual bunga betina, dan monitoring harian kondisi tanaman via aplikasi smart farming.", color: "bg-teal-500" },
  { step: "04", title: "Pembuahan", desc: "Buah digantung dengan net jaring untuk menjaga bentuk sempurna. Monitoring kadar gula (brix) dilakukan berkala setiap minggu.", color: "bg-cyan-500" },
  { step: "05", title: "Panen", desc: "Buah dipanen tepat saat brix ≥14°Bx (Lavender hari ke-65, Skidrow & Honeyglobe hari ke-55–60). Dikemas higienis siap distribusi.", color: "bg-blue-500" },
];

// ─── Smooth Scroll Helper ────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("#hero")}>
            <span className="text-2xl">🍈</span>
            <div>
              <p className={`font-bold text-sm leading-none transition-colors ${scrolled ? "text-green-700" : "text-white"}`}>Greenhouse Melon</p>
              <p className={`font-black text-lg leading-none transition-colors ${scrolled ? "text-gray-900" : "text-white"}`}>AGROGONTA</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-green-100 hover:text-green-700 ${scrolled ? "text-gray-700" : "text-white hover:bg-white/20 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
            <Link href="/login">
              <button className="ml-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg">
                Dashboard
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden p-2 rounded-lg" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${scrolled ? "bg-gray-800" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${scrolled ? "bg-gray-800" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-0.5 transition-all ${scrolled ? "bg-gray-800" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl mb-4 overflow-hidden">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => { scrollTo(item.href); setMenuOpen(false); }}
                className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium border-b border-gray-50 last:border-0"
              >
                {item.label}
              </button>
            ))}
            <Link href="/login">
              <button className="block w-full text-left px-6 py-3 text-green-700 font-semibold bg-green-50">
                🚀 Dashboard
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-green-900 via-emerald-800 to-teal-900" />
      <div className="absolute inset-0 opacity-30"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #22c55e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #10b981 0%, transparent 50%), radial-gradient(circle at 60% 80%, #14b8a6 0%, transparent 40%)" }}
      />
      {/* Floating Particles */}
      {["🍈", "🌱", "💧", "☀️", "🌿"].map((emoji, i) => (
        <span key={i} className="absolute text-2xl opacity-20 animate-bounce select-none pointer-events-none"
          style={{ left: `${10 + i * 18}%`, top: `${20 + (i % 3) * 20}%`, animationDelay: `${i * 0.5}s`, animationDuration: `${3 + i}s` }}>
          {emoji}
        </span>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6 text-white text-sm font-medium">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Smart Greenhouse Farming • Sistem Polibag Drip
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
          Melon Premium
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-green-300 via-emerald-200 to-teal-300">
            Kualitas Terbaik
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
          Kami menghadirkan melon premium berkualitas tinggi yang ditanam dalam greenhouse modern
          dengan teknologi <strong>Smart Farming</strong> dan sistem irigasi tetes polibag —
          menghasilkan buah manis, sehat, dan konsisten sepanjang tahun.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo("#varieties")}
            className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-green-500/30 hover:-translate-y-1 text-lg"
          >
            🍈 Lihat Varietas Kami
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/30 backdrop-blur-sm transition-all hover:-translate-y-1 text-lg"
          >
            📞 Hubungi Kami
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="bg-green-700 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl mb-1">{s.icon}</span>
              <span className="text-3xl font-black">{s.value}</span>
              <span className="text-green-200 text-sm font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ───────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block bg-green-100 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Tentang Kami
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Greenhouse Melon Premium
              <span className="text-green-600"> di Jantung Pertanian Modern</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Kami adalah petani melon premium yang berkomitmen menghadirkan buah berkualitas tinggi
              melalui pendekatan <strong>smart farming</strong> berbasis teknologi IoT dan sistem
              irigasi tetes (drip irrigation) pada polibag.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Dengan greenhouse modern yang dilengkapi sensor lingkungan otomatis, setiap tanaman
              mendapat perhatian individual — memastikan kualitas rasa, ukuran, dan kandungan gula
              yang konsisten di setiap panen.
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "📍", label: "Lokasi", value: "Gondangwetan, Pasuruan" },
                { icon: "🏗️", label: "Luas Greenhouse", value: "± 168 m²" },
                { icon: "🌡️", label: "Suhu Optimal", value: "28–32°C" },
                { icon: "💧", label: "Metode Tanam", value: "Drip Polibag Cocopeat" },
              ].map((info) => (
                <div key={info.label} className="bg-gray-50 rounded-2xl p-4">
                  <span className="text-2xl">{info.icon}</span>
                  <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wide">{info.label}</p>
                  <p className="text-gray-800 font-bold mt-0.5">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="bg-linear-to-br from-green-100 to-emerald-200 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-green-300/40 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-300/40 rounded-full" />
              <div className="relative z-10 text-center">
                <span className="text-9xl">🍈</span>
                <h3 className="text-2xl font-black text-green-800 mt-4 mb-2">AGROGONTA</h3>
                <p className="text-green-700 font-medium">Greenhouse Melon Premium Pasuruan</p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {["IoT Sensors", "AI Analytics", "Auto Irrigation", "Climate Control"].map((tag) => (
                    <span key={tag} className="bg-green-700 text-white text-xs px-3 py-1 rounded-full font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <span className="text-2xl">🌡️</span>
              <div>
                <p className="text-xs text-gray-500">Suhu Greenhouse</p>
                <p className="font-black text-gray-800">30°C ✓ Optimal</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <span className="text-2xl">💧</span>
              <div>
                <p className="text-xs text-gray-500">Kelembaban</p>
                <p className="font-black text-gray-800">70% ✓ Ideal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Varieties Section ───────────────────────────────────────────────────────
function VarietiesSection() {
  return (
    <section id="varieties" className="py-20 lg:py-28 bg-linear-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-green-100 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Koleksi Varietas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Melon Premium Pilihan Kami
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tiga varietas melon unggulan yang ditanam dengan metode smart farming untuk menghasilkan
            rasa terbaik dan kualitas premium.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {MELON_VARIETIES.map((variety) => (
            <div key={variety.name} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              {/* Card Header */}
              <div className={`bg-linear-to-br ${variety.color} p-8 text-center relative overflow-hidden`}>
                <div className="absolute top-3 right-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                    {variety.badge}
                  </span>
                </div>
                <span className="text-7xl block mb-3 group-hover:scale-110 transition-transform duration-300">{variety.emoji}</span>
                <h3 className="text-2xl font-black text-white">Melon {variety.name}</h3>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">{variety.desc}</p>

                <div className="space-y-3">
                  {[
                    { label: "Berat Buah", value: variety.weight, icon: "⚖️" },
                    { label: "Masa Panen", value: variety.days, icon: "📅" },
                    { label: "Rasa", value: variety.taste, icon: "🍬" },
                  ].map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-500 text-sm flex items-center gap-2">
                        <span>{spec.icon}</span>{spec.label}
                      </span>
                      <span className="font-bold text-gray-800 text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollTo("#contact")}
                  className={`mt-6 w-full py-3 bg-linear-to-r ${variety.color} text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-md hover:shadow-lg`}
                >
                  Pesan Sekarang →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Technology Section ──────────────────────────────────────────────────────
function TechnologySection() {
  return (
    <section id="technology" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Teknologi Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Smart Farming Berbasis IoT
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Kombinasi greenhouse modern dan teknologi digital untuk hasil panen yang optimal, konsisten, dan efisien.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {FEATURES.map((feat) => (
            <div key={feat.title} className="group p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-green-100 group-hover:bg-green-200 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-colors">
                {feat.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{feat.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="bg-linear-to-br from-green-900 to-emerald-900 rounded-3xl p-8 lg:p-12">
          <h3 className="text-2xl font-black text-white text-center mb-10">
            🌱 Proses Budidaya Melon Premium
          </h3>
          <div className="relative">
            {/* Line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-white/20" style={{ left: "5%", right: "5%" }} />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {TIMELINE.map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center relative">
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white font-black text-xl mb-4 shadow-lg z-10`}>
                    {item.step}
                  </div>
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-green-200 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Section (Simulated) ─────────────────────────────────────────────
function GallerySection() {
  const items = [
    { emoji: "�", label: "Melon Lavender — Kuning Lonjong Berjaring", bg: "from-yellow-300 to-yellow-500" },
    { emoji: "🌱", label: "Pembibitan Tray Cocopeat", bg: "from-green-200 to-emerald-400" },
    { emoji: "🏗️", label: "Greenhouse Drip Polibag", bg: "from-teal-200 to-cyan-400" },
    { emoji: "🍈", label: "Melon Skidrow — Bulat Bermotif Corak", bg: "from-green-300 to-green-500" },
    { emoji: "📱", label: "Monitoring Smart Farming Real-time", bg: "from-blue-200 to-indigo-400" },
    { emoji: "�", label: "Melon Honeyglobe — Bulat Polos Manis", bg: "from-lime-300 to-green-500" },
  ];

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-100 text-yellow-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Galeri
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Dari Kebun Kami Untuk Anda
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Setiap buah melon yang kami hasilkan adalah hasil kerja keras dan dedikasi penuh dalam merawat tanaman.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {items.map((item, i) => (
            <div key={i} className={`bg-linear-to-br ${item.bg} rounded-2xl lg:rounded-3xl aspect-square flex flex-col items-center justify-center gap-3 hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-md hover:shadow-xl`}>
              <span className="text-5xl lg:text-7xl">{item.emoji}</span>
              <span className="text-white font-bold text-xs lg:text-sm text-center px-4">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Location Section ─────────────────────────────────────────────────────────
function LocationSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Lokasi Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
              Kunjungi Greenhouse Kami
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Kami membuka kunjungan bagi mitra, petani, dan masyarakat yang ingin belajar tentang
              budidaya melon premium dengan sistem smart farming.
            </p>

            <div className="space-y-5">
              {[
                { icon: "📍", title: "Alamat", value: "Jalan Raya Wonosari, Kec. Gondangwetan, Kab. Pasuruan, Jawa Timur 67174" },
                { icon: "🕐", title: "Jam Kunjungan", value: "Senin – Sabtu, 08.00 – 16.00 WIB" },
                { icon: "📞", title: "Telepon / WhatsApp", value: "+62 856-5502-1997" },
                { icon: "📧", title: "Email", value: "agrogonta@gmail.com" },
                { icon: "📸", title: "Instagram", value: "@agrogonta" },
              ].map((info) => (
                <div key={info.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">{info.title}</p>
                    <p className="text-gray-800 font-medium mt-0.5">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-linear-to-br from-green-100 to-emerald-200 rounded-3xl overflow-hidden shadow-xl aspect-video lg:aspect-square flex flex-col items-center justify-center text-center p-8">
            <span className="text-8xl mb-4">📍</span>
            <h3 className="text-xl font-black text-green-800 mb-2">Greenhouse AGROGONTA</h3>
            <p className="text-green-700 font-medium mb-1">Jl. Raya Wonosari, Gondangwetan</p>
            <p className="text-green-600 text-sm mb-6">Kab. Pasuruan, Jawa Timur 67174</p>
            <a
              href="https://maps.google.com/?q=Gondangwetan,Pasuruan,Jawa+Timur"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-md"
            >
              🗺️ Buka di Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WhatsApp Deep Link
    const text = encodeURIComponent(
      `Halo AGROGONTA! 🍈\n\nNama: ${form.name}\nTelepon: ${form.phone}\nEmail: ${form.email}\nKeperluan: ${form.subject}\n\nPesan:\n${form.message}`
    );
    window.open(`https://wa.me/6285655021997?text=${text}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-linear-to-br from-green-900 to-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-white/10 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide border border-white/20">
            Hubungi Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Tertarik dengan Melon Premium AGROGONTA?
          </h2>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Hubungi kami untuk pemesanan, kerjasama, kunjungan kebun, atau sekadar bertanya seputar budidaya melon.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Cards */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">Cara Menghubungi Kami</h3>
            {[
              { icon: "💬", label: "WhatsApp", value: "+62 856-5502-1997", sub: "Respon cepat, siap membantu", href: "https://wa.me/6285655021997", cta: "Chat Sekarang" },
              { icon: "📞", label: "Telepon", value: "+62 856-5502-1997", sub: "Senin – Sabtu, 08.00 – 17.00 WIB", href: "tel:+6285655021997", cta: "Telepon" },
              { icon: "📧", label: "Email", value: "agrogonta@gmail.com", sub: "Balasan dalam 1×24 jam", href: "mailto:agrogonta@gmail.com", cta: "Kirim Email" },
              { icon: "📸", label: "Instagram", value: "@agrogonta", sub: "Update terbaru dari kebun kami", href: "https://instagram.com/agrogonta", cta: "Follow" },
            ].map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all group">
                <div className="w-14 h-14 bg-green-500/30 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-green-500/50 transition-colors">
                  {c.icon}
                </div>
                <div className="flex-1">
                  <p className="text-green-300 text-xs font-bold uppercase tracking-wide">{c.label}</p>
                  <p className="text-white font-bold">{c.value}</p>
                  <p className="text-green-300 text-xs">{c.sub}</p>
                </div>
                <span className="text-white/40 group-hover:text-white transition-colors text-sm font-medium">{c.cta} →</span>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Kirim Pesan</h3>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <span className="text-6xl mb-4">✅</span>
                <h4 className="text-white font-black text-xl mb-2">Pesan Terkirim!</h4>
                <p className="text-green-200">Membuka WhatsApp... Kami akan segera merespons.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-green-200 text-xs font-bold uppercase tracking-wide block mb-1.5">Nama Lengkap *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nama Anda"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="text-green-200 text-xs font-bold uppercase tracking-wide block mb-1.5">No. WhatsApp *</label>
                    <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="08xx-xxxx-xxxx"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 transition-colors text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-green-200 text-xs font-bold uppercase tracking-wide block mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@anda.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 transition-colors text-sm" />
                </div>
                <div>
                  <label className="text-green-200 text-xs font-bold uppercase tracking-wide block mb-1.5">Keperluan *</label>
                  <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors text-sm appearance-none">
                    <option value="" className="bg-green-900">Pilih keperluan...</option>
                    <option value="Pemesanan Melon" className="bg-green-900">Pemesanan Melon</option>
                    <option value="Kerjasama / Reseller" className="bg-green-900">Kerjasama / Reseller</option>
                    <option value="Kunjungan Kebun" className="bg-green-900">Kunjungan Kebun</option>
                    <option value="Konsultasi Budidaya" className="bg-green-900">Konsultasi Budidaya</option>
                    <option value="Lainnya" className="bg-green-900">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="text-green-200 text-xs font-bold uppercase tracking-wide block mb-1.5">Pesan *</label>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tuliskan pesan Anda di sini..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 transition-colors text-sm resize-none" />
                </div>
                <button type="submit"
                  className="w-full py-4 bg-green-500 hover:bg-green-400 text-white font-black rounded-xl transition-all shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 text-base">
                  💬 Kirim via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍈</span>
              <div>
                <p className="text-green-400 font-bold text-sm leading-none">Greenhouse Melon</p>
                <p className="text-white font-black text-xl leading-none">AGROGONTA</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Melon premium berkualitas tinggi dari greenhouse modern dengan teknologi smart farming
              dan sistem irigasi tetes polibag cocopeat.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: "💬", href: "https://wa.me/6285655021997", label: "WhatsApp" },
                { icon: "📸", href: "https://instagram.com/agrogonta", label: "Instagram" },
                { icon: "📧", href: "mailto:agrogonta@gmail.com", label: "Email" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-700 rounded-xl flex items-center justify-center text-lg transition-colors" title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Navigasi</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <button onClick={() => scrollTo(item.href)} className="text-gray-500 hover:text-green-400 text-sm transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Varieties */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Varietas</h4>
            <ul className="space-y-2">
              {MELON_VARIETIES.map((v) => (
                <li key={v.name}>
                  <button onClick={() => scrollTo("#varieties")} className="text-gray-500 hover:text-green-400 text-sm transition-colors flex items-center gap-2">
                    <span>{v.emoji}</span> Melon {v.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-wide">Lokasi</h4>
              <p className="text-gray-500 text-sm">📍 Gondangwetan, Kab. Pasuruan</p>
              <p className="text-gray-500 text-sm">Jawa Timur 67174</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-600">© 2026 AGROGONTA. All rights reserved.</p>
          <p className="text-gray-600 flex items-center gap-1">
            Dibuat dengan <span className="text-red-500">❤️</span> untuk petani Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="antialiased">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <VarietiesSection />
      <TechnologySection />
      <GallerySection />
      <LocationSection />
      <ContactSection />
      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/6285655021997"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/40 transition-all hover:scale-110"
        title="Chat WhatsApp"
      >
        <span className="text-2xl">💬</span>
      </a>
    </main>
  );
}

