"use client";

import { useCallback, useMemo, useReducer } from "react";
import { base64ToDataUrl, dataUrlToBase64, downloadDataUrl, fileToImageAsset } from "@/lib/image";
import type { HairstyleTemplate, ImageAsset, StudioState } from "@/types/studio";

type Action =
  | { type: "SET_USER_PHOTO"; payload?: ImageAsset }
  | { type: "SET_CUSTOM_TEMPLATE"; payload?: ImageAsset }
  | { type: "SET_TEMPLATE"; payload?: HairstyleTemplate }
  | { type: "SET_PROMPT"; payload: string }
  | { type: "SET_STATUS"; payload: StudioState["status"] }
  | { type: "SET_ERROR"; payload?: string }
  | { type: "SET_RESULT"; payload?: string }
  | { type: "RESET" };

const initialState: StudioState = {
  prompt: "",
  status: "idle",
  history: [],
};

function reducer(state: StudioState, action: Action): StudioState {
  switch (action.type) {
    case "SET_USER_PHOTO":
      return {
        ...state,
        userPhoto: action.payload,
        status: "idle",
        error: undefined,
      };
    case "SET_CUSTOM_TEMPLATE":
      return {
        ...state,
        customTemplate: action.payload,
        status: "idle",
        error: undefined,
      };
    case "SET_TEMPLATE":
      return {
        ...state,
        selectedTemplate: action.payload,
        prompt: action.payload?.prompt ?? state.prompt,
        status: "idle",
        error: undefined,
      };
    case "SET_PROMPT":
      return { ...state, prompt: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, status: action.payload ? "error" : state.status };
    case "SET_RESULT":
      return {
        ...state,
        resultImage: action.payload,
        status: action.payload ? "success" : state.status,
        error: undefined,
        history: action.payload ? [action.payload, ...state.history].slice(0, 6) : state.history,
      };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

export function useHairstyleStudio() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUserPhoto = useCallback(async (file: File) => {
    const asset = await fileToImageAsset(file);
    dispatch({
      type: "SET_USER_PHOTO",
      payload: { ...asset, source: "upload" },
    });
  }, []);

  const setCustomTemplate = useCallback(async (file: File) => {
    const asset = await fileToImageAsset(file);
    dispatch({
      type: "SET_CUSTOM_TEMPLATE",
      payload: { ...asset, source: "upload" },
    });
  }, []);

  const clearUserPhoto = useCallback(() => {
    dispatch({ type: "SET_USER_PHOTO", payload: undefined });
    dispatch({ type: "SET_RESULT", payload: undefined });
    dispatch({ type: "SET_STATUS", payload: "idle" });
  }, []);

  const clearCustomTemplate = useCallback(() => {
    dispatch({ type: "SET_CUSTOM_TEMPLATE", payload: undefined });
  }, []);

  const selectTemplate = useCallback((template?: HairstyleTemplate) => {
    dispatch({ type: "SET_TEMPLATE", payload: template });
  }, []);

  const setPrompt = useCallback((prompt: string) => {
    dispatch({ type: "SET_PROMPT", payload: prompt });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const activePrompt = useMemo(() => state.prompt || state.selectedTemplate?.prompt || "", [state.prompt, state.selectedTemplate]);

  const generate = useCallback(async () => {
    if (!state.userPhoto) {
      dispatch({ type: "SET_ERROR", payload: "Please upload a clear photo to begin." });
      return;
    }

    dispatch({ type: "SET_STATUS", payload: "loading" });
    dispatch({ type: "SET_ERROR", payload: undefined });

    try {
      const payload = {
        userPhoto: dataUrlToBase64(state.userPhoto.url),
        userPhotoMimeType: state.userPhoto.mimeType,
        hairstylePrompt: activePrompt,
        templateImage: state.customTemplate ? dataUrlToBase64(state.customTemplate.url) : undefined,
        templateImageMimeType: state.customTemplate?.mimeType,
        templateId: state.selectedTemplate?.id,
      };

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? "Gemini was unable to process this request.");
      }

      if (!data?.image) {
        throw new Error("No image was returned. Please try another style.");
      }

      const resultDataUrl = base64ToDataUrl(data.image, data.mimeType ?? "image/png");
      dispatch({ type: "SET_RESULT", payload: resultDataUrl });
      dispatch({ type: "SET_STATUS", payload: "success" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error";
      dispatch({ type: "SET_STATUS", payload: "error" });
      dispatch({ type: "SET_ERROR", payload: message });
    }
  }, [state.userPhoto, state.customTemplate, state.selectedTemplate, activePrompt]);

  const download = useCallback(() => {
    if (state.resultImage) {
      downloadDataUrl(state.resultImage, "kamifit-hairstyle.png");
    }
  }, [state.resultImage]);

  const share = useCallback(async () => {
    if (!state.resultImage) return;

    try {
      if (navigator.share && navigator.canShare) {
        const res = await fetch(state.resultImage);
        const blob = await res.blob();
        const file = new File([blob], "kamifit-hairstyle.png", { type: blob.type });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "KamiFit hairstyle preview",
            text: "Check out this AI-styled look I created with KamiFit!",
            files: [file],
          });
          return;
        }
      }
      await navigator.clipboard.writeText(state.resultImage);
      dispatch({ type: "SET_STATUS", payload: "success" });
      if (typeof window !== "undefined") {
        window.alert("Link copied! Paste it anywhere to share your look.");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to share image";
      dispatch({ type: "SET_ERROR", payload: message });
      dispatch({ type: "SET_STATUS", payload: "error" });
    }
  }, [state.resultImage]);

  return {
    state: {
      ...state,
      prompt: activePrompt,
    },
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
  } as const;
}
