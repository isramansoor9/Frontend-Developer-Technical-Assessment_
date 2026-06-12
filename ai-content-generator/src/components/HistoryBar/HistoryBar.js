"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { HISTORY_ITEMS } from "@/lib/constants";
import styles from "./HistoryBar.module.css";

export default function HistoryBar() {
  const scrollRef = useRef(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const endDrag = useCallback(() => {
    dragState.current.active = false;
    scrollRef.current?.classList.remove(styles.scrollDragging);
  }, []);

  const handleMouseMove = useCallback((event) => {
    const scrollArea = scrollRef.current;
    if (!scrollArea || !dragState.current.active) return;

    event.preventDefault();
    const walk = event.pageX - dragState.current.startX;
    scrollArea.scrollLeft = dragState.current.scrollLeft - walk;
  }, []);

  const handleMouseDown = useCallback((event) => {
    const scrollArea = scrollRef.current;
    if (!scrollArea || event.button !== 0) return;

    dragState.current = {
      active: true,
      startX: event.pageX,
      scrollLeft: scrollArea.scrollLeft,
    };
    scrollArea.classList.add(styles.scrollDragging);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", endDrag);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", endDrag);
    };
  }, [endDrag, handleMouseMove]);

  return (
    <section className={styles.section} aria-label="Generation history">
      <div className={styles.inner}>
        <div className={styles.labelBox}>
          <h2 className={styles.title}>History</h2>
          <button type="button" className={styles.viewAll}>
            View All
          </button>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.scrollWrap}>
          <div
            ref={scrollRef}
            className={styles.scrollArea}
            onMouseDown={handleMouseDown}
          >
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
                      draggable={false}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.scrollFade} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
