import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { ProductInput, GeneratedSalesPage } from "@/types";

// Initialize AI clients
const geminiClient = process.env.GOOGLE_API_KEY 
  ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
  : null;

const groqClient = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

// Helper function to build the prompt
function buildPrompt(input: ProductInput, sectionToRegenerate?: keyof GeneratedSalesPage): string {
  const sectionPrompt = sectionToRegenerate
    ? `Only regenerate the "${sectionToRegenerate}" section. Keep all other content the same.`
    : "Generate all sections.";

  // Language mapping
  const languageNames = {
    id: "Indonesian (Bahasa Indonesia)",
    en: "English",
    ms: "Malay (Bahasa Melayu)",
  };

  const targetLanguage = languageNames[input.language] || languageNames.id;

  return `You are an expert copywriter and marketing strategist. Create a compelling sales page for the following product/service.

Product Information:
- Name: ${input.productName}
- Description: ${input.description}
- Key Features: ${input.features.join(", ")}
- Target Audience: ${input.targetAudience}
- Price: ${input.price} ${input.currency}
- Unique Selling Points: ${input.sellingPoints}

TARGET LANGUAGE: ${targetLanguage}

🚨 CRITICAL LANGUAGE INSTRUCTION - MUST FOLLOW:
- The user has selected ${targetLanguage} as the output language
- **EVERYTHING** must be in ${targetLanguage} - NO EXCEPTIONS
- **TRANSLATE ALL INPUT** to ${targetLanguage} before generating content:
  ✓ Product name → Translate to ${targetLanguage}
  ✓ Feature titles → Translate to ${targetLanguage}
  ✓ Description → Translate to ${targetLanguage}
  ✓ Target audience → Translate to ${targetLanguage}
  ✓ ALL text content → Translate to ${targetLanguage}

TRANSLATION EXAMPLES:
- Input: "Kursus Menggambar Digital" + Target: English → Output: "Digital Drawing Course"
- Input: "Digital Drawing Course" + Target: Indonesian → Output: "Kursus Menggambar Digital"
- Input: "Kue Ultah" + Target: English → Output: "Birthday Cake"
- Input: "Hiburan" + Target: English → Output: "Entertainment"
- Input: "Acara Ultah" + Target: English → Output: "Birthday Party"

🔴 FORBIDDEN:
- DO NOT keep original language if it differs from target
- DO NOT mix languages (e.g., "Kue Ultah" in English content)
- DO NOT use Indonesian words in English output
- DO NOT use English words in Indonesian output

✅ REQUIRED:
- Translate product name to ${targetLanguage}
- Translate ALL feature titles to ${targetLanguage}
- Use natural, native-speaker level ${targetLanguage}
- Maintain meaning while adapting to cultural context

${sectionPrompt}

Respond ONLY with a valid JSON object (no markdown, no backticks) with this exact structure:
{
  "headline": "Main compelling headline in ${targetLanguage} (max 10 words, power words). TRANSLATE product name if needed.",
  "subHeadline": "Supporting headline in ${targetLanguage} (max 20 words)",
  "productDescription": "Engaging 2-3 sentence product description in ${targetLanguage} focused on transformation. TRANSLATE product name if needed.",
  "benefits": [
    {
      "icon": "emoji icon",
      "title": "Benefit title",
      "description": "1-2 sentence benefit description"
    }
  ],
  "features": [
    {
      "title": "TRANSLATED feature name in ${targetLanguage} (NOT original input language)",
      "description": "IMPORTANT: Create a SPECIFIC and UNIQUE description in ${targetLanguage} for each feature based on its TRANSLATED title. Analyze the feature name and write a compelling 1-2 sentence description that explains what this specific feature does and why it matters for ${input.targetAudience}. DO NOT use generic descriptions. Each feature must have a different, contextual description in ${targetLanguage}."
    }
  ],
  "socialProof": [
    {
      "name": "Customer name",
      "role": "Customer role/title",
      "testimonial": "Compelling testimonial focused on results",
      "rating": 5
    }
  ],
  "pricing": {
    "originalPrice": "Original price if applicable",
    "currentPrice": "${input.price}",
    "currency": "${input.currency}",
    "billingPeriod": "one-time or /month or /year",
    "features": ["What's included list"]
  },
  "cta": {
    "primaryText": "Action-oriented CTA button text",
    "secondaryText": "Secondary CTA or guarantee text",
    "urgencyText": "Urgency/scarcity message"
  },
  "faq": [
    {
      "question": "Common objection as question",
      "answer": "Reassuring answer"
    }
  ]
}

CRITICAL REQUIREMENTS FOR FEATURES:
1. **TRANSLATE feature titles to ${targetLanguage}** - DO NOT keep original language
   Example: "Kue Ultah" → "Birthday Cake" (if English)
   Example: "Birthday Cake" → "Kue Ulang Tahun" (if Indonesian)
2. Use the TRANSLATED feature titles in your response
3. For EACH feature, analyze its TRANSLATED title and create a SPECIFIC description in ${targetLanguage}:
   - If feature is about "basics" or "fundamentals" or "dasar" → explain foundational learning
   - If feature is about "step-by-step" or "tutorial" or "langkah" → explain structured guidance
   - If feature is about "practice" or "exercise" or "latihan" → explain hands-on learning
   - If feature is about "advanced" or "expert" or "lanjutan" → explain advanced techniques
   - If feature is about "project" or "real-world" or "proyek" → explain practical application
   - If feature is about "support" or "help" or "dukungan" → explain assistance available
   - If feature is about "certificate" or "credential" or "sertifikat" → explain certification value
   - If feature is about "community" or "network" or "komunitas" → explain networking benefits
   - If feature is about "lifetime" or "unlimited" or "selamanya" → explain access benefits
   - If feature is about "video" or "visual" or "video" → explain multimedia content
   - If feature is about "cake" or "kue" → explain cake/dessert customization
   - If feature is about "entertainment" or "hiburan" → explain entertainment options
   - If feature is about "party" or "acara" or "pesta" → explain party planning
4. Each description MUST be different and contextual to its TRANSLATED feature title
5. Make descriptions persuasive and benefit-focused in ${targetLanguage}
6. Tailor language to ${input.targetAudience} in ${targetLanguage}

General Requirements:
- Make it persuasive and conversion-focused in ${targetLanguage}
- Use power words and emotional triggers appropriate for ${targetLanguage}
- Tailor everything to the target audience: ${input.targetAudience} (translate if needed)
- Generate 4 benefits, ${input.features.length} features (one for each provided - TRANSLATED), 3 testimonials, 4 FAQ items
- **ALL content MUST be in ${targetLanguage}** - this is CRITICAL
- **TRANSLATE all input data** (product name, features, audience) to ${targetLanguage} before using
- Use culturally appropriate references and idioms for ${targetLanguage}
- Pricing should reflect: ${input.price} ${input.currency}

🔴 FINAL CHECK BEFORE RESPONDING:
- [ ] Product name translated to ${targetLanguage}?
- [ ] ALL feature titles translated to ${targetLanguage}?
- [ ] ALL descriptions in ${targetLanguage}?
- [ ] NO mixed language content?
- [ ] Natural native-speaker level ${targetLanguage}?`;
}

