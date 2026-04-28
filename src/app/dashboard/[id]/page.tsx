import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SalesPagePreview } from "@/components/sales-page/SalesPagePreview";
import { SalesPageToolbar } from "@/components/sales-page/SalesPageToolbar";
import { GeneratedSalesPage } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SalesPageDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const { id } = await params;

  const page = await prisma.salesPage.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!page) notFound();

  const content: GeneratedSalesPage = JSON.parse(page.generatedContent);

  return (
    <div>
      <SalesPageToolbar page={page as any} />
      <div className="mt-4 rounded-xl overflow-hidden border border-dark-600 mx-4 lg:mx-8">
        <SalesPagePreview
          content={content}
          productName={page.productName}
          template={page.template}
          price={page.price}
          currency={page.currency}
          language={page.language || "id"}
        />
      </div>
    </div>
  );
}