import fs from "fs";
import pdfParse from "pdf-parse";

export interface ParsedPdf {
  text: string;
  info: {
    PDFFormatVersion?: string;
    IsAcroFormPresent?: boolean;
    IsXFAPresent?: boolean;
    Title?: string;
    Author?: string;
    Subject?: string;
    Keywords?: string;
    Creator?: string;
    Producer?: string;
    CreationDate?: string;
    ModDate?: string;
  };
  metadata: any;
  numPages: number;
}

export async function parsePdf(filePath: string): Promise<ParsedPdf> {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    return {
      text: data.text,
      info: data.info,
      metadata: data.metadata,
      numPages: data.numpages,
    };
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to parse PDF");
  }
}

export function summarizePdfContent(
  content: string,
  maxLength: number = 1000,
): string {
  // In a real application, you would implement a more sophisticated
  // summarization algorithm or use an AI service

  // Basic summarization by extracting key sentences
  const sentences = content
    .replace(/\r\n|\r/g, "\n")
    .replace(/\n+/g, " ")
    .replace(/\.+/g, ".")
    .replace(/\s+/g, " ")
    .split(". ")
    .filter((sentence) => sentence.trim().length > 10);

  let summary = "";

  // Take the first sentence (usually contains the main idea)
  if (sentences.length > 0) {
    summary += sentences[0] + ". ";
  }

  // Take some sentences from the middle
  if (sentences.length > 5) {
    const middleIndex = Math.floor(sentences.length / 2);
    summary += sentences[middleIndex] + ". ";
  }

  // Take some sentences from near the end (often contains conclusions)
  if (sentences.length > 10) {
    const nearEndIndex = Math.floor(sentences.length * 0.8);
    summary += sentences[nearEndIndex] + ". ";
  }

  // If we haven't reached our target length, add more sentences
  let currentIndex = 1;
  while (summary.length < maxLength && currentIndex < sentences.length) {
    if (
      currentIndex !== Math.floor(sentences.length / 2) &&
      currentIndex !== Math.floor(sentences.length * 0.8)
    ) {
      summary += sentences[currentIndex] + ". ";
    }
    currentIndex++;
  }

  return summary.trim();
}

export function extractKeyPoints(
  content: string,
  numPoints: number = 5,
): string[] {
  // Split content into paragraphs
  const paragraphs = content
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 20);

  // Simple heuristic to find important points
  // In a real app, use NLP or AI to detect important sentences
  const potentialPoints = paragraphs.filter(
    (p) =>
      p.includes("key") ||
      p.includes("important") ||
      p.includes("significant") ||
      p.includes("note") ||
      p.includes("finding") ||
      p.includes("conclusion") ||
      p.includes("result"),
  );

  // If we don't find enough "important-looking" points, take some from the beginning and end
  let keyPoints = [...potentialPoints];

  if (keyPoints.length < numPoints && paragraphs.length > 0) {
    // Add from beginning (introduction)
    if (paragraphs.length > 0 && !keyPoints.includes(paragraphs[0])) {
      keyPoints.push(paragraphs[0]);
    }

    // Add from end (conclusion)
    if (
      paragraphs.length > 1 &&
      !keyPoints.includes(paragraphs[paragraphs.length - 1])
    ) {
      keyPoints.push(paragraphs[paragraphs.length - 1]);
    }
  }

  // Still need more? Take evenly spaced paragraphs
  if (keyPoints.length < numPoints && paragraphs.length > 3) {
    const step = Math.floor(
      paragraphs.length / (numPoints - keyPoints.length + 1),
    );
    for (
      let i = step;
      i < paragraphs.length && keyPoints.length < numPoints;
      i += step
    ) {
      if (!keyPoints.includes(paragraphs[i])) {
        keyPoints.push(paragraphs[i]);
      }
    }
  }

  // Limit to the requested number of points
  return keyPoints.slice(0, numPoints).map((point) => point.trim());
}
