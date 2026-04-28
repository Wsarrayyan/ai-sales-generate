import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSalesPage, generateSlug } from "@/lib/ai";
import { ProductInput, GeneratedSalesPage } from "@/types";

// Helper function untuk generate deskripsi fitur yang lebih spesifik
function generateFeatureDescription(featureTitle: string, productName: string, targetAudience: string): string {
  const title = featureTitle.toLowerCase();
  
  // Kata kunci dan template deskripsi yang sesuai
  const templates = [
    {
      keywords: ['dasar', 'basic', 'fundamental', 'pengenalan', 'introduction'],
      description: `Pelajari fondasi penting yang akan menjadi dasar kesuksesan Anda. Materi ini dirancang khusus untuk ${targetAudience} yang ingin memulai dengan benar.`
    },
    {
      keywords: ['step', 'langkah', 'tahap', 'tutorial', 'panduan'],
      description: `Ikuti panduan terstruktur yang mudah dipahami. Setiap langkah dijelaskan secara detail sehingga Anda bisa langsung praktik dan melihat hasilnya.`
    },
    {
      keywords: ['latihan', 'practice', 'exercise', 'coding', 'praktek'],
      description: `Asah kemampuan Anda dengan latihan praktis yang relevan. Semakin banyak berlatih, semakin cepat Anda menguasai skill yang dibutuhkan.`
    },
    {
      keywords: ['advanced', 'lanjut', 'expert', 'mahir', 'profesional'],
      description: `Tingkatkan skill Anda ke level berikutnya dengan teknik advanced. Cocok untuk ${targetAudience} yang ingin menjadi expert di bidangnya.`
    },
    {
      keywords: ['project', 'proyek', 'real', 'nyata', 'studi kasus'],
      description: `Terapkan ilmu Anda dalam project nyata yang mencerminkan kondisi sebenarnya. Pengalaman hands-on yang akan memperkuat portfolio Anda.`
    },
    {
      keywords: ['support', 'dukungan', 'bantuan', 'help', 'konsultasi'],
      description: `Dapatkan bantuan langsung dari expert ketika Anda membutuhkannya. Tidak ada pertanyaan yang terlalu kecil atau terlalu besar.`
    },
    {
      keywords: ['akses', 'access', 'lifetime', 'selamanya', 'unlimited'],
      description: `Nikmati akses tanpa batas waktu sehingga Anda bisa belajar sesuai ritme Anda sendiri. Sekali bayar, akses selamanya.`
    },
    {
      keywords: ['sertifikat', 'certificate', 'credential', 'ijazah'],
      description: `Dapatkan sertifikat resmi yang bisa meningkatkan kredibilitas dan membuka peluang karir baru untuk Anda.`
    },
    {
      keywords: ['video', 'visual', 'multimedia', 'animasi'],
      description: `Belajar lebih mudah dengan konten visual berkualitas tinggi. Setiap konsep dijelaskan dengan cara yang engaging dan mudah dipahami.`
    },
    {
      keywords: ['komunitas', 'community', 'forum', 'grup', 'network'],
      description: `Bergabung dengan komunitas ${targetAudience} yang supportif. Berbagi pengalaman, bertanya, dan berkembang bersama.`
    },
    {
      keywords: ['update', 'terbaru', 'latest', 'new', 'modern'],
      description: `Selalu mendapatkan materi terbaru dan update reguler. Pastikan skill Anda tetap relevan dengan perkembangan industri.`
    },
    {
      keywords: ['template', 'boilerplate', 'starter', 'framework'],
      description: `Hemat waktu dengan template siap pakai yang bisa langsung Anda customize. Fokus pada hasil, bukan setup.`
    },
    {
      keywords: ['tool', 'alat', 'software', 'aplikasi', 'platform'],
      description: `Manfaatkan tools powerful yang akan mempercepat workflow Anda. Otomatisasi tugas repetitif dan fokus pada hal yang lebih penting.`
    },
    {
      keywords: ['strategi', 'strategy', 'metode', 'teknik', 'cara'],
      description: `Pelajari strategi proven yang sudah terbukti berhasil. Tidak perlu trial & error, langsung terapkan yang sudah teruji.`
    },
    {
      keywords: ['optimization', 'optimasi', 'improve', 'tingkatkan', 'maksimalkan'],
      description: `Optimalkan performa dan hasil Anda dengan teknik yang tepat. Dapatkan output maksimal dengan effort yang lebih efisien.`
    },
  ];
  
  // Cari template yang cocok berdasarkan keyword
  for (const template of templates) {
    if (template.keywords.some(keyword => title.includes(keyword))) {
      return template.description;
    }
  }
  
  // Default description jika tidak ada keyword yang cocok
  return `Fitur ${featureTitle} memberikan value signifikan untuk ${targetAudience}. Dengan ini, Anda akan lebih mudah mencapai tujuan dan mendapatkan hasil yang lebih baik.`;
}

