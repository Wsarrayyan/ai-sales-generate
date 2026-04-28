import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FiZap, FiPlus, FiFileText, FiClock } from "react-icons/fi";
import { SalesPageCard } from "@/components/sales-page/SalesPageCard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const pages = await prisma.salesPage.findMany({
    where: { userId: session!.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      productName: true,
      template: true,
      price: true,
      currency: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">
            Selamat datang, {session?.user?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-white/50 mt-1">Kelola semua sales page Anda di sini</p>
        </div>
        <Link href="/dashboard/new" className="btn-primary">
          <FiPlus className="w-4 h-4" />
          Buat Sales Page Baru
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <FiFileText />, label: "Total Pages", value: pages.length },
          { icon: <FiZap />, label: "Published", value: pages.filter(p => p.status === "published").length },
          { icon: <FiClock />, label: "Draft", value: pages.filter(p => p.status === "draft").length },
        ].map((s, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-500/15 text-brand-400 rounded-lg flex items-center justify-center flex-shrink-0">
              {s.icon}
            </div>
            <div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-white/40">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pages Grid */}
      {pages.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-dark-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiZap className="w-8 h-8 text-white/20" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Belum ada sales page</h3>
          <p className="text-white/40 mb-6">
            Buat sales page pertama Anda dengan AI dalam beberapa detik
          </p>
          <Link href="/dashboard/new" className="btn-primary">
            <FiPlus className="w-4 h-4" />
            Buat Sales Page Pertama
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <SalesPageCard key={page.id} page={page as any} />
          ))}
        </div>
      )}
    </div>
  );
}
