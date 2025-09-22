export function dataUrlToBase64(dataUrl: string) {
  const [, base64 = ""] = dataUrl.split(",");
  return base64;
}

export function base64ToDataUrl(base64: string, mimeType = "image/png") {
  return `data:${mimeType};base64,${base64}`;
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function fileToImageAsset(file: File) {
  return new Promise<{
    url: string;
    mimeType: string;
    name: string;
    size: number;
  }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve({
          url: reader.result,
          mimeType: file.type,
          name: file.name,
          size: file.size,
        });
      } else {
        reject(new Error("Could not read file"));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
