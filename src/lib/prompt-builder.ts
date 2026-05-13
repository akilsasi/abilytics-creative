import { CreativeData, CreativeType } from "@/types";

const styles = {
  futuristic: "cinematic lighting, AI visuals, glowing gradients, futuristic tech aesthetic",
  corporate: "minimal enterprise layout, clean composition, professional business feel",
  modern: "premium SaaS aesthetic, elegant spacing, sleek digital design",
  dynamic: "vibrant energy, motion blur elements, high-impact visuals"
};

const creativeTypePrompts: Record<CreativeType, string> = {
  hiring: "professional recruitment social media poster with enterprise AI branding",
  webinar: "premium webinar announcement with high-tech presentation layout",
  womensDay: "elegant celebratory women’s day creative with floral and tech integration",
  launch: "premium product launch announcement with cinematic lighting and epic reveal feel"
};

export function buildPrompt(data: CreativeData): string {
  const { 
    creativeType, 
    headline, 
    subheadline, 
    brandColors, 
    style, 
    websiteUrl 
  } = data;

  const basePrompt = creativeTypePrompts[creativeType];
  const colorDesc = brandColors.join(', ');
  
  const creativityModifier = style.creativityLevel > 70 
    ? "avant-garde, highly artistic, surreal elements" 
    : "structured, geometric, perfectly aligned layout";

  const strictnessModifier = style.brandStrictness > 70 
    ? "corporate professional, clean lines, minimalist" 
    : "expressive, fluid gradients, vibrant composition";

  return `
    Professional high-end ${basePrompt} for "Abilytics".
    Layout: Clean social media poster composition with a clear visual hierarchy. 
    Top section: Abstract premium AI-themed visual. 
    Bottom section: Solid area for text with elegant margins.
    
    Style: ${styles.modern}, ${styles.futuristic}, ${creativityModifier}, ${strictnessModifier}.
    Lighting: Cinematic studio lighting, high contrast, volumetric glow.
    Colors: Dominant colors are ${colorDesc}. Use deep navy backgrounds.
    
    Typography Instructions: 
    - Main Headline: "${headline || 'Hiring AI Developer'}" in bold modern sans-serif.
    - Sub-text: "${subheadline || 'Immediate'}" in clean medium weight.
    - Layout should look like a premium SaaS advertisement (e.g., Apple or Stripe style).
    
    Visual Quality: 8k resolution, photorealistic, sharp focus, masterwork, elegant spacing.
    Negative Prompt: text, words, letters, alphabet, script, writing, blurry, messy, low-res, cartoon, hand-drawn, cluttered, noisy, distorted, ugly composition.
  `.trim().replace(/\s+/g, ' ');
}
