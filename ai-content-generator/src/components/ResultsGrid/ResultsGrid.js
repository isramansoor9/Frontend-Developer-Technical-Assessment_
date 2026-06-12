import MediaCard from "@/components/MediaCard/MediaCard";
import PromptCard from "@/components/PromptCard/PromptCard";
import styles from "./ResultsGrid.module.css";

const ROW_ONE_COLUMNS = [2, 3, 4, 5];
const ROW_TWO_COLUMNS = [2, 3, 4, 5];

function DesktopCell({ column, row, children }) {
  return (
    <div
      className={styles.desktopCell}
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
        <div className={styles.mobileImageGrid}>
          {Array.from({ length: count }, (_, index) => (
            <div key={index} className={styles.skeletonCard} />
          ))}
        </div>
        <div className={styles.skeletonPrompt} />
      </div>

      <div className={styles.desktopGrid} aria-hidden="true">
        {Array.from({ length: topCount }, (_, index) => (
          <DesktopCell key={`sk-top-${index}`} column={ROW_ONE_COLUMNS[index]} row={1}>
            <div className={styles.skeletonCard} />
          </DesktopCell>
        ))}

        <DesktopCell column={1} row={2}>
          <div className={styles.skeletonPrompt} />
        </DesktopCell>

        {Array.from({ length: bottomCount }, (_, index) => (
          <DesktopCell key={`sk-bottom-${index}`} column={ROW_TWO_COLUMNS[index]} row={2}>
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
}) {
  const topRow = items.slice(0, 4);
  const bottomRow = items.slice(4, 8);

  return (
    <section className={styles.section} aria-label="Generated results" aria-live="polite">
      {isGenerating ? (
        <LoadingSkeleton count={expectedCount} />
      ) : (
        <>
          <div className={styles.mobileLayout}>
            <div className={styles.mobileImageGrid}>
              {items.map((item) => (
                <MediaCard key={item.id} item={item} />
              ))}
            </div>
            <PromptCard prompt={prompt} />
          </div>

          <div className={styles.desktopGrid}>
            {topRow.map((item, index) => (
              <DesktopCell key={item.id} column={ROW_ONE_COLUMNS[index]} row={1}>
                <MediaCard item={item} />
              </DesktopCell>
            ))}

            <DesktopCell column={1} row={2}>
              <PromptCard prompt={prompt} />
            </DesktopCell>

            {bottomRow.map((item, index) => (
              <DesktopCell key={item.id} column={ROW_TWO_COLUMNS[index]} row={2}>
                <MediaCard item={item} />
              </DesktopCell>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
