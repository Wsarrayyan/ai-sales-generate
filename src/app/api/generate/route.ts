import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSalesPage, generateSlug } from "@/lib/ai";
import { ProductInput, GeneratedSalesPage } from "@/types";

// Language-specific templates untuk DEMO mode
const LANGUAGE_TEMPLATES = {
  id: {
    headline: (productName: string) => `Transformasi Hidup Anda dengan ${productName}`,
    subHeadline: (targetAudience: string) => `Solusi terbaik untuk ${targetAudience} yang ingin mencapai lebih banyak`,
    productDescription: (productName: string, targetAudience: string, description: string) => 
      `${productName} dirancang khusus untuk ${targetAudience}. ${description}`,
    benefits: [
      {
        icon: "⚡",
        title: "Hasil Cepat & Instan",
        description: "Lihat peningkatan langsung dalam workflow dan produktivitas Anda",
      },
      {
        icon: "🎯",
        title: "Target yang Presisi",
        description: "Jangkau target audience Anda dengan akurasi yang tepat sasaran",
      },
      {
        icon: "💎",
        title: "Kualitas Premium",
        description: "Dibangun dengan standar tertinggi dan perhatian pada detail",
      },
      {
        icon: "🚀",
        title: "Pertumbuhan Pesat",
        description: "Skalakan kesuksesan Anda lebih cepat dari yang Anda bayangkan",
      },
    ],
    testimonials: [
      {
        name: "Sarah Wijaya",
        role: "Pemilik Bisnis",
        testimonial: (productName: string) => `${productName} benar-benar mengubah cara saya bekerja. Hasilnya langsung terlihat dan mengesankan!`,
      },
      {
        name: "Michael Tan",
        role: "Direktur Marketing",
        testimonial: "Investasi terbaik yang saya buat tahun ini. Sangat merekomendasikan untuk siapa saja yang serius ingin berkembang.",
      },
      {
        name: "Emma Putri",
        role: "Entrepreneur",
        testimonial: "Kualitas dan dukungannya luar biasa. Sangat worth it!",
      },
    ],
    pricing: {
      features: [
        "Akses penuh ke semua fitur",
        "Dukungan pelanggan prioritas",
        "Update reguler termasuk",
        "Garansi uang kembali 30 hari",
      ],
    },
    cta: {
      primaryText: (productName: string) => `Dapatkan ${productName} Sekarang`,
      secondaryText: "Bergabung dengan ribuan pelanggan yang puas",
      urgencyText: "Penawaran terbatas - Ambil kesempatan sekarang!",
    },
    faq: [
      {
        question: "Seberapa cepat saya akan melihat hasilnya?",
        answer: "Sebagian besar pelanggan melihat peningkatan langsung, dengan hasil signifikan dalam minggu pertama penggunaan.",
      },
      {
        question: "Apakah ada garansi uang kembali?",
        answer: "Ya! Kami menawarkan garansi uang kembali 30 hari. Jika Anda tidak puas, kami akan mengembalikan uang Anda.",
      },
      {
        question: "Apakah saya perlu skill teknis?",
        answer: "Tidak sama sekali! Solusi kami dirancang user-friendly dan mudah diakses oleh semua orang.",
      },
      {
        question: "Dukungan apa yang Anda tawarkan?",
        answer: "Kami menyediakan dukungan email prioritas dan dokumentasi lengkap untuk membantu kesuksesan Anda.",
      },
    ],
  },
  en: {
    headline: (productName: string) => `Transform Your Life with ${productName}`,
    subHeadline: (targetAudience: string) => `The ultimate solution for ${targetAudience} who want to achieve more`,
    productDescription: (productName: string, targetAudience: string, description: string) => 
      `${productName} is designed specifically for ${targetAudience}. ${description}`,
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
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Business Owner",
        testimonial: (productName: string) => `${productName} completely transformed how I work. The results were immediate and impressive!`,
      },
      {
        name: "Michael Chen",
        role: "Marketing Director",
        testimonial: "Best investment I've made this year. Highly recommend to anyone serious about growth.",
      },
      {
        name: "Emma Williams",
        role: "Entrepreneur",
        testimonial: "The quality and support are outstanding. Worth every penny!",
      },
    ],
    pricing: {
      features: [
        "Full access to all features",
        "Priority customer support",
        "Regular updates included",
        "30-day money-back guarantee",
      ],
    },
    cta: {
      primaryText: (productName: string) => `Get ${productName} Now`,
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
  },
  ms: {
    headline: (productName: string) => `Transformasi Hidup Anda dengan ${productName}`,
    subHeadline: (targetAudience: string) => `Penyelesaian terbaik untuk ${targetAudience} yang ingin mencapai lebih banyak`,
    productDescription: (productName: string, targetAudience: string, description: string) => 
      `${productName} direka khas untuk ${targetAudience}. ${description}`,
    benefits: [
      {
        icon: "⚡",
        title: "Hasil Pantas & Segera",
        description: "Lihat peningkatan segera dalam aliran kerja dan produktiviti anda",
      },
      {
        icon: "🎯",
        title: "Sasaran yang Tepat",
        description: "Capai sasaran anda dengan ketepatan yang fokus",
      },
      {
        icon: "💎",
        title: "Kualiti Premium",
        description: "Dibina dengan standard tertinggi dan perhatian kepada perincian",
      },
      {
        icon: "🚀",
        title: "Pertumbuhan Pesat",
        description: "Skalakan kejayaan anda lebih pantas daripada yang anda fikirkan",
      },
    ],
    testimonials: [
      {
        name: "Sarah Ahmad",
        role: "Pemilik Perniagaan",
        testimonial: (productName: string) => `${productName} benar-benar mengubah cara saya bekerja. Hasilnya segera dan mengagumkan!`,
      },
      {
        name: "Michael Lim",
        role: "Pengarah Pemasaran",
        testimonial: "Pelaburan terbaik yang saya buat tahun ini. Sangat mengesyorkan untuk sesiapa yang serius mahu berkembang.",
      },
      {
        name: "Emma Zainal",
        role: "Usahawan",
        testimonial: "Kualiti dan sokongannya luar biasa. Sangat berbaloi!",
      },
    ],
    pricing: {
      features: [
        "Akses penuh kepada semua ciri",
        "Sokongan pelanggan keutamaan",
        "Kemas kini berkala termasuk",
        "Jaminan wang kembali 30 hari",
      ],
    },
    cta: {
      primaryText: (productName: string) => `Dapatkan ${productName} Sekarang`,
      secondaryText: "Sertai ribuan pelanggan yang berpuas hati",
      urgencyText: "Tawaran terhad - Ambil peluang sekarang!",
    },
    faq: [
      {
        question: "Berapa pantas saya akan melihat hasilnya?",
        answer: "Kebanyakan pelanggan melihat peningkatan segera, dengan hasil ketara dalam minggu pertama penggunaan.",
      },
      {
        question: "Adakah jaminan wang kembali?",
        answer: "Ya! Kami menawarkan jaminan wang kembali 30 hari. Jika anda tidak berpuas hati, kami akan memulangkan wang anda.",
      },
      {
        question: "Adakah saya perlukan kemahiran teknikal?",
        answer: "Tidak langsung! Penyelesaian kami direka mesra pengguna dan mudah diakses oleh semua orang.",
      },
      {
        question: "Sokongan apa yang anda tawarkan?",
        answer: "Kami menyediakan sokongan e-mel keutamaan dan dokumentasi lengkap untuk membantu kejayaan anda.",
      },
    ],
  },
};

