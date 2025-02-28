import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

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

    // In a real application, you'd process the PDF here
    // For now, we'll generate a mock summary based on the filename
    const summary = generateMockSummary(file.name);

    // Delete the file after processing
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error("Error deleting file:", err);
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 },
    );
  }
}

// Mock function to generate a summary - in a real app you'd use PDF parsing and AI
function generateMockSummary(filename: string): string {
  return `# Summary of "${filename}"\n\nThis document appears to be a technical specification for a new software project. It outlines the requirements, architecture, and implementation details.\n\n## Key Points:\n\n1. The project aims to develop a cloud-based solution for data processing\n2. Expected completion timeline is Q2 2023\n3. Technology stack includes React, Node.js, and AWS\n4. Budget constraints require using existing infrastructure where possible\n\n## Main Sections:\n- Executive Summary\n- Technical Requirements\n- Architecture Design\n- Implementation Plan\n- Testing Strategy\n- Deployment Guidelines`;
}