// Helper function to parse AI response
function parseAIResponse(text: string): GeneratedSalesPage {
  // Clean response — strip any potential markdown fences
  const cleaned = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  return JSON.parse(cleaned);
}

// Try Gemini Flash (Priority 1 - FREE 1,500/day)
async function tryGemini(prompt: string): Promise<GeneratedSalesPage | null> {
  if (!geminiClient) {
    console.log("⚠️  Gemini API key not configured");
    return null;
  }

  try {
    console.log("🔵 Trying Gemini 2.0 Flash...");
    const model = geminiClient.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 4000,
      },
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log("✅ Gemini Flash succeeded!");
    return parseAIResponse(text);
  } catch (error: any) {
    console.error("❌ Gemini failed:", error.message);
    
    // Check if it's a quota/rate limit error
    if (error.message?.includes("quota") || 
        error.message?.includes("rate limit") ||
        error.message?.includes("429")) {
      console.log("⚠️  Gemini quota exceeded, trying fallback...");
    }
    
    return null;
  }
}

// Try Groq (Priority 2 - FREE 14,400/day)
async function tryGroq(prompt: string): Promise<GeneratedSalesPage | null> {
  if (!groqClient) {
    console.log("⚠️  Groq API key not configured");
    return null;
  }

  try {
    console.log("🟢 Trying Groq (Llama 3.3 70B)...");
    const completion = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.9,
      max_tokens: 4000,
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      throw new Error("No response from Groq");
    }

    console.log("✅ Groq succeeded!");
    return parseAIResponse(text);
  } catch (error: any) {
    console.error("❌ Groq failed:", error.message);
    
    // Check if it's a quota/rate limit error
    if (error.message?.includes("quota") || 
        error.message?.includes("rate limit") ||
        error.message?.includes("429")) {
      console.log("⚠️  Groq quota exceeded, trying fallback...");
    }
    
    return null;
  }
}

