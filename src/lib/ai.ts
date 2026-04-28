import Anthropic from "@anthropic-ai/sdk";
import { ProductInput, GeneratedSalesPage } from "@/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateSalesPage(
  input: ProductInput,
  sectionToRegenerate?: keyof GeneratedSalesPage
): Promise<GeneratedSalesPage> {
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

  const prompt = `You are an expert copywriter and marketing strategist. Create a compelling sales page for the following product/service.

Product Information:
- Name: ${input.productName}
- Description: ${input.description}
- Key Features: ${input.features.join(", ")}
- Target Audience: ${input.targetAudience}
- Price: ${input.price} ${input.currency}
- Unique Selling Points: ${input.sellingPoints}

TARGET LANGUAGE: ${targetLanguage}

CRITICAL LANGUAGE INSTRUCTION:
- The user has selected ${targetLanguage} as the output language
- ALL generated content MUST be in ${targetLanguage}
- If the input above is in a different language, TRANSLATE it to ${targetLanguage} first, then create the sales page
- Example: If input is in Indonesian but target is English, translate all content to English
- Example: If input is in English but target is Indonesian, translate all content to Indonesian
- Example: If input is in Indonesian but target is Malay, translate all content to Malay
- Maintain the meaning and intent while adapting to the target language's cultural context
- Use natural, native-speaker level language for ${targetLanguage}

${sectionPrompt}

Respond ONLY with a valid JSON object (no markdown, no backticks) with this exact structure:
{
  "headline": "Main compelling headline (max 10 words, power words)",
  "subHeadline": "Supporting headline that elaborates (max 20 words)",
  "productDescription": "Engaging 2-3 sentence product description focused on transformation",
  "benefits": [
    {
      "icon": "emoji icon",
      "title": "Benefit title",
      "description": "1-2 sentence benefit description"
    }
  ],
  "features": [
    {
      "title": "Feature name from the list above",
      "description": "IMPORTANT: Create a SPECIFIC and UNIQUE description for each feature based on its title. Analyze the feature name and write a compelling 1-2 sentence description that explains what this specific feature does and why it matters for ${input.targetAudience}. DO NOT use generic descriptions. Each feature must have a different, contextual description."
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
1. Use the EXACT feature titles from the list: ${input.features.join(", ")}
2. For EACH feature, analyze its title and create a SPECIFIC description:
   - If feature is about "basics" or "fundamentals" → explain foundational learning
   - If feature is about "step-by-step" or "tutorial" → explain structured guidance
   - If feature is about "practice" or "exercise" → explain hands-on learning
   - If feature is about "advanced" or "expert" → explain advanced techniques
   - If feature is about "project" or "real-world" → explain practical application
   - If feature is about "support" or "help" → explain assistance available
   - If feature is about "certificate" or "credential" → explain certification value
   - If feature is about "community" or "network" → explain networking benefits
   - If feature is about "lifetime" or "unlimited" → explain access benefits
   - If feature is about "video" or "visual" → explain multimedia content
3. Each description MUST be different and contextual to its feature title
4. Make descriptions persuasive and benefit-focused
5. Tailor language to ${input.targetAudience}

General Requirements:
- Make it persuasive and conversion-focused
- Use power words and emotional triggers
- Tailor everything to the target audience: ${input.targetAudience}
- Generate 4 benefits, ${input.features.length} features (one for each provided), 3 testimonials, 4 FAQ items
- ALL content MUST be in ${targetLanguage} - this is CRITICAL
- If input is in different language, translate to ${targetLanguage} while maintaining persuasive tone
- Use culturally appropriate references and idioms for ${targetLanguage}
- Pricing should reflect: ${input.price} ${input.currency}`;

  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  const textContent = message.content.find((c) => c.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("No text response from AI");
  }

  // Clean response — strip any potential markdown fences
  const cleaned = textContent.text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  const parsed: GeneratedSalesPage = JSON.parse(cleaned);
  return parsed;
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
