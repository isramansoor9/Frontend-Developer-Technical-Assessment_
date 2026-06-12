"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import {
  FolderIcon,
  HomeIcon,
  MagicWandIcon,
  MoonIcon,
  NavImageIcon,
  SunIcon,
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
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

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
            <Image
              src="/images/gallery.png"
              alt=""
              width={18}
              height={18}
              className={styles.actionIcon}
              aria-hidden="true"
            />
            <span className={styles.actionLabel}>Gallery</span>
          </button>

          <button type="button" className={styles.actionButton}>
            <Image
              src="/images/support.png"
              alt=""
              width={18}
              height={18}
              className={styles.actionIcon}
              aria-hidden="true"
            />
            <span className={styles.actionLabel}>Support</span>
          </button>

          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
          >
            {isDark ? (
              <SunIcon className={styles.themeIcon} />
            ) : (
              <MoonIcon className={styles.themeIcon} />
            )}
          </button>

          <div className={styles.avatar}>
            <Image
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop"
              alt="User profile"
              width={48}
              height={48}
              className={styles.avatarImage}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