export function generateSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60) +
    "-" +
    Math.random().toString(36).slice(2, 7)
  );
}


// Demo Mode (Priority 3 - Fallback when all AI fails)
function generateDemoMode(input: ProductInput): GeneratedSalesPage {
  console.log("🟡 Using Demo Mode (Template)...");
  
  const lang = input.language || "id";
  
  // Language-specific templates
  const templates = {
    id: {
      headline: (name: string) => `Transformasi Hidup Anda dengan ${name}`,
      subHeadline: (audience: string) => `Solusi terbaik untuk ${audience} yang ingin mencapai lebih banyak`,
      description: (name: string, audience: string, desc: string) => 
        `${name} dirancang khusus untuk ${audience}. ${desc}`,
      benefits: [
        { icon: "⚡", title: "Hasil Cepat & Instan", description: "Lihat peningkatan langsung dalam workflow dan produktivitas Anda" },
        { icon: "🎯", title: "Target yang Presisi", description: "Jangkau target audience Anda dengan akurasi yang tepat sasaran" },
        { icon: "💎", title: "Kualitas Premium", description: "Dibangun dengan standar tertinggi dan perhatian pada detail" },
        { icon: "🚀", title: "Pertumbuhan Pesat", description: "Skalakan kesuksesan Anda lebih cepat dari yang Anda bayangkan" },
      ],
      testimonials: [
        { name: "Sarah Wijaya", role: "Pemilik Bisnis", testimonial: (name: string) => `${name} benar-benar mengubah cara saya bekerja. Hasilnya langsung terlihat!`, rating: 5 },
        { name: "Michael Tan", role: "Direktur Marketing", testimonial: "Investasi terbaik yang saya buat tahun ini. Sangat merekomendasikan!", rating: 5 },
        { name: "Emma Putri", role: "Entrepreneur", testimonial: "Kualitas dan dukungannya luar biasa. Sangat worth it!", rating: 5 },
      ],
      pricing: ["Akses penuh ke semua fitur", "Dukungan pelanggan prioritas", "Update reguler termasuk", "Garansi uang kembali 30 hari"],
      cta: {
        primary: (name: string) => `Dapatkan ${name} Sekarang`,
        secondary: "Bergabung dengan ribuan pelanggan yang puas",
        urgency: "Penawaran terbatas - Ambil kesempatan sekarang!",
      },
      faq: [
        { question: "Seberapa cepat saya akan melihat hasilnya?", answer: "Sebagian besar pelanggan melihat peningkatan langsung, dengan hasil signifikan dalam minggu pertama." },
        { question: "Apakah ada garansi uang kembali?", answer: "Ya! Kami menawarkan garansi uang kembali 30 hari. Jika tidak puas, kami akan mengembalikan uang Anda." },
        { question: "Apakah saya perlu skill teknis?", answer: "Tidak sama sekali! Solusi kami dirancang user-friendly dan mudah diakses oleh semua orang." },
        { question: "Dukungan apa yang Anda tawarkan?", answer: "Kami menyediakan dukungan email prioritas dan dokumentasi lengkap untuk membantu kesuksesan Anda." },
      ],
    },
    en: {
      headline: (name: string) => `Transform Your Life with ${name}`,
      subHeadline: (audience: string) => `The ultimate solution for ${audience} who want to achieve more`,
      description: (name: string, audience: string, desc: string) => 
        `${name} is designed specifically for ${audience}. ${desc}`,
      benefits: [
        { icon: "⚡", title: "Lightning Fast Results", description: "See immediate improvements in your workflow and productivity" },
        { icon: "🎯", title: "Precision Targeting", description: "Reach exactly who you need to reach with laser-focused accuracy" },
        { icon: "💎", title: "Premium Quality", description: "Built with the highest standards and attention to detail" },
        { icon: "🚀", title: "Rapid Growth", description: "Scale your success faster than you ever thought possible" },
      ],
      testimonials: [
        { name: "Sarah Johnson", role: "Business Owner", testimonial: (name: string) => `${name} completely transformed how I work. The results were immediate!`, rating: 5 },
        { name: "Michael Chen", role: "Marketing Director", testimonial: "Best investment I've made this year. Highly recommend to anyone serious about growth.", rating: 5 },
        { name: "Emma Williams", role: "Entrepreneur", testimonial: "The quality and support are outstanding. Worth every penny!", rating: 5 },
      ],
      pricing: ["Full access to all features", "Priority customer support", "Regular updates included", "30-day money-back guarantee"],
      cta: {
        primary: (name: string) => `Get ${name} Now`,
        secondary: "Join thousands of satisfied customers",
        urgency: "Limited time offer - Act now!",
      },
      faq: [
        { question: "How quickly will I see results?", answer: "Most customers see immediate improvements, with significant results within the first week of use." },
        { question: "Is there a money-back guarantee?", answer: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your purchase." },
        { question: "Do I need any technical skills?", answer: "Not at all! Our solution is designed to be user-friendly and accessible to everyone." },
        { question: "What kind of support do you offer?", answer: "We provide priority email support and comprehensive documentation to help you succeed." },
      ],
    },
    ms: {
      headline: (name: string) => `Transformasi Hidup Anda dengan ${name}`,
      subHeadline: (audience: string) => `Penyelesaian terbaik untuk ${audience} yang ingin mencapai lebih banyak`,
      description: (name: string, audience: string, desc: string) => 
        `${name} direka khas untuk ${audience}. ${desc}`,
      benefits: [
        { icon: "⚡", title: "Hasil Pantas & Segera", description: "Lihat peningkatan segera dalam aliran kerja dan produktiviti anda" },
        { icon: "🎯", title: "Sasaran yang Tepat", description: "Capai sasaran anda dengan ketepatan yang fokus" },
        { icon: "💎", title: "Kualiti Premium", description: "Dibina dengan standard tertinggi dan perhatian kepada perincian" },
        { icon: "🚀", title: "Pertumbuhan Pesat", description: "Skalakan kejayaan anda lebih pantas daripada yang anda fikirkan" },
      ],
      testimonials: [
        { name: "Sarah Ahmad", role: "Pemilik Perniagaan", testimonial: (name: string) => `${name} benar-benar mengubah cara saya bekerja. Hasilnya segera!`, rating: 5 },
        { name: "Michael Lim", role: "Pengarah Pemasaran", testimonial: "Pelaburan terbaik yang saya buat tahun ini. Sangat mengesyorkan!", rating: 5 },
        { name: "Emma Zainal", role: "Usahawan", testimonial: "Kualiti dan sokongannya luar biasa. Sangat berbaloi!", rating: 5 },
      ],
      pricing: ["Akses penuh kepada semua ciri", "Sokongan pelanggan keutamaan", "Kemas kini berkala termasuk", "Jaminan wang kembali 30 hari"],
      cta: {
        primary: (name: string) => `Dapatkan ${name} Sekarang`,
        secondary: "Sertai ribuan pelanggan yang berpuas hati",
        urgency: "Tawaran terhad - Ambil peluang sekarang!",
      },
      faq: [
        { question: "Berapa pantas saya akan melihat hasilnya?", answer: "Kebanyakan pelanggan melihat peningkatan segera, dengan hasil ketara dalam minggu pertama." },
        { question: "Adakah jaminan wang kembali?", answer: "Ya! Kami menawarkan jaminan wang kembali 30 hari. Jika tidak berpuas hati, kami akan memulangkan wang anda." },
        { question: "Adakah saya perlukan kemahiran teknikal?", answer: "Tidak langsung! Penyelesaian kami direka mesra pengguna dan mudah diakses oleh semua orang." },
        { question: "Sokongan apa yang anda tawarkan?", answer: "Kami menyediakan sokongan e-mel keutamaan dan dokumentasi lengkap untuk membantu kejayaan anda." },
      ],
    },
  };

  const t = templates[lang as keyof typeof templates] || templates.id;

  // Generate feature descriptions
  const features = input.features.map((feature) => {
    const title = feature.toLowerCase();
    let description = "";

    if (lang === "id") {
      if (title.includes("dasar") || title.includes("basic") || title.includes("fundamental")) {
        description = `Pelajari fondasi penting yang akan menjadi dasar kesuksesan Anda. Materi ini dirancang khusus untuk ${input.targetAudience}.`;
      } else if (title.includes("langkah") || title.includes("step") || title.includes("tutorial")) {
        description = `Ikuti panduan terstruktur yang mudah dipahami. Setiap langkah dijelaskan secara detail sehingga Anda bisa langsung praktik.`;
      } else if (title.includes("latihan") || title.includes("practice") || title.includes("praktek")) {
        description = `Asah kemampuan Anda dengan latihan praktis yang relevan. Semakin banyak berlatih, semakin cepat Anda menguasai skill.`;
      } else {
        description = `Fitur ${feature} memberikan value signifikan untuk ${input.targetAudience}. Dengan ini, Anda akan lebih mudah mencapai tujuan.`;
      }
    } else if (lang === "en") {
      if (title.includes("basic") || title.includes("fundamental") || title.includes("introduction")) {
        description = `Learn the essential foundations that will become the basis of your success. Designed specifically for ${input.targetAudience}.`;
      } else if (title.includes("step") || title.includes("tutorial") || title.includes("guide")) {
        description = `Follow a structured guide that's easy to understand. Each step is explained in detail so you can practice immediately.`;
      } else if (title.includes("practice") || title.includes("exercise") || title.includes("hands-on")) {
        description = `Sharpen your skills with relevant practical exercises. The more you practice, the faster you master the required skills.`;
      } else {
        description = `The ${feature} feature provides significant value for ${input.targetAudience}. With this, you'll achieve your goals easier.`;
      }
    } else {
      if (title.includes("asas") || title.includes("basic") || title.includes("fundamental")) {
        description = `Pelajari asas penting yang akan menjadi dasar kejayaan anda. Direka khas untuk ${input.targetAudience}.`;
      } else if (title.includes("langkah") || title.includes("step") || title.includes("tutorial")) {
        description = `Ikuti panduan berstruktur yang mudah difahami. Setiap langkah dijelaskan secara terperinci.`;
      } else if (title.includes("latihan") || title.includes("practice") || title.includes("praktek")) {
        description = `Asah kemahiran anda dengan latihan praktikal yang relevan. Semakin banyak berlatih, semakin cepat anda menguasai.`;
      } else {
        description = `Ciri ${feature} memberikan nilai penting untuk ${input.targetAudience}. Dengan ini, anda akan lebih mudah mencapai matlamat.`;
      }
    }

    return { title: feature, description };
  });

  return {
    headline: t.headline(input.productName),
    subHeadline: t.subHeadline(input.targetAudience),
    productDescription: t.description(input.productName, input.targetAudience, input.description),
    benefits: t.benefits,
    features,
    socialProof: t.testimonials.map((test) => ({
      name: test.name,
      role: test.role,
      testimonial: typeof test.testimonial === "function" ? test.testimonial(input.productName) : test.testimonial,
      rating: test.rating,
    })),
    pricing: {
      originalPrice: "",
      currentPrice: input.price,
      currency: input.currency,
      billingPeriod: "one-time",
      features: t.pricing,
    },
    cta: {
      primaryText: t.cta.primary(input.productName),
      secondaryText: t.cta.secondary,
      urgencyText: t.cta.urgency,
    },
    faq: t.faq,
  };
}

// Main function with fallback system
export async function generateSalesPage(
  input: ProductInput,
  sectionToRegenerate?: keyof GeneratedSalesPage
): Promise<GeneratedSalesPage> {
  const prompt = buildPrompt(input, sectionToRegenerate);

  console.log("\n🚀 Starting AI generation with fallback system...");
  console.log("📊 Fallback order: Gemini Flash → Groq → Demo Mode\n");

  // Priority 1: Try Gemini Flash (FREE 1,500/day)
  const geminiResult = await tryGemini(prompt);
  if (geminiResult) {
    console.log("✅ Generation completed with Gemini Flash\n");
    return geminiResult;
  }

  // Priority 2: Try Groq (FREE 14,400/day)
  const groqResult = await tryGroq(prompt);
  if (groqResult) {
    console.log("✅ Generation completed with Groq\n");
    return groqResult;
  }

  // Priority 3: Demo Mode (Always works)
  console.log("⚠️  All AI providers exhausted, using Demo Mode");
  console.log("💡 Tip: Add GOOGLE_API_KEY or GROQ_API_KEY to .env for free AI generation\n");
  
  return generateDemoMode(input);
}
