import Image from "next/image";
import styles from "./MediaCard.module.css";

export default function MediaCard({ item, onClick }) {
  if (item.type === "video") {
    return (
      <article className={styles.card}>
        <video
          className={styles.video}
          src={item.src}
          poster={item.poster}
          controls
          preload="metadata"
          aria-label={item.alt}
        >
          <track kind="captions" />
        </video>
      </article>
    );
  }

  return (
    <article
      className={`${styles.card} ${onClick ? styles.clickable : ""}`}
      onClick={onClick ? () => onClick({ src: item.src, alt: item.alt }) : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick({ src: item.src, alt: item.alt }); } : undefined}
      aria-label={onClick ? `View ${item.alt} full size` : undefined}
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={306}
        height={442}
        className={styles.image}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />
    </article>
  );
}
