export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Inline script for <head>: applies the saved theme before first paint, so there
 * is no flash of the wrong theme. The design is light-first (matches Stitch), so
 * light is the default; dark mode only applies after the visitor picks it.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}})()`;
