export interface City { name: { fr: string; en: string }; lat: number; lon: number; label: 'always' | 'desktop' | 'none' }

/** Villes des salons et du démarchage (spec, section 6.1). */
export const cities: City[] = [
  { name: { fr: 'Montréal', en: 'Montréal' }, lat: 45.5, lon: -73.6, label: 'always' },
  { name: { fr: 'Québec', en: 'Quebec City' }, lat: 46.8, lon: -71.2, label: 'none' },
  { name: { fr: 'Toronto', en: 'Toronto' }, lat: 43.7, lon: -79.4, label: 'desktop' },
  { name: { fr: 'London (Ont.)', en: 'London (Ont.)' }, lat: 43, lon: -81.2, label: 'none' },
  { name: { fr: 'Vancouver', en: 'Vancouver' }, lat: 49.3, lon: -123.1, label: 'desktop' },
  { name: { fr: 'Austin', en: 'Austin' }, lat: 30.3, lon: -97.7, label: 'always' },
  { name: { fr: 'Atlanta', en: 'Atlanta' }, lat: 33.7, lon: -84.4, label: 'desktop' },
  { name: { fr: 'Denver', en: 'Denver' }, lat: 39.7, lon: -105, label: 'desktop' },
  { name: { fr: 'Singapour', en: 'Singapore' }, lat: 1.35, lon: 103.8, label: 'always' },
  { name: { fr: 'Séoul', en: 'Seoul' }, lat: 37.6, lon: 127, label: 'always' },
];
