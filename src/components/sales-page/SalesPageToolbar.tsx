"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiEdit2, FiDownload, FiTrash2, FiExternalLink } from "react-icons/fi";

interface Props {
  page: {
    id: string;
    productName: string;
    template: string;
    status: string;
    slug: string;
  };
}

export function SalesPageToolbar({ page }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Hapus sales page "${page.productName}"?`)) return;

    setDeleting(true);
    const res = await fetch(`/api/sales-pages/${page.id}`, { method: "DELETE" });

    if (res.ok) {
      toast.success("Sales page dihapus");
      router.push("/dashboard");
    } else {
      toast.error("Gagal menghapus");
      setDeleting(false);
    }
  };

  return (
    <div className="sticky top-16 z-40 bg-dark-900/90 backdrop-blur-md border-b border-dark-700 px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="btn-ghost py-1.5 px-3 text-sm">
            <FiArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="h-4 w-px bg-dark-600" />
          <div>
            <span className="font-medium text-sm">{page.productName}</span>
            <span className={`ml-2 badge ${page.status === "published" ? "badge-published" : "badge-draft"}`}>
              {page.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/dashboard/${page.id}/edit`} className="btn-secondary text-sm py-2">
            <FiEdit2 className="w-3.5 h-3.5" />
            Edit
          </Link>
          <a
            href={`/api/sales-pages/${page.id}/export`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm py-2"
          >
            <FiDownload className="w-3.5 h-3.5" />
            Export HTML
          </a>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="btn-ghost text-red-400 hover:text-red-300 text-sm py-2 px-3 disabled:opacity-50"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
