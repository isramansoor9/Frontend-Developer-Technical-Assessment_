"use client";

import Image from "next/image";
import {
  EditIcon,
  FolderIcon,
  GalleryIcon,
  HomeIcon,
  LogoIcon,
  MoonIcon,
  SupportIcon,
  VideoIcon,
} from "@/components/icons/Icons";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: HomeIcon, active: true },
  { id: "gallery", label: "Gallery", icon: GalleryIcon },
  { id: "video", label: "Video", icon: VideoIcon },
  { id: "edit", label: "Edit", icon: EditIcon },
  { id: "folders", label: "Folders", icon: FolderIcon },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo} aria-label="F logo">
          <LogoIcon className={styles.logoIcon} />
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <div className={styles.progressTrack} aria-hidden="true">
            <div className={styles.progressFill} />
          </div>

          <ul className={styles.navList}>
            {NAV_ITEMS.map(({ id, label, icon: Icon, active }) => (
              <li key={id}>
                <button
                  type="button"
                  className={`${styles.navButton} ${active ? styles.navButtonActive : ""}`}
                  aria-label={label}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={styles.navIcon} />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.actionButton}>
            <GalleryIcon className={styles.actionIcon} />
            <span className={styles.actionLabel}>Gallery</span>
          </button>

          <button type="button" className={styles.actionButton}>
            <SupportIcon className={styles.actionIcon} />
            <span className={styles.actionLabel}>Support</span>
          </button>

          <button type="button" className={styles.iconButton} aria-label="Toggle dark mode">
            <MoonIcon className={styles.moonIcon} />
          </button>

          <div className={styles.avatar}>
            <Image
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
              alt="User profile"
              width={40}
              height={40}
              className={styles.avatarImage}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
