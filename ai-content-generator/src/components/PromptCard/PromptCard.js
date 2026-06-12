import styles from "./PromptCard.module.css";

export default function PromptCard({ prompt }) {
  return (
    <article className={styles.card} aria-label="Generation prompt">
      <p className={styles.text}>{prompt}</p>
      <span className={styles.modelBadge}>Model</span>
    </article>
  );
}
