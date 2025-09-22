import { NextResponse } from "next/server";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/imagegeneration@002:generate";

interface GenerateBody {
  userPhoto: string;
  userPhotoMimeType: string;
  hairstylePrompt?: string;
  templateImage?: string;
  templateImageMimeType?: string;
  templateId?: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing GEMINI_API_KEY environment variable." }, { status: 500 });
  }

  let body: GenerateBody;
  try {
    body = (await request.json()) as GenerateBody;
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  if (!body.userPhoto || !body.userPhotoMimeType) {
    return NextResponse.json({ error: "A base portrait upload is required." }, { status: 400 });
  }

  const composedPrompt =
    body.hairstylePrompt?.trim() ||
    "High-resolution beauty portrait retouch. Create a flattering, well-lit hairstyle transformation.";

  const requestBody = {
    prompt: {
      text: `${composedPrompt}\nReturn a single high-resolution PNG with clean background.`,
    },
    image: {
      inlineData: {
        mimeType: body.userPhotoMimeType,
        data: body.userPhoto,
      },
    },
    ...(body.templateImage
      ? {
          referenceImage: {
            inlineData: {
              mimeType: body.templateImageMimeType ?? "image/png",
              data: body.templateImage,
            },
          },
        }
      : {}),
    config: {
      safetyFilterLevel: "block_most",
      editConfig: {
        referenceType: body.templateImage ? "IMAGE" : "TEXT",
        referenceText: composedPrompt,
      },
    },
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = data?.error?.message ?? "Gemini Flash Image could not process the request.";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const inlineData =
      data?.images?.[0]?.data ??
      data?.candidates?.[0]?.content?.parts?.find((part: { inlineData?: { data: string } }) => part.inlineData)?.inlineData?.data;

    if (!inlineData) {
      return NextResponse.json({ error: "No image returned from Gemini." }, { status: 502 });
    }

    const mimeType =
      data?.images?.[0]?.mimeType ??
      data?.candidates?.[0]?.content?.parts?.find((part: { inlineData?: { mimeType?: string } }) => part.inlineData)?.inlineData
        ?.mimeType ??
      "image/png";

    return NextResponse.json({ image: inlineData, mimeType });
  } catch (error) {
    console.error("Gemini request failed", error);
    return NextResponse.json({ error: "Gemini request failed" }, { status: 500 });
  }
}
