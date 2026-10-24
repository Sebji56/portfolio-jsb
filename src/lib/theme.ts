export type Theme = 'dark' | 'light';
export const THEME_KEY = 'theme';

/** Thème sombre par défaut ; seul un choix explicite du visiteur le change. */
export const resolveTheme = (stored: string | null): Theme => (stored === 'light' ? 'light' : 'dark');
