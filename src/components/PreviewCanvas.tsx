"use client";

import clsx from "clsx";
import type { GenerationStatus, ImageAsset } from "@/types/studio";

interface PreviewCanvasProps {
  userPhoto?: ImageAsset;
  resultImage?: string;
  status: GenerationStatus;
  error?: string;
}

const statusCopy: Record<GenerationStatus, string> = {
  idle: "Upload a photo and select a style to begin.",
  loading: "Brewing your new look with nano banana…",
  success: "Fresh style delivered! Save or share below.",
  error: "We couldn’t complete that look. Tweak and try again.",
};

export function PreviewCanvas({ userPhoto, resultImage, status, error }: PreviewCanvasProps) {
  return (
    <section
      aria-labelledby="preview-title"
      className="relative flex flex-col gap-4 rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 to-white/60 p-6 shadow-subtle"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="preview-title" className="text-lg font-semibold text-dark">
            Live preview
          </h2>
          <p className="text-xs text-slate-500">Gemini blends your base photo with the selected hairstyle.</p>
        </div>
        <span
          className={clsx(
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium",
            status === "loading" ? "bg-secondary/20 text-secondary" : "bg-slate-100 text-slate-600"
          )}
        >
          <span className={clsx("h-2 w-2 rounded-full", status === "loading" ? "bg-secondary animate-pulse" : "bg-slate-400")} />
          {statusCopy[status]}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100/60">
          {userPhoto ? (
            <img src={userPhoto.url} alt="Original uploaded portrait" className="h-full w-full object-cover" />
          ) : (
            <Placeholder message="Your base photo" />
          )}
        </div>

        <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100/60">
          {resultImage ? (
            <img src={resultImage} alt="AI generated hairstyle preview" className="h-full w-full object-cover" />
          ) : status === "loading" ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-primary">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" aria-hidden />
              <p className="text-sm font-medium">Synthesizing strands…</p>
            </div>
          ) : (
            <Placeholder message="Your styled result" />
          )}

          {status === "error" && error ? (
            <div className="absolute inset-x-4 bottom-4 rounded-xl bg-red-500/90 p-3 text-sm font-medium text-white shadow-lg">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Placeholder({ message }: { message: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-slate-500">
      <span className="text-lg" role="img" aria-label="sparkles">
        ✨
      </span>
      <p className="text-sm font-medium">{message}</p>
      <p className="text-xs text-slate-400">Add an image to unlock previews</p>
    </div>
  );
}
