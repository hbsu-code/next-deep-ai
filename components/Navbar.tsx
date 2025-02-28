"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();

  return (
    <nav className="w-full py-4 px-6 bg-dark-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-white flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-purple-500"
          >
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
          </svg>
          PdfTool
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`px-3 py-2 rounded-md transition-colors ${
              pathname === "/"
                ? "text-purple-400 bg-purple-900 bg-opacity-30"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            Home
          </Link>

          {isSignedIn && (
            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname === "/dashboard"
                  ? "text-purple-400 bg-purple-900 bg-opacity-30"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Dashboard
            </Link>
          )}

          <div className="ml-4">
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>
            ) : (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10",
                    userButtonTrigger: "focus:shadow-none focus:outline-none",
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
