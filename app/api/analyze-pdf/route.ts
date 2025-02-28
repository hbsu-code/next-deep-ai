import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import {
  parsePdf,
  summarizePdfContent,
  extractKeyPoints,
} from "@/services/pdfParser";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("pdf") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Check if the file is a PDF
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "The file must be a PDF" },
        { status: 400 },
      );
    }

    // Limit file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size should be less than 10MB" },
        { status: 400 },
      );
    }

    // Create a unique file name
    const fileName = `${uuidv4()}.pdf`;

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "uploads");
    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
    } catch (err) {
      console.error("Error creating uploads directory:", err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // Save the file
    const filePath = join(uploadsDir, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    // Parse the PDF and generate a summary
    let summary = "";
    let keyPoints: string[] = [];
    let documentInfo = {};

    try {
      const parsedPdf = await parsePdf(filePath);

      // Generate the summary
      summary = summarizePdfContent(parsedPdf.text, 1500);

      // Extract key points
      keyPoints = extractKeyPoints(parsedPdf.text);

      // Get document info
      documentInfo = {
        title: parsedPdf.info.Title || file.name,
        author: parsedPdf.info.Author || "Unknown",
        numPages: parsedPdf.numPages,
        creationDate: parsedPdf.info.CreationDate || "Unknown",
      };
    } catch (err) {
      console.error("Error parsing PDF:", err);
      // If parsing fails, generate a fallback message
      summary = `Unable to parse the content of "${file.name}". The file might be encrypted, password protected, or contain only scanned images without OCR text.`;
    }

    // Format the summary with key points
    let formattedSummary = `# Summary of "${file.name}"\n\n${summary}`;

    if (keyPoints.length > 0) {
      formattedSummary += "\n\n## Key Points:\n\n";
      keyPoints.forEach((point, index) => {
        formattedSummary += `${index + 1}. ${point}\n`;
      });
    }

    // Add document info
    formattedSummary += `\n\n## Document Information:\n- Filename: ${file.name}\n- Pages: ${documentInfo.numPages || "Unknown"}\n- Author: ${documentInfo.author}\n- Creation Date: ${documentInfo.creationDate}`;

    // Clean up - delete the file after processing
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error("Error deleting file:", err);
    }

    return NextResponse.json({ summary: formattedSummary });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 },
    );
  }
}
