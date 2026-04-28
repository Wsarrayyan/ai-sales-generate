"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEye, FiEdit2, FiTrash2, FiDownload, FiClock } from "react-icons/fi";

interface Props {
  page: {
    id: string;
    title: string;
    slug: string;
    status: string;
    productName: string;
    template: string;
    price: string;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

const templateColors: Record<string, string> = {
  modern: "text-brand-400",
  bold: "text-red-400",
  minimal: "text-indigo-400",
  luxury: "text-yellow-400",
};

export function SalesPageCard({ page }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Hapus "${page.productName}"? Tindakan ini tidak bisa dibatalkan.`)) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/sales-pages/${page.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Sales page dihapus");
        router.refresh();
      } else {
        toast.error("Gagal menghapus");
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setDeleting(false);
    }
  };

  const handleExport = () => {
    window.open(`/api/sales-pages/${page.id}/export`, "_blank");
  };

  const timeAgo = (date: Date) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Baru saja";
    if (hours < 24) return `${hours} jam lalu`;
    return `${Math.floor(hours / 24)} hari lalu`;
  };

  return (
    <div className="card group hover:border-dark-400 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium uppercase tracking-wide ${templateColors[page.template] || "text-white/40"}`}>
              {page.template}
            </span>
            <span className={page.status === "published" ? "badge-published" : "badge-draft"}>
              {page.status === "published" ? "Published" : "Draft"}
            </span>
          </div>
          <h3 className="font-semibold text-sm truncate">{page.productName}</h3>
          <p className="text-xs text-white/40 mt-0.5 line-clamp-2 leading-relaxed">{page.title}</p>
        </div>
      </div>

      {/* Price */}
      <div className="bg-dark-700 rounded-lg px-3 py-2 mb-4">
        <span className="text-lg font-bold text-brand-400">{page.currency} {page.price}</span>
      </div>

      {/* Time */}
      <div className="flex items-center gap-1.5 text-xs text-white/30 mb-4">
        <FiClock className="w-3 h-3" />
        <span>Diperbarui {timeAgo(page.updatedAt)}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/dashboard/${page.id}`}
          className="flex-1 btn-secondary justify-center text-sm py-2"
        >
          <FiEye className="w-3.5 h-3.5" />
          Preview
        </Link>
        <Link
          href={`/dashboard/${page.id}/edit`}
          className="btn-ghost text-sm py-2 px-3"
        >
          <FiEdit2 className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={handleExport}
          className="btn-ghost text-sm py-2 px-3"
          title="Export HTML"
        >
          <FiDownload className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="btn-ghost text-red-400 hover:text-red-300 text-sm py-2 px-3 disabled:opacity-50"
        >
          <FiTrash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
