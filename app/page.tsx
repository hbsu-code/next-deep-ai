import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"
            aria-hidden="true"
          ></div>

          <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Simplify Your{" "}
              <span className="text-purple-400">Document Analysis</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mb-10">
              Upload your PDF documents and get instant, AI-powered summaries.
              Save time and extract the key insights without reading every page.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="btn-primary">
                Upload PDF Now
              </Link>

              <a href="#features" className="btn-outline">
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-20 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-dark-700 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-purple-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Your PDF</h3>
                <p className="text-gray-400">
                  Simply drag and drop your PDF file or browse to select one.
                </p>
              </div>

              <div className="bg-dark-700 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-purple-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
                <p className="text-gray-400">
                  Our AI engine analyzes the document content, identifying key
                  points and themes.
                </p>
              </div>

              <div className="bg-dark-700 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-purple-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Your Summary</h3>
                <p className="text-gray-400">
                  Receive a concise summary highlighting the most important
                  information from your document.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/dashboard" className="btn-primary">
                Try It Now
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} PdfTool. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
