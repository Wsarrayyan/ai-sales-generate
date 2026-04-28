import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProductInputForm } from "@/components/forms/ProductInputForm";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditSalesPagePage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const { id } = await params;

  const page = await prisma.salesPage.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!page) notFound();

  const features = JSON.parse(page.features);

  return (
    <div className="page-container max-w-3xl">
      <div className="mb-8">
        <Link href={`/dashboard/${page.id}`} className="btn-ghost mb-4 inline-flex">
          <FiArrowLeft className="w-4 h-4" />
          Kembali ke Preview
        </Link>
        <h1 className="text-3xl font-display font-bold">Edit & Regenerate</h1>
        <p className="text-white/50 mt-1">
          Ubah informasi dan AI akan membuat ulang sales page Anda
        </p>
      </div>

      <ProductInputForm
        defaultValues={{
          productName: page.productName,
          description: page.description,
          features,
          targetAudience: page.targetAudience,
          price: page.price,
          currency: page.currency,
          sellingPoints: page.sellingPoints,
          template: page.template,
        }}
        pageId={page.id}
      />
    </div>
  );
}