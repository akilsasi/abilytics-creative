import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    console.log("Generating abstract background with Pollinations.ai:", prompt.slice(0, 50) + "...");

    // Clean and truncate prompt for URL safety
    const cleanPrompt = prompt.replace(/[^\w\s]/gi, ' ').replace(/\s+/g, ' ').trim();
    const truncatedPrompt = cleanPrompt.slice(0, 300); // Pollinations works best with shorter, focused prompts
    const encodedPrompt = encodeURIComponent(truncatedPrompt);
    const seed = Math.floor(Math.random() * 1000000);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}&model=flux`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch image from generation engine");
    
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64}`;

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate background. Please try again." },
      { status: 500 }
    );
  }
}
