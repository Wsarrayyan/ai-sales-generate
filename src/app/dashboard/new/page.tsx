import { ProductInputForm } from "@/components/forms/ProductInputForm";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NewSalesPagePage() {
  return (
    <div className="page-container max-w-3xl">
      <div className="mb-8">
        <Link href="/dashboard" className="btn-ghost mb-4 inline-flex">
          <FiArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>
        <h1 className="text-3xl font-display font-bold">Buat Sales Page Baru</h1>
        <p className="text-white/50 mt-1">
          Isi informasi produk Anda dan AI akan membuat sales page yang menarik
        </p>
      </div>

      <ProductInputForm />
    </div>
  );
}
