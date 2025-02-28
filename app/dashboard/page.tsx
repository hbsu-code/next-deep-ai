"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import PdfUploader from "@/components/PdfUploader";

export default function Dashboard() {
  const { user } = useUser();

  // Format first name for display
  const firstName = user?.firstName || "User";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Welcome, {firstName}</h1>
          </div>

          <div className="bg-dark-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

            <PdfUploader />
          </div>
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
