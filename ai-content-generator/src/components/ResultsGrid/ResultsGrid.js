import MediaCard from "@/components/MediaCard/MediaCard";
import PromptCard from "@/components/PromptCard/PromptCard";
import styles from "./ResultsGrid.module.css";

const IMAGE_COLUMNS = [2, 3, 4, 5];

function DesktopCell({ column, row, className = "", children }) {
  return (
    <div
      className={`${styles.desktopCell} ${className}`}
      style={{ "--col": column, "--row": row }}
    >
      {children}
    </div>
  );
}

function LoadingSkeleton({ count }) {
  const topCount = Math.min(4, count);
  const bottomCount = Math.max(0, count - 4);

  return (
    <>
      <div className={styles.mobileLayout} aria-hidden="true">
        <div className={styles.skeletonPrompt} />
        <div className={styles.mobileImageGrid}>
          {Array.from({ length: count }, (_, index) => (
            <div key={index} className={styles.skeletonCard} />
          ))}
        </div>
      </div>

      <div className={styles.desktopGrid} aria-hidden="true">
        {Array.from({ length: topCount }, (_, index) => (
          <DesktopCell key={`sk-top-${index}`} column={IMAGE_COLUMNS[index]} row={1}>
            <div className={styles.skeletonCard} />
          </DesktopCell>
        ))}

        <DesktopCell column={1} row={2} className={styles.promptCell}>
          <div className={styles.skeletonPrompt} />
        </DesktopCell>

        {Array.from({ length: bottomCount }, (_, index) => (
          <DesktopCell key={`sk-bottom-${index}`} column={IMAGE_COLUMNS[index]} row={2}>
            <div className={styles.skeletonCard} />
          </DesktopCell>
        ))}
      </div>
    </>
  );
}

export default function ResultsGrid({
  prompt,
  items,
  isGenerating,
  expectedCount,
  onImageClick,
}) {
  const topRow = items.slice(0, 4);
  const bottomRow = items.slice(4, 8);

  return (
    <section className={styles.section} aria-label="Generated results">
      <div className={styles.content} aria-busy={isGenerating}>
        <div className={styles.mobileLayout}>
          <PromptCard prompt={prompt} />
          <div className={styles.mobileImageGrid}>
            {items.map((item) => (
              <MediaCard key={item.id} item={item} onClick={onImageClick} />
            ))}
          </div>
        </div>

        <div className={styles.desktopGrid}>
          {topRow.map((item, index) => (
            <DesktopCell key={item.id} column={IMAGE_COLUMNS[index]} row={1}>
              <MediaCard item={item} onClick={onImageClick} />
            </DesktopCell>
          ))}

          <DesktopCell column={1} row={2} className={styles.promptCell}>
            <PromptCard prompt={prompt} wide />
          </DesktopCell>

          {bottomRow.map((item, index) => (
            <DesktopCell key={item.id} column={IMAGE_COLUMNS[index]} row={2}>
              <MediaCard item={item} onClick={onImageClick} />
            </DesktopCell>
          ))}
        </div>
      </div>

      {isGenerating && (
        <div className={styles.skeletonOverlay} aria-live="polite" aria-label="Generating content">
          <LoadingSkeleton count={expectedCount} />
        </div>
      )}
    </section>
  );
}
