"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 p-4">
      <div className="bg-dark-800 rounded-xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-900/20 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-center mb-4">
          Something went wrong!
        </h1>

        <p className="text-gray-400 text-center mb-6">
          We're sorry, but an error occurred while processing your request.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={reset} className="btn-primary">
            Try again
          </button>

          <Link href="/" className="btn-outline text-center">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
