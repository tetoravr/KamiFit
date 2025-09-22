"use client";

import type { ImageAsset } from "@/types/studio";

interface ImageUploadCardProps {
  label: string;
  description: string;
  accept?: string;
  cta: string;
  asset?: ImageAsset;
  onFileSelect: (file: File) => void | Promise<void>;
  onClear?: () => void;
}

export function ImageUploadCard({ label, description, accept, cta, asset, onFileSelect, onClear }: ImageUploadCardProps) {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await onFileSelect(file);
      event.target.value = "";
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      await onFileSelect(file);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 shadow-subtle backdrop-blur-sm">
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-dark">{label}</p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>
          </div>
          {asset && onClear ? (
            <button
              type="button"
              className="text-xs font-medium text-primary hover:underline"
              onClick={() => onClear()}
              aria-label={`Remove ${label}`}
            >
              Reset
            </button>
          ) : null}
        </div>

        <label
          htmlFor={`${label.toLowerCase().replace(/\s+/g, "-")}-input`}
          className="relative flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-5 py-10 text-center transition hover:border-primary hover:bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/40"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            id={`${label.toLowerCase().replace(/\s+/g, "-")}-input`}
            type="file"
            accept={accept}
            className="sr-only"
            onChange={handleFileChange}
          />
          <span className="text-sm font-semibold text-primary">{cta}</span>
          <span className="text-xs text-slate-500">Drag & drop or browse</span>
          {asset ? (
            <div className="mt-4 w-full max-w-[180px] overflow-hidden rounded-lg border border-slate-200">
              <img
                src={asset.url}
                alt={`${label} preview`}
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-[11px] text-slate-600">
                {asset.name} · {(asset.size / 1024).toFixed(0)} KB
              </div>
            </div>
          ) : null}
        </label>
      </div>
    </div>
  );
}