// Helper function untuk generate deskripsi fitur yang lebih spesifik (multi-language)
function generateFeatureDescription(featureTitle: string, productName: string, targetAudience: string, language: "id" | "en" | "ms"): string {
function generateFeatureDescription(featureTitle: string, productName: string, targetAudience: string, language: "id" | "en" | "ms"): string {
  const title = featureTitle.toLowerCase();
  
  // Templates per language
  const languageTemplates = {
    id: [
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
    ],
    en: [
      {
        keywords: ['dasar', 'basic', 'fundamental', 'pengenalan', 'introduction'],
        description: `Learn the essential foundations that will become the basis of your success. This material is specifically designed for ${targetAudience} who want to start right.`
      },
      {
        keywords: ['step', 'langkah', 'tahap', 'tutorial', 'panduan', 'guide'],
        description: `Follow a structured guide that's easy to understand. Each step is explained in detail so you can practice immediately and see results.`
      },
      {
        keywords: ['latihan', 'practice', 'exercise', 'coding', 'praktek'],
        description: `Sharpen your skills with relevant practical exercises. The more you practice, the faster you master the required skills.`
      },
    ],
    ms: [
      {
        keywords: ['dasar', 'basic', 'fundamental', 'pengenalan', 'introduction', 'asas'],
        description: `Pelajari asas penting yang akan menjadi dasar kejayaan anda. Bahan ini direka khas untuk ${targetAudience} yang ingin memulakan dengan betul.`
      },
      {
        keywords: ['step', 'langkah', 'tahap', 'tutorial', 'panduan'],
        description: `Ikuti panduan berstruktur yang mudah difahami. Setiap langkah dijelaskan secara terperinci supaya anda boleh praktik terus dan lihat hasilnya.`
      },
      {
        keywords: ['latihan', 'practice', 'exercise', 'coding', 'praktek'],
        description: `Asah kemahiran anda dengan latihan praktikal yang relevan. Semakin banyak berlatih, semakin cepat anda menguasai kemahiran yang diperlukan.`
      },
    ],
  };

  const templates = languageTemplates[language] || languageTemplates.en;
  
  // Cari template yang cocok berdasarkan keyword
  for (const template of templates) {
    if (template.keywords.some(keyword => title.includes(keyword))) {
      return template.description;
    }
  }
  
  // Default description per language
  const defaultDescriptions = {
    id: `Fitur ${featureTitle} memberikan value signifikan untuk ${targetAudience}. Dengan ini, Anda akan lebih mudah mencapai tujuan dan mendapatkan hasil yang lebih baik.`,
    en: `The ${featureTitle} feature provides significant value for ${targetAudience}. With this, you'll find it easier to achieve your goals and get better results.`,
    ms: `Ciri ${featureTitle} memberikan nilai penting untuk ${targetAudience}. Dengan ini, anda akan lebih mudah mencapai matlamat dan mendapat hasil yang lebih baik.`,
  };
  
  return defaultDescriptions[language] || defaultDescriptions.en;
}

// Mock data untuk demo mode (ketika API key tidak ada credit)
function generateMockSalesPage(input: ProductInput): GeneratedSalesPage {
  const lang = input.language || "id";
  const template = LANGUAGE_TEMPLATES[lang];

  return {
    headline: template.headline(input.productName),
    subHeadline: template.subHeadline(input.targetAudience),
    productDescription: template.productDescription(input.productName, input.targetAudience, input.description),
    benefits: template.benefits,
    features: input.features.map((feature) => ({
      title: feature,
      description: generateFeatureDescription(feature, input.productName, input.targetAudience, lang),
    })),
    socialProof: template.testimonials.map((t, index) => ({
      name: t.name,
      role: t.role,
      testimonial: typeof t.testimonial === 'function' ? t.testimonial(input.productName) : t.testimonial,
      rating: 5,
    })),
    pricing: {
      originalPrice: "",
      currentPrice: input.price,
      currency: input.currency,
      billingPeriod: "one-time",
      features: template.pricing.features,
    },
    cta: {
      primaryText: template.cta.primaryText(input.productName),
      secondaryText: template.cta.secondaryText,
      urgencyText: template.cta.urgencyText,
    },
    faq: template.faq,
  };
}
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
