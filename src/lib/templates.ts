import type { HairstyleTemplate } from "@/types/studio";

export const HAIRSTYLE_TEMPLATES: HairstyleTemplate[] = [
  {
    id: "pixie-pop",
    name: "Pixie Pop",
    description: "Feathery pixie cut with lived-in texture and bright copper glow.",
    prompt:
      "High-resolution beauty portrait retouch. Apply a textured pixie cut with soft volume at the crown and tapered sides. Hair color should be a sunlit copper with dimensional highlights. Maintain natural skin texture and studio lighting.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?auto=format&fit=crop&w=400&q=80",
    accentColor: "#F97316",
    recommendedFor: "Heart & oval faces",
    vibe: "Bold + Playful",
  },
  {
    id: "cloud-bob",
    name: "Cloud Bob",
    description: "Weightless blunt bob with airy bangs and cool tones.",
    prompt:
      "Studio beauty portrait. Add a chin-length blunt bob with translucent micro bangs. Hair finish should be weightless with a satin sheen in a cool smoky lilac tone. Keep makeup natural and softly lit.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80",
    accentColor: "#6366F1",
    recommendedFor: "Square & round faces",
    vibe: "Modern + Minimal",
  },
  {
    id: "glass-pony",
    name: "Glass Pony",
    description: "Sleek high ponytail with mirrored shine and sculpted edges.",
    prompt:
      "Editorial beauty shoot. Transform hair into a high glass-like ponytail with sculpted baby hairs. Finish with mirror gloss topcoat and subtle neon backlight rim on the hair. Keep wardrobe neutral.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=400&q=80",
    accentColor: "#0EA5E9",
    recommendedFor: "All face shapes",
    vibe: "Futuristic + Glam",
  },
  {
    id: "boho-waves",
    name: "Boho Waves",
    description: "Loose festival waves with sun-kissed balayage.",
    prompt:
      "Natural light portrait. Add waist-length bohemian waves with soft undone texture. Color should be balayage caramel with lighter ends. Include hair accessories with gold thread accent.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
    accentColor: "#EAB308",
    recommendedFor: "Oval & heart faces",
    vibe: "Carefree + Luxe",
  },
];
