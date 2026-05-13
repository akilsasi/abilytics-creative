export type CreativeType = 'hiring' | 'webinar' | 'womensDay' | 'launch';

export interface StyleControls {
  creativityLevel: number;
  brandStrictness: number;
}

export interface CreativeData {
  websiteUrl: string;
  logo?: string;
  referencePosters?: string[];
  brandColors: string[];
  creativeType: CreativeType;
  headline: string;
  subheadline: string;
  cta: string;
  hashtags: string;
  style: StyleControls;
  // Hiring Specifics
  role?: string;
  points?: string[];
  experience?: string;
  location?: string;
  email?: string;
}

export interface GenerationResult {
  id: string;
  imageUrl: string;
  prompt: string;
  timestamp: Date;
  type: CreativeType;
  title: string;
}
