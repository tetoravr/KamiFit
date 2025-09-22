export type GenerationStatus = "idle" | "loading" | "success" | "error";

export interface ImageAsset {
  url: string;
  name: string;
  mimeType: string;
  size: number;
  source: "upload" | "template";
}

export interface HairstyleTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  thumbnailUrl: string;
  accentColor: string;
  recommendedFor: string;
  vibe: string;
  referenceImageUrl?: string;
}

export interface StudioState {
  userPhoto?: ImageAsset;
  customTemplate?: ImageAsset;
  selectedTemplate?: HairstyleTemplate;
  prompt: string;
  status: GenerationStatus;
  error?: string;
  resultImage?: string; // data URL
  history: string[];
}
