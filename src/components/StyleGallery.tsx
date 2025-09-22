"use client";

import type { HairstyleTemplate } from "@/types/studio";

interface StyleGalleryProps {
  templates: HairstyleTemplate[];
  selectedId?: string;
  onSelect: (template: HairstyleTemplate) => void;
}

export function StyleGallery({ templates, selectedId, onSelect }: StyleGalleryProps) {
  return (
    <section id="style-gallery" aria-labelledby="style-gallery-title" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="style-gallery-title" className="text-lg font-semibold text-dark">
            Quick style gallery
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tap a card to auto-fill the prompt and color palette.
          </p>
        </div>
        <span className="hidden md:inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] text-slate-600 shadow-subtle">
          <span className="block h-2 w-2 rounded-full bg-primary" aria-hidden />
          Curated by pro stylists
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {templates.map((template) => {
          const isSelected = template.id === selectedId;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template)}
              className={`group relative overflow-hidden rounded-2xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-primary shadow-subtle ring-1 ring-primary/40"
                  : "border-slate-200 hover:border-primary/60 hover:shadow-subtle"
              }`}
              aria-pressed={isSelected}
            >
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={template.thumbnailUrl}
                  alt={`${template.name} hairstyle example`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="space-y-2 border-t border-white/40 bg-white/80 p-4 text-left">
                <span
                  className="inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide"
                  style={{
                    background: `${template.accentColor}15`,
                    color: template.accentColor,
                  }}
                >
                  {template.vibe}
                </span>
                <h3 className="text-sm font-semibold text-dark">{template.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{template.description}</p>
                <p className="text-[11px] text-slate-500">Best for: {template.recommendedFor}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
