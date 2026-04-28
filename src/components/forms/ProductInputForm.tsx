"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiZap, FiPlus, FiX } from "react-icons/fi";
import { AILoadingOverlay } from "@/components/ui/AILoadingOverlay";

interface Props {
  defaultValues?: {
    productName?: string;
    description?: string;
    features?: string[];
    targetAudience?: string;
    price?: string;
    currency?: string;
    sellingPoints?: string;
    template?: string;
    language?: string;
  };
  pageId?: string;
}

const TEMPLATES = [
  { value: "modern", label: "Modern", desc: "Clean & professional", color: "bg-brand-500" },
  { value: "bold", label: "Bold", desc: "High energy & impact", color: "bg-red-500" },
  { value: "minimal", label: "Minimal", desc: "Elegant simplicity", color: "bg-indigo-500" },
  { value: "luxury", label: "Luxury", desc: "Premium & refined", color: "bg-yellow-500" },
];

const CURRENCIES = ["IDR", "USD", "MYR", "SGD", "EUR"];

const LANGUAGES = [
  { value: "id", label: "🇮🇩 Indonesia", desc: "Bahasa Indonesia" },
  { value: "en", label: "🇬🇧 English", desc: "English" },
  { value: "ms", label: "🇲🇾 Melayu", desc: "Bahasa Melayu" },
];

export function ProductInputForm({ defaultValues, pageId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<"analyzing" | "translating" | "generating" | "finalizing">("analyzing");
  const [featureInput, setFeatureInput] = useState("");
  const [form, setForm] = useState({
    productName: defaultValues?.productName || "",
    description: defaultValues?.description || "",
    features: defaultValues?.features || [] as string[],
    targetAudience: defaultValues?.targetAudience || "",
    price: defaultValues?.price || "",
    currency: defaultValues?.currency || "IDR",
    sellingPoints: defaultValues?.sellingPoints || "",
    template: defaultValues?.template || "modern",
    language: defaultValues?.language || "id",
  });

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed || form.features.includes(trimmed)) return;
    setForm({ ...form, features: [...form.features, trimmed] });
    setFeatureInput("");
  };

  const removeFeature = (idx: number) => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== idx) });
  };

  const handleFeatureKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); addFeature(); }
    if (e.key === ",") { e.preventDefault(); addFeature(); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.features.length === 0) {
      toast.error("Tambahkan minimal 1 fitur produk");
      return;
    }

    setLoading(true);
    setLoadingStage("analyzing");

    try {
      // Stage 1: Analyzing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoadingStage("translating");

      // Stage 2: Translating (if needed)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoadingStage("generating");

      // Stage 3: Generating
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, pageId }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal generate");
        return;
      }

      // Stage 4: Finalizing
      setLoadingStage("finalizing");
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Show warning if demo mode
      if (data.isDemoMode) {
        toast(data.warning, {
          icon: "⚠️",
          duration: 5000,
          style: {
            background: "#fb923c",
            color: "#fff",
          },
        });
      } else {
        toast.success("Sales page berhasil dibuat!");
      }

      router.push(`/dashboard/${data.page.id}`);
    } catch (error) {
      console.error("Generate error:", error);
      toast.error("Terjadi kesalahan saat generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* AI Loading Overlay */}
      <AILoadingOverlay isOpen={loading} stage={loadingStage} />

      <form onSubmit={handleSubmit} className="space-y-8">
      {/* Product Info */}
      <div className="card space-y-5">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <span className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center text-xs font-bold">1</span>
          Informasi Produk
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="label">Nama Produk / Layanan *</label>
            <input
              type="text"
              className="input"
              placeholder="cth: Kursus Digital Marketing Pro"
              value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="label">Target Audience *</label>
            <input
              type="text"
              className="input"
              placeholder="cth: UMKM yang ingin go digital"
              value={form.targetAudience}
              onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="label">Deskripsi Produk *</label>
          <textarea
            className="input min-h-[120px] resize-y"
            placeholder="Jelaskan produk/layanan Anda secara detail. Apa yang ditawarkan? Apa masalah yang diselesaikan?"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="label">Unique Selling Points</label>
          <textarea
            className="input min-h-[80px] resize-y"
            placeholder="Apa yang membuat produk ini berbeda dari kompetitor? Keunggulan apa yang dimiliki?"
            value={form.sellingPoints}
            onChange={(e) => setForm({ ...form, sellingPoints: e.target.value })}
          />
        </div>
      </div>

      {/* Features */}
      <div className="card space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <span className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center text-xs font-bold">2</span>
          Fitur Produk
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            className="input flex-1"
            placeholder="Tambah fitur (Enter atau koma untuk memisahkan)"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={handleFeatureKeydown}
          />
          <button type="button" onClick={addFeature} className="btn-secondary px-4">
            <FiPlus className="w-4 h-4" />
          </button>
        </div>

        {form.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.features.map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 bg-dark-700 text-sm px-3 py-1.5 rounded-lg border border-dark-500">
                {f}
                <button type="button" onClick={() => removeFeature(i)} className="text-white/30 hover:text-white/70">
                  <FiX className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="card space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <span className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center text-xs font-bold">3</span>
          Harga
        </h2>

        <div className="flex gap-3">
          <div className="w-32">
            <label className="label">Mata Uang</label>
            <select
              className="input"
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="label">Harga *</label>
            <input
              type="text"
              className="input"
              placeholder="cth: 497.000 atau 99/bulan"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      {/* Template */}
      <div className="card space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <span className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center text-xs font-bold">4</span>
          Template Design
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setForm({ ...form, template: t.value })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                form.template === t.value
                  ? "border-brand-500 bg-brand-500/10"
                  : "border-dark-500 hover:border-dark-400"
              }`}
            >
              <div className={`w-8 h-8 ${t.color} rounded-lg mb-2`} />
              <div className="font-semibold text-sm">{t.label}</div>
              <div className="text-xs text-white/40 mt-0.5">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Language Selection */}
      <div className="card space-y-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <span className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center text-xs font-bold">5</span>
          Bahasa Output
        </h2>
        
        <div className="bg-brand-500/10 border border-brand-500/30 rounded-lg p-4 mb-4">
          <p className="text-sm text-brand-300">
            💡 <strong>Auto-Translation:</strong> Pilih bahasa output yang diinginkan. 
            Jika Anda mengisi form dalam bahasa lain, AI akan otomatis menerjemahkan ke bahasa yang dipilih.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.value}
              type="button"
              onClick={() => setForm({ ...form, language: lang.value })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                form.language === lang.value
                  ? "border-brand-500 bg-brand-500/10"
                  : "border-dark-500 hover:border-dark-400"
              }`}
            >
              <div className="font-semibold text-base mb-1">{lang.label}</div>
              <div className="text-xs text-white/40">{lang.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary justify-center py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-3">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            AI sedang membuat sales page Anda...
          </span>
        ) : (
          <>
            <FiZap className="w-5 h-5" />
            {pageId ? "Regenerate Sales Page" : "Generate Sales Page dengan AI"}
          </>
        )}
      </button>
    </form>
    </>
  );
}
