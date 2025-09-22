"use client";

import { ActionBar } from "@/components/ActionBar";
import { ImageUploadCard } from "@/components/ImageUploadCard";
import { PreviewCanvas } from "@/components/PreviewCanvas";
import { StyleGallery } from "@/components/StyleGallery";
import { useHairstyleStudio } from "@/hooks/useHairstyleStudio";
import { HAIRSTYLE_TEMPLATES } from "@/lib/templates";

export default function HomePage() {
  const {
    state: { userPhoto, customTemplate, selectedTemplate, prompt, resultImage, status, error },
    actions: {
      setUserPhoto,
      setCustomTemplate,
      selectTemplate,
      setPrompt,
      generate,
      reset,
      download,
      share,
      clearUserPhoto,
      clearCustomTemplate,
    },
  } = useHairstyleStudio();

  const canGenerate = Boolean(userPhoto && (prompt.trim().length > 0 || selectedTemplate));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 pb-16">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <PreviewCanvas userPhoto={userPhoto} resultImage={resultImage} status={status} error={error} />

        <div className="space-y-4">
          <ImageUploadCard
            label="Your photo"
            description="Upload a clear portrait with good lighting for best results. We keep everything in the browser until you hit generate."
            cta="Upload portrait"
            accept="image/*"
            asset={userPhoto}
            onFileSelect={setUserPhoto}
            onClear={clearUserPhoto}
          />

          <ImageUploadCard
            label="Custom inspiration"
            description="Optional: upload a reference hairstyle or makeup look to guide nano banana. JPG or PNG under 10 MB."
            cta="Add reference"
            accept="image/*"
            asset={customTemplate}
            onFileSelect={setCustomTemplate}
            onClear={clearCustomTemplate}
          />

          <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-subtle backdrop-blur-sm">
            <label htmlFor="prompt" className="text-sm font-semibold text-dark">
              Style prompt
            </label>
            <p className="text-xs text-slate-500 mt-1">
              Describe the vibe, length, texture, and color you’re after. We’ve pre-filled it using your selected template – tweak it to taste.
            </p>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="mt-3 h-32 w-full resize-none rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm leading-relaxed text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
              placeholder="Example: Give me a jaw-length blunt bob with glassy shine and airy micro bangs."
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
              <span>
                Tip: Mention lighting or accessories (“studio softbox”, “pearl pins”) for more control.
              </span>
              {selectedTemplate ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                  {selectedTemplate.name} selected
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <StyleGallery
        templates={HAIRSTYLE_TEMPLATES}
        selectedId={selectedTemplate?.id}
        onSelect={(template) => {
          if (selectedTemplate?.id === template.id) {
            selectTemplate(undefined);
          } else {
            selectTemplate(template);
          }
        }}
      />

      <ActionBar
        canGenerate={canGenerate}
        hasResult={Boolean(resultImage)}
        status={status}
        onGenerate={generate}
        onDownload={download}
        onShare={share}
        onReset={reset}
      />

      <section id="how-it-works" className="grid gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-subtle md:grid-cols-3">
        <Step
          number="01"
          title="Upload"
          body="Drop in a high-res selfie or client photo. Everything stays private until you trigger generation."
        />
        <Step
          number="02"
          title="Style"
          body="Pick a template or custom prompt. Layer in reference images for color, texture, or accessories."
        />
        <Step
          number="03"
          title="Share"
          body="Gemini Flash Image (nano banana) renders your new look in seconds. Download, share, or iterate instantly."
        />
      </section>
    </div>
  );
}

interface StepProps {
  number: string;
  title: string;
  body: string;
}

function Step({ number, title, body }: StepProps) {
  return (
    <div className="space-y-3 rounded-2xl bg-gradient-to-br from-white to-slate-50/60 p-5">
      <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">{number}</span>
      <h3 className="text-lg font-semibold text-dark">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}
