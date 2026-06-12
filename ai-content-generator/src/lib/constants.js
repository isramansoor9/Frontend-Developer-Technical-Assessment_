export const DEFAULT_PROMPT =
  "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face. She is turned slightly towards the viewer, offering a genuine and approachable expression. She is wearing a cream-colored cashmere sweater and delicate gold earrings. The background is a softly blurred expanse of muted gray and beige tones, suggesting a modern art gallery. There is subtle directional lighting";

export const IMAGE_COUNT_OPTIONS = [1, 2, 4, 8];
export const ASPECT_RATIO_OPTIONS = ["1:1", "4:3", "16:9", "9:16"];
export const MODEL_OPTIONS = ["Flux Pro", "SDXL", "DALL·E 3", "Midjourney"];

export const HISTORY_ITEMS = [
  {
    id: "h1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=120&fit=crop",
    alt: "Mountain landscape generation",
  },
  {
    id: "h2",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
    alt: "Portrait generation",
  },
  {
    id: "h3",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=120&h=120&fit=crop",
    alt: "Nature scene generation",
  },
  {
    id: "h4",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop",
    alt: "Woman portrait generation",
  },
  {
    id: "h5",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=120&h=120&fit=crop",
    alt: "Abstract art generation",
  },
  {
    id: "h6",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=120&h=120&fit=crop",
    alt: "Landscape generation",
  },
  {
    id: "h7",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
    alt: "Fashion portrait generation",
  },
  {
    id: "h8",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=120&h=120&fit=crop",
    alt: "Foggy forest generation",
  },
];

export const STYLE_OPTIONS = [
  "Photorealistic",
  "Cinematic",
  "Anime",
  "Oil Painting",
  "Watercolor",
  "3D Render",
];

export const ADVANCED_OPTIONS = {
  steps: [20, 30, 50],
  guidance: [5, 7.5, 10],
  seed: "Random",
};
