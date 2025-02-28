import OpenAI from "openai";

// Initialize the OpenAI client with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Summarize text content using OpenAI API
 * @param content - The text content to summarize
 * @param maxLength - Maximum length of the summary in words (approximate)
 * @returns A promise that resolves to the summarized text
 */
export async function summarizeWithOpenAI(
  content: string,
  maxLength: number = 500,
): Promise<string> {
  try {
    // Truncate content if it's extremely long to stay within token limits
    const truncatedContent =
      content.length > 15000 ? content.substring(0, 15000) + "..." : content;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant specialized in summarizing PDF documents.
          Create a detailed and well-structured summary of the provided text.
          Focus on key points, main arguments, and important findings.
          The summary should be around ${maxLength} words.
          Format your response in markdown with clear headings and bullet points where appropriate.`,
        },
        {
          role: "user",
          content: `Please summarize the following document content:\n\n${truncatedContent}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 1000,
    });

    return (
      response.choices[0]?.message?.content || "No summary could be generated."
    );
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate summary with OpenAI");
  }
}

/**
 * Extract key points from text content using OpenAI API
 * @param content - The text content to analyze
 * @param numPoints - Number of key points to extract
 * @returns A promise that resolves to an array of key points
 */
export async function extractKeyPointsWithOpenAI(
  content: string,
  numPoints: number = 5,
): Promise<string[]> {
  try {
    // Truncate content if it's extremely long
    const truncatedContent =
      content.length > 15000 ? content.substring(0, 15000) + "..." : content;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Extract exactly ${numPoints} key points from the provided text.
          Focus on the most important findings, arguments, or concepts.
          Each key point should be concise (1-2 sentences) but informative.
          Format the response as numbered points.`,
        },
        {
          role: "user",
          content: `Please extract ${numPoints} key points from the following document content:\n\n${truncatedContent}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const result = response.choices[0]?.message?.content || "";

    // Parse the numbered list from the response
    const keyPoints = result
      .split(/\d+\.\s+/) // Split by numbered list format (e.g., "1. ", "2. ")
      .filter((point) => point.trim().length > 0)
      .map((point) => point.trim());

    return keyPoints;
  } catch (error) {
    console.error("Error calling OpenAI API for key points:", error);
    throw new Error("Failed to extract key points with OpenAI");
  }
}
