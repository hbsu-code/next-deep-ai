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