// Mock data untuk demo mode (ketika API key tidak ada credit)
function generateMockSalesPage(input: ProductInput): GeneratedSalesPage {
  return {
    headline: `Transform Your Life with ${input.productName}`,
    subHeadline: `The ultimate solution for ${input.targetAudience} who want to achieve more`,
    productDescription: `${input.productName} is designed specifically for ${input.targetAudience}. ${input.description}`,
    benefits: [
      {
        icon: "⚡",
        title: "Lightning Fast Results",
        description: "See immediate improvements in your workflow and productivity",
      },
      {
        icon: "🎯",
        title: "Precision Targeting",
        description: "Reach exactly who you need to reach with laser-focused accuracy",
      },
      {
        icon: "💎",
        title: "Premium Quality",
        description: "Built with the highest standards and attention to detail",
      },
      {
        icon: "🚀",
        title: "Rapid Growth",
        description: "Scale your success faster than you ever thought possible",
      },
    ],
    features: input.features.map((feature) => ({
      title: feature,
      description: generateFeatureDescription(feature, input.productName, input.targetAudience),
    })),
    socialProof: [
      {
        name: "Sarah Johnson",
        role: "Business Owner",
        testimonial: `${input.productName} completely transformed how I work. The results were immediate and impressive!`,
        rating: 5,
      },
      {
        name: "Michael Chen",
        role: "Marketing Director",
        testimonial: "Best investment I've made this year. Highly recommend to anyone serious about growth.",
        rating: 5,
      },
      {
        name: "Emma Williams",
        role: "Entrepreneur",
        testimonial: "The quality and support are outstanding. Worth every penny!",
        rating: 5,
      },
    ],
    pricing: {
      originalPrice: "",
      currentPrice: input.price,
      currency: input.currency,
      billingPeriod: "one-time",
      features: [
        "Full access to all features",
        "Priority customer support",
        "Regular updates included",
        "30-day money-back guarantee",
      ],
    },
    cta: {
      primaryText: `Get ${input.productName} Now`,
      secondaryText: "Join thousands of satisfied customers",
      urgencyText: "Limited time offer - Act now!",
    },
    faq: [
      {
        question: "How quickly will I see results?",
        answer: "Most customers see immediate improvements, with significant results within the first week of use.",
      },
      {
        question: "Is there a money-back guarantee?",
        answer: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your purchase.",
      },
      {
        question: "Do I need any technical skills?",
        answer: "Not at all! Our solution is designed to be user-friendly and accessible to everyone.",
      },
      {
        question: "What kind of support do you offer?",
        answer: "We provide priority email support and comprehensive documentation to help you succeed.",
      },
    ],
  };
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: ProductInput & { pageId?: string; regenerateSection?: string } =
      await req.json();

    const {
      productName,
      description,
      features,
      targetAudience,
      price,
      currency,
      sellingPoints,
      template,
      language,
      pageId,
      regenerateSection,
    } = body;

    if (!productName || !description || !price) {
      return NextResponse.json(
        { error: "Field wajib: productName, description, price" },
        { status: 400 }
      );
    }

    const input: ProductInput = {
      productName,
      description,
      features: Array.isArray(features) ? features : [features],
      targetAudience,
      price,
      currency: currency || "IDR",
      sellingPoints,
      template: template || "modern",
      language: language || "id", // Default to Indonesian
    };

    // Generate content via AI (with fallback to mock if API fails)
    let generatedContent: GeneratedSalesPage;
    
    try {
      generatedContent = await generateSalesPage(input, regenerateSection as any);
    } catch (aiError: any) {
      console.error("AI Generation failed:", aiError.message);
      
      // Check if it's a credit/billing error
      if (aiError.message?.includes("credit balance") || 
          aiError.message?.includes("billing") ||
          aiError.message?.includes("invalid_request_error")) {
        
        console.log("⚠️  Using DEMO mode - AI credit exhausted");
        generatedContent = generateMockSalesPage(input);
        
        // Add warning to the response
        return NextResponse.json({
          warning: "⚠️ DEMO MODE: AI credit habis. Menggunakan template demo. Silakan top up credit Anthropic untuk hasil AI yang sesungguhnya.",
          page: pageId ? await updatePage() : await createPage(),
          generatedContent,
          isDemoMode: true,
        }, { status: pageId ? 200 : 201 });
      }
      
      // If it's another error, throw it
      throw aiError;
    }

    // Helper functions for DRY
    async function updatePage() {
      return await prisma.salesPage.update({
        where: { id: pageId, userId: session.user.id },
        data: {
          productName,
          description,
          features: JSON.stringify(features),
          targetAudience,
          price,
          currency: currency || "IDR",
          sellingPoints,
          template: template || "modern",
          language: language || "id",
          generatedContent: JSON.stringify(generatedContent),
          title: generatedContent.headline,
          updatedAt: new Date(),
        },
      });
    }

    async function createPage() {
      const slug = generateSlug(productName);
      return await prisma.salesPage.create({
        data: {
          userId: session.user.id,
          title: generatedContent.headline,
          slug,
          productName,
          description,
          features: JSON.stringify(features),
          targetAudience,
          price,
          currency: currency || "IDR",
          sellingPoints,
          template: template || "modern",
          language: language || "id",
          generatedContent: JSON.stringify(generatedContent),
        },
      });
    }

    if (pageId) {
      const updated = await updatePage();
      return NextResponse.json({ page: updated, generatedContent });
    }

    const page = await createPage();
    return NextResponse.json({ page, generatedContent }, { status: 201 });
  } catch (error: any) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: error.message || "Gagal generate sales page" },
      { status: 500 }
    );
  }
}
