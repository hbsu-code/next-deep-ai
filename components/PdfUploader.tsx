"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null
