import styles from "./PromptCard.module.css";

export default function PromptCard({ prompt, className = "", wide = false }) {
  return (
    <article
      className={`${styles.card} ${wide ? styles.promptCardWide : ""} ${className}`.trim()}
      aria-label="Generation prompt"
    >
      <p className={styles.text}>{prompt}</p>
      <span className={styles.modelBadge}>Model</span>
    </article>
  );
}
