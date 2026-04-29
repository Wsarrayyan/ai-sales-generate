export interface ProductInput {
  productName: string;
  description: string;
  features: string[];
  targetAudience: string;
  price: string;
  currency: string;
  sellingPoints: string;
  template: "modern" | "bold" | "minimal" | "luxury";
  language: "id" | "en" | "ms"; // Indonesia, English, Malay
}

export interface GeneratedSalesPage {
  translatedProductName?: string; // Optional for backward compatibility
  headline: string;
  subHeadline: string;
  productDescription: string;
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  features: Array<{
    title: string;
    description: string;
  }>;
  socialProof: Array<{
    name: string;
    role: string;
    testimonial: string;
    rating: number;
  }>;
  pricing: {
    originalPrice: string;
    currentPrice: string;
    currency: string;
    billingPeriod: string;
    features: string[];
  };
  cta: {
    primaryText: string;
    secondaryText: string;
    urgencyText: string;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export interface SalesPageData {
  id: string;
  title: string;
  slug: string;
  status: string;
  productName: string;
  description: string;
  features: string[];
  targetAudience: string;
  price: string;
  currency: string;
  sellingPoints: string;
  template: string;
  generatedContent: GeneratedSalesPage;
  createdAt: string;
  updatedAt: string;
}

// NextAuth session extension
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
