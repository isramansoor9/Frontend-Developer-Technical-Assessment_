# AI Content Generator

A responsive AI image and video generation web page built with Next.js, matching the provided design mockup.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS + CSS Modules
- **Images:** `next/image` for optimized remote images

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd ai-content-generator
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/generate/route.js   # Dummy API for images & videos
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   └── page.module.css
├── components/
│   ├── AccordionSection/       # Advance & Styles panels
│   ├── Dropdown/               # Reusable settings dropdown
│   ├── GenerationSidebar/      # Prompt input & controls
│   ├── Header/                 # Top navigation bar
│   ├── HistoryBar/             # Horizontal history carousel
│   ├── MediaCard/              # Image/video result card
│   ├── PromptCard/             # Active prompt display
│   ├── ResultsGrid/            # Generated content grid
│   └── icons/                  # SVG icon components
└── lib/
    └── constants.js            # Shared config & mock data
```

## Features

- **UI:** Matches the provided mockup — header, history bar, pink sidebar, peach accents, rounded cards
- **Responsive:** Mobile-first layout from 320px through large desktop screens
- **Dummy API:** `POST /api/generate` returns mock images or videos based on prompt settings
- **Accessibility:** Semantic HTML, labels, alt text, focus states, `aria-live` for generation status
- **Performance:** Optimized images via `next/image`, minimal client state

## API

**Endpoint:** `POST /api/generate`

**Body:**

```json
{
  "prompt": "A portrait of...",
  "type": "image",
  "count": 4,
  "aspectRatio": "1:1",
  "model": "Flux Pro"
}
```

**Response:**

```json
{
  "success": true,
  "prompt": "...",
  "model": "Flux Pro",
  "aspectRatio": "1:1",
  "type": "image",
  "items": [{ "id": "...", "type": "image", "src": "...", "alt": "..." }]
}
```

Set `"type": "video"` to receive video results with poster thumbnails.

## Responsiveness Testing

Test at these breakpoints:

| Breakpoint | Layout |
|------------|--------|
| 320px+     | Stacked sidebar + 2-column image grid, prompt card full width |
| 640px+     | 3-column grid, action labels in header |
| 768px+     | Center nav icons with progress bar |
| 1024px+    | Sidebar + results side-by-side, 4-column grid |
| 1280px+    | Wider spacing for large screens |

## Keyboard Shortcut

- `Ctrl/Cmd + Enter` — Generate content
