import type { ImageMetadata } from 'astro';
import type { PhotoId } from './photos.ts';

// Résolution Vite des photos par identifiant (module réservé au build, non testable sous Node)
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });

export function photo(id: PhotoId): ImageMetadata {
  const mod = files[`../assets/photos/${id}.jpg`];
  if (!mod) throw new Error(`Photo introuvable : ${id}`);
  return mod.default;
}
