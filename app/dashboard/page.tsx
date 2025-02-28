"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile?: File) => {
    setError(null);

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    setFile(selectedFile);
    setSummary(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Mock API call - will implement actual logic later
      // For now, simulate a loading delay and a response
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockSummary = `# Summary of "${file.name}"\n\nThis document appears to be a technical specification for a new software project. It outlines the requirements, architecture, and implementation details.\n\n## Key Points:\n\n1. The project aims to develop a cloud-based solution for data processing\n2. Expected completion timeline is Q2 2023\n3. Technology stack includes React, Node.js, and AWS\n4. Budget constraints require using existing infrastructure where possible\n\n## Main Sections:\n- Executive Summary\n- Technical Requirements\n- Architecture Design\n- Implementation Plan\n- Testing Strategy\n- Deployment Guidelines`;

      setSummary(mockSummary);
    } catch (err) {
      setError("Failed to analyze PDF. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          <div className="bg-dark-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  dragging
                    ? "border-purple-500 bg-purple-900/20"
                    : "border-gray-600 hover:border-purple-500 hover:bg-purple-900/10"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  id="pdf-upload"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="application/pdf"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12 text-purple-500 mb-4"
                >
                  <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                </svg>

                <p className="mb-2 text-lg font-medium">
                  {file ? file.name : "Drag & drop or click to upload"}
                </p>

                <p className="text-sm text-gray-400">
                  PDF files only (Max 10MB)
                </p>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button
                type="submit"
                disabled={!file || isLoading}
                className={`w-full btn-primary flex items-center justify-center ${
                  !file || isLoading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing PDF...
                  </>
                ) : (
                  "Generate Summary"
                )}
              </button>
            </form>
          </div>

          {summary && (
            <div className="bg-dark-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Summary Results</h2>

              <div className="prose prose-invert max-w-none">
                {summary.split("\n").map((paragraph, i) => {
                  if (paragraph.startsWith("# ")) {
                    return (
                      <h1 key={i} className="text-2xl font-bold mt-0 mb-4">
                        {paragraph.substring(2)}
                      </h1>
                    );
                  } else if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-xl font-semibold mt-4 mb-2">
                        {paragraph.substring(3)}
                      </h2>
                    );
                  } else if (paragraph.startsWith("- ")) {
                    return (
                      <li key={i} className="ml-6">
                        {paragraph.substring(2)}
                      </li>
                    );
                  } else if (paragraph.match(/^\d+\. /)) {
                    return (
                      <li key={i} className="ml-6">
                        {paragraph.substring(paragraph.indexOf(". ") + 2)}
                      </li>
                    );
                  } else if (paragraph === "") {
                    return <br key={i} />;
                  } else {
                    return (
                      <p key={i} className="mb-4">
                        {paragraph}
                      </p>
                    );
                  }
                })}
              </div>

              <div className="mt-6 flex gap-4">
                <button className="btn-outline">Download Summary</button>

                <button
                  className="btn-secondary"
                  onClick={() => setSummary(null)}
                >
                  Clear Results
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-dark-900 border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} PdfTool. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
