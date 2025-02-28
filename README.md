# PdfTool - PDF Summarization App

PdfTool is a web application built with Next.js that allows users to upload PDF files and generate summaries of their content.

## Features

- **PDF Upload**: Drag and drop or click to select PDF files
- **PDF Analysis**: Automatic extraction of text from PDF documents
- **Summarization**: Generate concise summaries of PDF content
- **Key Points Extraction**: Identify and highlight important information
- **Modern UI**: Dark theme with responsive design for all devices

## Tech Stack

- **Frontend**: Next.js 15.2, React 19, Tailwind CSS
- **PDF Processing**: pdf-parse
- **Styling**: Tailwind CSS with custom dark theme
- **TypeScript**: For type safety and better developer experience

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pdftool.git
cd pdftool
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Copy the environment variables file:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/
├── app/               # Next.js app directory
│   ├── api/           # API routes
│   ├── dashboard/     # Dashboard page
│   └── page.tsx       # Home page
├── components/        # Reusable UI components
├── services/          # PDF processing and business logic
├── public/            # Static assets
└── uploads/           # Temporary storage for uploaded files (gitignored)
```

## Deployment

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
