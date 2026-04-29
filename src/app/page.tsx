import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { FiZap, FiSave, FiEye, FiDownload, FiArrowRight, FiCheck } from "react-icons/fi";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="page-container relative text-center">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 text-brand-400 text-sm font-medium px-4 py-1.5 rounded-full mb-8 animate-fade-in">
            <FiZap className="w-3.5 h-3.5" />
            Powered by AI
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-black leading-tight mb-6 animate-slide-up text-balance">
            Buat Sales Page{" "}
            <span className="gradient-text">Berkualitas Tinggi</span>
            <br />dalam Hitungan Detik
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 animate-slide-up animation-delay-100">
            Ubah informasi produk Anda menjadi halaman penjualan yang menarik,
            persuasif, dan siap konversi — tanpa perlu keahlian copywriting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-200">
            <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">
              <FiZap className="w-5 h-5" />
              Coba Gratis Sekarang
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/auth/login" className="btn-secondary text-lg px-8 py-4">
              Sudah punya akun? Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-dark-700">
        <div className="page-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              Semua yang Anda Butuhkan
            </h2>
            <p className="text-white/50 text-lg">
              Fitur lengkap untuk membuat sales page profesional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FiZap />,
                title: "AI Generation",
                desc: "Headline, copywriting, benefit, dan CTA dibuat otomatis oleh AI",
              },
              {
                icon: <FiEye />,
                title: "Live Preview",
                desc: "Lihat hasil langsung dalam layout landing page yang nyata",
              },
              {
                icon: <FiSave />,
                title: "Simpan & Kelola",
                desc: "Semua sales page tersimpan — edit, hapus, atau regenerate kapan saja",
              },
              {
                icon: <FiDownload />,
                title: "Export HTML",
                desc: "Download sebagai file HTML standalone siap deploy",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="card hover:border-brand-500/50 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-brand-500/15 text-brand-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-500/25 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/50">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="page-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              3 Langkah Mudah
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { num: "01", title: "Isi Informasi Produk", desc: "Masukkan nama, deskripsi, fitur, dan target audience produk Anda" },
              { num: "02", title: "Klik Generate", desc: "AI kami akan membuat sales page lengkap dalam beberapa detik" },
              { num: "03", title: "Preview & Publish", desc: "Lihat hasilnya, edit jika perlu, dan download atau publish" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-display font-black text-brand-500/20 mb-4">{s.num}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="page-container">
          <div className="relative bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            <h2 className="text-4xl font-display font-black mb-4 relative">
              Siap Buat Sales Page Pertama Anda?
            </h2>
            <p className="text-white/80 mb-8 text-lg relative">
              Daftar gratis dan buat sales page profesional dalam 60 detik
            </p>
            <Link href="/auth/register" className="inline-flex items-center gap-2 bg-white text-brand-600 font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors relative">
              <FiZap className="w-5 h-5" />
              Mulai Sekarang — Gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700 py-8">
        <div className="page-container text-center text-white/30 text-sm">
          <p>© {new Date().getFullYear()} SalesForge AI. Built for PT Dakwah Digital Network.</p>
        </div>
      </footer>
    </div>
  );
}
