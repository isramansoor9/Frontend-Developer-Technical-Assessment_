# AI Content Generator

A responsive AI image and video generation web page built with Next.js, matching the provided design mockup with dark mode, lightbox previews, and a dummy generation API.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript
- **Styling:** CSS Modules + Tailwind CSS (design tokens & base utilities)
- **Images:** `next/image` for optimized remote images
- **Version Control:** Git / GitHub

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
│   ├── api/generate/route.js   # Dummy API — returns mock images & videos
│   ├── globals.css             # Theme tokens, base styles, dark mode variables
│   ├── layout.js               # Root layout + theme init script
│   ├── page.js                 # Main page state & generation logic
│   └── page.module.css
├── components/
│   ├── AccordionSection/       # Advance & Styles expandable panels
│   ├── Dropdown/               # Reusable settings dropdown pill
│   ├── GenerationSidebar/      # Prompt input, tabs, controls, generate
│   ├── Header/                 # Navbar, progress bar, theme toggle
│   ├── HistoryBar/             # Scrollable history thumbnail carousel
│   ├── Lightbox/               # Full-size image preview overlay
│   ├── MediaCard/              # Image/video result card with hover zoom
│   ├── PromptCard/             # Active generation prompt display
│   ├── ResultsGrid/            # Responsive results layout (mobile + desktop)
│   └── icons/                  # SVG icon components
├── context/
│   └── ThemeContext.js         # Dark/light theme state + localStorage
└── lib/
    └── constants.js            # Shared config, history data, options
```

## Architecture & Design Decisions

### Component separation
Each UI region from the mockup is its own component with a co-located CSS Module. Shared pieces (`Dropdown`, `AccordionSection`, `PromptCard`) are reused rather than duplicated.

### Styling approach
- **CSS Modules** handle component-specific layout and theming via CSS custom properties.
- **Tailwind** provides base body styles, focus rings, and the design token palette in `tailwind.config.js`.
- **CSS variables** in `globals.css` power light/dark mode so every component switches theme without JavaScript style logic.

### Responsive strategy (mobile-first)
| Breakpoint | Layout |
|------------|--------|
| 320px+     | Stacked sidebar, prompt card above 2-column image grid |
| 640px+     | 3-column image grid, header action labels visible |
| 768px+     | Center nav icons with progress bar |
| 1024px+    | Sidebar + results side-by-side; sidebar fills viewport height |
| 1280px+    | Desktop 5-column results grid (prompt + 4 images per row) |

### Dark mode
- Toggle via the **moon/sun icon** in the navbar.
- Preference is saved to `localStorage` and restored on load (with a blocking inline script to prevent theme flash).
- Respects `prefers-color-scheme: dark` when no saved preference exists.
- All surfaces transition smoothly (`0.25–0.3s`) between themes.

### Dummy API
`POST /api/generate` simulates an 800ms generation delay and returns Unsplash portrait images or sample video URLs based on the request body. No external AI service is required.

### Performance
- Remote images served through `next/image` with configured `imageSizes`.
- Client state is kept minimal — only generation settings, results, lightbox, and theme.
- Loading skeletons shown during generation to avoid layout shift.

### Accessibility
- Semantic HTML (`header`, `nav`, `main`, `aside`, `section`)
- `aria-label`, `aria-live`, `aria-pressed` on interactive controls
- Keyboard: `Escape` closes lightbox, `Ctrl/Cmd + Enter` triggers generate
- Visible focus rings via `:focus-visible`

## Features

- Pixel-close implementation of the provided mockup (header, history bar, pink sidebar, peach accents)
- Image & video generation tabs with settings dropdowns
- History bar with drag-to-scroll thumbnails + lightbox on click
- Results grid with hover zoom and lightbox preview
- Dark mode with smooth theme transitions
- Fully responsive from 320px to large desktop

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

