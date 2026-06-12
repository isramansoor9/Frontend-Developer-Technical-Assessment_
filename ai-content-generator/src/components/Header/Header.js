"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FolderIcon,
  GalleryFrameIcon,
  HomeIcon,
  MagicWandIcon,
  MoonIcon,
  NavImageIcon,
  SupportIcon,
  VideoIcon,
} from "@/components/icons/Icons";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: HomeIcon, active: true },
  { id: "gallery", label: "Gallery", icon: NavImageIcon },
  { id: "video", label: "Video", icon: VideoIcon },
  { id: "edit", label: "Edit", icon: MagicWandIcon },
  { id: "folders", label: "Folders", icon: FolderIcon },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="F logo">
          <Image
            src="/logo.png"
            alt="F logo"
            width={32}
            height={32}
            className={styles.logoImage}
            priority
          />
        </Link>

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
            <GalleryFrameIcon className={styles.actionIcon} />
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
              src="https://images.unsplash.com/photo-1583864691024-d0c0c8efd27d?w=80&h=80&fit=crop"
              alt="User profile"
              width={32}
              height={32}
              className={styles.avatarImage}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
