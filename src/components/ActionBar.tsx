"use client";

import clsx from "clsx";
import type { GenerationStatus } from "@/types/studio";

interface ActionBarProps {
  canGenerate: boolean;
  hasResult: boolean;
  status: GenerationStatus;
  onGenerate: () => void;
  onDownload: () => void;
  onShare: () => void;
  onReset: () => void;
}

export function ActionBar({ canGenerate, hasResult, status, onGenerate, onDownload, onShare, onReset }: ActionBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-subtle backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap gap-2">
        <button
          type="button"
          onClick={onGenerate}
          className={clsx(
            "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            canGenerate
              ? "bg-primary text-primary-foreground shadow-subtle hover:bg-primary/90 focus-visible:ring-primary"
              : "bg-slate-200 text-slate-500 cursor-not-allowed"
          )}
          disabled={!canGenerate || status === "loading"}
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" aria-hidden />
              Generating…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span aria-hidden>⚡️</span>Generate style
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <span aria-hidden>♻️</span>Reset
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onDownload}
          disabled={!hasResult}
          className={clsx(
            "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            hasResult
              ? "border-primary/40 bg-white text-primary hover:bg-primary/10"
              : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
        >
          <span aria-hidden>⬇️</span>Download
        </button>
        <button
          type="button"
          onClick={onShare}
          disabled={!hasResult}
          className={clsx(
            "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            hasResult
              ? "border-secondary/50 bg-secondary/10 text-secondary hover:bg-secondary/20"
              : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
        >
          <span aria-hidden>📤</span>Share
        </button>
      </div>
    </div>
  );
}
