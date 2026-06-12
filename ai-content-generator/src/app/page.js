"use client";

import { useCallback, useEffect, useState } from "react";
import GenerationSidebar from "@/components/GenerationSidebar/GenerationSidebar";
import Header from "@/components/Header/Header";
import HistoryBar from "@/components/HistoryBar/HistoryBar";
import ResultsGrid from "@/components/ResultsGrid/ResultsGrid";
import { DEFAULT_PROMPT, MODEL_OPTIONS } from "@/lib/constants";
import styles from "./page.module.css";

const INITIAL_IMAGES = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=306&h=442&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=306&h=442&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=306&h=442&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=306&h=442&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=306&h=442&fit=crop",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=306&h=442&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=306&h=442&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=306&h=442&fit=crop",
];

function buildInitialItems() {
  return INITIAL_IMAGES.map((src, index) => ({
    id: `initial-${index}`,
    type: "image",
    src,
    alt: `Sample portrait ${index + 1}`,
  }));
}

export default function HomePage() {
  const [contentType, setContentType] = useState("image");
  const [prompt, setPrompt] = useState("");
  const [resultsPrompt, setResultsPrompt] = useState(DEFAULT_PROMPT);
  const [imageCount, setImageCount] = useState(4);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [model, setModel] = useState("Name");
  const [items, setItems] = useState(buildInitialItems);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          type: contentType,
          count: imageCount,
          aspectRatio,
          model,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Generation failed.");
      }

      setItems(data.items);
      setResultsPrompt(prompt.trim());
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, isGenerating, contentType, imageCount, aspectRatio, model]);

  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        handleGenerate();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGenerate]);

  return (
    <div className={styles.page}>
      <Header />
      <HistoryBar />

      <main className={styles.main}>
        <div className={styles.workspace}>
          <GenerationSidebar
            contentType={contentType}
            onContentTypeChange={setContentType}
            prompt={prompt}
            onPromptChange={setPrompt}
            imageCount={imageCount}
            onImageCountChange={setImageCount}
            aspectRatio={aspectRatio}
            onAspectRatioChange={setAspectRatio}
            model={model}
            onModelChange={setModel}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />

          <div className={styles.resultsArea}>
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
            <ResultsGrid
              prompt={resultsPrompt}
              items={items}
              isGenerating={isGenerating}
              expectedCount={imageCount}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
