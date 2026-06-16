"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  FolderIcon,
  HomeIcon,
  MagicWandIcon,
  MoonIcon,
  MoreIcon,
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

const ACTION_ITEMS = [
  {
    id: "gallery",
    label: "Gallery",
    iconSrc: "/images/gallery.png",
  },
  {
    id: "support",
    label: "Support",
    iconSrc: "/images/support.png",
  },
];

const ACTIONS_INLINE_BREAKPOINT = "(min-width: 1024px)";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function ActionButton({ item, className = "" }) {
  return (
    <button type="button" className={`${styles.actionButton} ${className}`}>
      <Image
        src={item.iconSrc}
        alt=""
        width={18}
        height={18}
        className={styles.actionIcon}
        aria-hidden="true"
      />
      <span className={styles.actionLabel}>{item.label}</span>
    </button>
  );
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const overflowTriggerRef = useRef(null);
  const overflowPanelRef = useRef(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const showActionsInline = useMediaQuery(ACTIONS_INLINE_BREAKPOINT);

  const visibleItems = showActionsInline ? ACTION_ITEMS : [];
  const overflowItems = showActionsInline ? [] : ACTION_ITEMS;

  useEffect(() => {
    if (overflowItems.length === 0) {
      setPanelOpen(false);
    }
  }, [overflowItems.length]);

  useEffect(() => {
    if (!panelOpen) return undefined;

    function handlePointerDown(event) {
      const panel = overflowPanelRef.current;
      const trigger = overflowTriggerRef.current;
      if (panel?.contains(event.target) || trigger?.contains(event.target)) {
        return;
      }
      setPanelOpen(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setPanelOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [panelOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
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
          {visibleItems.length > 0 && (
            <div className={styles.actionsPrimary}>
              {visibleItems.map((item) => (
                <ActionButton key={item.id} item={item} />
              ))}
            </div>
          )}

          {overflowItems.length > 0 && (
            <div className={styles.overflowMenu}>
              <button
                type="button"
                ref={overflowTriggerRef}
                className={styles.overflowButton}
                aria-label="More actions"
                aria-expanded={panelOpen}
                aria-haspopup="menu"
                onClick={() => setPanelOpen((open) => !open)}
              >
                <MoreIcon className={styles.overflowIcon} />
              </button>

              {panelOpen && (
                <div
                  ref={overflowPanelRef}
                  className={styles.overflowPanel}
                  role="menu"
                  aria-label="Additional actions"
                >
                  {overflowItems.map((item) => (
                    <ActionButton
                      key={item.id}
                      item={item}
                      className={styles.overflowPanelButton}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className={styles.actionsPersistent}>
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
      </div>
    </header>
  );
}
