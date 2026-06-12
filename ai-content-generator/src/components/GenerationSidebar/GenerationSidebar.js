"use client";

import { useState } from "react";
import AccordionSection from "@/components/AccordionSection/AccordionSection";
import accordionStyles from "@/components/AccordionSection/AccordionSection.module.css";
import Dropdown from "@/components/Dropdown/Dropdown";
import { SparkleIcon } from "@/components/icons/Icons";
import {
  ADVANCED_OPTIONS,
  ASPECT_RATIO_OPTIONS,
  IMAGE_COUNT_OPTIONS,
  MODEL_OPTIONS,
  STYLE_OPTIONS,
} from "@/lib/constants";
import styles from "./GenerationSidebar.module.css";

export default function GenerationSidebar({
  contentType,
  onContentTypeChange,
  prompt,
  onPromptChange,
  imageCount,
  onImageCountChange,
  aspectRatio,
  onAspectRatioChange,
  model,
  onModelChange,
  onGenerate,
  isGenerating,
}) {
  const [selectedStyle, setSelectedStyle] = useState(STYLE_OPTIONS[0]);
  const [steps, setSteps] = useState(ADVANCED_OPTIONS.steps[1]);
  const [guidance, setGuidance] = useState(ADVANCED_OPTIONS.guidance[1]);

  return (
    <aside className={styles.sidebar} aria-label="Generation controls">
      <div className={styles.tabs} role="tablist" aria-label="Content type">
        <button
          type="button"
          role="tab"
          aria-selected={contentType === "image"}
          className={`${styles.tab} ${contentType === "image" ? styles.tabActive : ""}`}
          onClick={() => onContentTypeChange("image")}
        >
          Image
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={contentType === "video"}
          className={`${styles.tab} ${contentType === "video" ? styles.tabActive : ""}`}
          onClick={() => onContentTypeChange("video")}
        >
          Video
        </button>
      </div>

      <label className={styles.promptLabel} htmlFor="prompt-input">
        Prompt
      </label>
      <div className={styles.promptBox}>
        <textarea
          id="prompt-input"
          className={styles.promptInput}
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          placeholder="Describe you imaginations to be converted to piece of art ...."
          rows={5}
        />

        <button
          type="button"
          className={styles.generateButton}
          onClick={onGenerate}
          disabled={isGenerating || !prompt.trim()}
        >
          <SparkleIcon className={styles.sparkleIcon} />
          {isGenerating ? "Generating..." : "Generate"}
        </button>
      </div>

      <div className={styles.quickSettings}>
        <Dropdown
          label="# Images"
          value={imageCount}
          options={IMAGE_COUNT_OPTIONS}
          formatOption={(value) => `${value}`}
          onChange={onImageCountChange}
          hideValue
        />
        <Dropdown
          label=""
          value={aspectRatio}
          options={ASPECT_RATIO_OPTIONS}
          onChange={onAspectRatioChange}
        />
        <Dropdown
          label="Model:"
          value={model}
          options={["Name", ...MODEL_OPTIONS]}
          onChange={onModelChange}
          boldValue
          mutedLabel
        />
      </div>

      <div className={styles.accordions}>
        <AccordionSection title="Advance">
          <div className={accordionStyles.fieldRow}>
            <label className={accordionStyles.fieldLabel} htmlFor="steps-select">
              Steps
            </label>
            <select
              id="steps-select"
              className={accordionStyles.fieldSelect}
              value={steps}
              onChange={(event) => setSteps(Number(event.target.value))}
            >
              {ADVANCED_OPTIONS.steps.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className={accordionStyles.fieldRow}>
            <label className={accordionStyles.fieldLabel} htmlFor="guidance-select">
              Guidance
            </label>
            <select
              id="guidance-select"
              className={accordionStyles.fieldSelect}
              value={guidance}
              onChange={(event) => setGuidance(Number(event.target.value))}
            >
              {ADVANCED_OPTIONS.guidance.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </AccordionSection>

        <AccordionSection title="Styles">
          <div className={accordionStyles.optionGrid}>
            {STYLE_OPTIONS.map((style) => (
              <button
                key={style}
                type="button"
                className={`${accordionStyles.optionButton} ${
                  selectedStyle === style ? accordionStyles.optionButtonActive : ""
                }`}
                onClick={() => setSelectedStyle(style)}
              >
                {style}
              </button>
            ))}
          </div>
        </AccordionSection>
      </div>
    </aside>
  );
}
