import { SignIn } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-4">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-purple-600 hover:bg-purple-700 text-white",
                card: "bg-dark-800 border border-gray-700",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
                formFieldLabel: "text-gray-300",
                formFieldInput: "bg-dark-700 border-gray-600 text-white",
                footerActionLink: "text-purple-400 hover:text-purple-300",
                socialButtonsBlockButton:
                  "border-gray-600 text-white hover:bg-dark-700",
                dividerLine: "bg-gray-700",
                dividerText: "text-gray-500",
              },
            }}
          />
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
