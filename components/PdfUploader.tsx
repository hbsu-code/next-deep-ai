"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);
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
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

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
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await fetch("/api/analyze-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError("Failed to analyze PDF. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center hover:border-purple-500 hover:bg-purple-900/10 transition-colors"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
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

          <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-purple-500"
            >
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
          </div>

          <p className="mb-1 text-center font-medium">
            {file ? file.name : "Click to upload or drag and drop"}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            PDF files only (Max 10MB)
          </p>
        </div>

        {error && <div className="text-red-500 text-sm py-2">{error}</div>}

        <button
          type="submit"
          disabled={!file || isLoading}
          className={`rounded-lg py-2 px-4 font-medium ${
            !file || isLoading
              ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
              : "bg-purple-600 dark:bg-purple-600 text-white hover:bg-purple-700 dark:hover:bg-purple-700"
          } transition-colors`}
        >
          {isLoading ? "Analyzing..." : "Analyze PDF"}
        </button>
      </form>

      {summary && (
        <div className="mt-6 p-4 border rounded-lg border-gray-200 dark:border-gray-800">
          <h3 className="font-bold text-lg mb-2">Summary</h3>
          <div className="prose dark:prose-invert max-w-none">
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
        </div>
      )}
    </div>
  );
}
