import Image from "next/image";
import { HISTORY_ITEMS } from "@/lib/constants";
import styles from "./HistoryBar.module.css";

export default function HistoryBar() {
  return (
    <section className={styles.section} aria-label="Generation history">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>History</h2>
          <button type="button" className={styles.viewAll}>
            View All
          </button>
        </div>

        <div className={`${styles.scrollArea} scrollbar-thin`}>
          <ul className={styles.list}>
            {HISTORY_ITEMS.map((item) => (
              <li key={item.id}>
                <button type="button" className={styles.thumbButton} aria-label={item.alt}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={72}
                    height={72}
                    className={styles.thumb}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
