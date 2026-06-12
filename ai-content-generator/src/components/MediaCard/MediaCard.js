import Image from "next/image";
import styles from "./MediaCard.module.css";

export default function MediaCard({ item }) {
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
    <article className={styles.card}>
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
