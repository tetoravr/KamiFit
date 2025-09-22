# KamiFit — AI Hairstyle Preview Studio

KamiFit is a modern Next.js + TypeScript web experience that lets anyone preview hairstyles in seconds. Upload a base portrait, choose from curated looks or drop in your own inspiration, and let Google’s Gemini Flash Image (aka **nano banana**) synthesize a realistic result ready to save or share.

## Features

- ⚡️ **Instant previews** – Client-side state keeps uploads responsive while Gemini handles generation through a secure API route.
- 🎨 **Curated style gallery** – One-tap templates auto-fill rich prompts with pro stylist guidance.
- 🖼️ **Dual image selectors** – Separate uploaders for your portrait and optional reference/inspiration images.
- 🧠 **Prompt control** – Fine-tune the description before sending it to the model.
- 📱 **Responsive & accessible UI** – Tailwind CSS styling adapts from desktop dashboards to mobile stacks with semantic markup.
- 💾 **Save or share** – Download the generated image or use the Web Share API/clipboard fallback.

## Tech stack

- [Next.js 14](https://nextjs.org/) with the App Router under `src/app`
- React 18 + TypeScript
- Tailwind CSS for modern styling
- API route proxying requests to Gemini Flash Image (nano banana)

## Prerequisites

- Node.js **18.18+** (or any version supported by Next.js 14)
- npm 9+
- A Google AI Studio project with access to Gemini Flash Image and an API key

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create a local environment file**

   Copy `.env.example` (create it if needed) or run:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add your Gemini key:

   ```dotenv
   GEMINI_API_KEY=your_api_key_here
   ```

   The key is read server-side only inside the Next.js API route.

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to start styling.

## Available scripts

- `npm run dev` – Start the development server with hot reloading.
- `npm run build` – Create an optimized production build.
- `npm run start` – Serve the production build locally.
- `npm run lint` – Run ESLint (`next lint`).
- `npm run typecheck` – Type-check the project with TypeScript.

## Gemini Flash Image integration

The app exposes a single POST endpoint at `/api/generate` that:

1. Accepts a JSON payload with the base portrait, optional reference image, and composed prompt.
2. Calls `https://generativelanguage.googleapis.com/v1beta/models/imagegeneration@002:generate` with the provided assets.
3. Returns the synthesized hairstyle as a Base64 payload for the client to display and save.

Authentication is handled via the `GEMINI_API_KEY` environment variable. Never expose the key on the client – only the API route can read it.

## Folder structure

```
├── src/
│   ├── app/
│   │   ├── api/generate/route.ts   # Server-side Gemini proxy
│   │   ├── layout.tsx              # Global layout & header/footer
│   │   └── page.tsx                # Hairstyle studio UI
│   ├── components/                 # Reusable UI pieces
│   ├── hooks/                      # Client-side state management
│   ├── lib/                        # Helpers and template data
│   └── types/                      # Shared TypeScript types
├── tailwind.config.ts
└── README.md
```

## Accessibility & responsiveness

- Semantic landmarks (`<header>`, `<main>`, `<footer>`) and labelled sections improve screen reader navigation.
- Buttons include focus states and keyboard interactivity.
- Layout gracefully stacks on mobile while maintaining dual-column previews on larger screens.

## Troubleshooting

- Ensure uploads are under 10 MB and in a common format (JPG/PNG).
- If you see `Gemini request failed`, verify your API key, project quota, and that the Flash Image API is enabled.
- For SSL/network issues, inspect console logs in both the browser and the server terminal output.

## License

This project is provided as-is for demonstration purposes. Adapt it to your workflow, and make sure you comply with Google’s usage policies for Gemini models.
