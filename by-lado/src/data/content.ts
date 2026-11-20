/** Results, reviews and quiz logic. Results/reviews: ONLY real items. Empty arrays render labelled placeholders. */
export type MethodKey = 'tape' | 'keratine' | 'weft' | 'microring' | 'clipin';

export interface Result {
  id: string; method: MethodKey; length: number; grams?: number; rows?: number;
  colour: 'blond' | 'bruin' | 'donker' | 'rood'; goal: 'lengte' | 'volume' | 'beide'; hairType: 'fijn' | 'normaal' | 'dik';
  note: string;           // short note by Quinty
  before?: string; after?: string; // image base paths (see Img.astro)
}
export const RESULTS: Result[] = [];

/** Placeholder grid used while RESULTS is empty — clearly labelled, never presented as real. */
export const RESULT_SLOTS: Omit<Result, 'id' | 'note'>[] = [
  { method: 'tape', length: 50, colour: 'blond', goal: 'beide', hairType: 'fijn' },
  { method: 'keratine', length: 60, colour: 'bruin', goal: 'lengte', hairType: 'normaal' },
  { method: 'weft', length: 50, colour: 'donker', goal: 'volume', hairType: 'dik' },
  { method: 'tape', length: 40, colour: 'bruin', goal: 'volume', hairType: 'fijn' },
  { method: 'clipin', length: 50, colour: 'blond', goal: 'beide', hairType: 'normaal' },
  { method: 'microring', length: 40, colour: 'rood', goal: 'lengte', hairType: 'normaal' },
];

export interface Review { id: string; text: string; name: string; date: string; method?: MethodKey; photo?: string; url?: string; featured?: 'fijn-haar' | 'correctie' }
export const REVIEWS: Review[] = []; // paste ONLY real reviews about extensions

export const METHOD_LABEL: Record<MethodKey, string> = { tape: 'Tape', keratine: 'Keratine', weft: 'Weft', microring: 'Microring', clipin: 'Clip-in' };

/**
 * Extension-check advice. PROVISIONAL logic (common professional guidance) until Quinty confirms her own table.
 * The result screen always says “Quinty bevestigt dit in je consult”.
 */
export interface QuizAnswers { goal?: string; hair?: string; current?: string; length?: string; life?: string; before?: string }
export function advise(a: QuizAnswers): MethodKey[] {
  if (a.goal === 'tijdelijk') return ['clipin'];
  const out: MethodKey[] = [];
  if (a.hair === 'fijn') out.push('tape', 'keratine');
  else if (a.hair === 'dik') out.push(a.goal === 'volume' ? 'weft' : 'keratine', 'microring');
  else out.push(a.life === 'sport' ? 'keratine' : 'tape', a.goal === 'volume' ? 'weft' : 'keratine');
  if (a.life === 'weinig-tijd' && !out.includes('tape')) out.unshift('tape');
  return [...new Set(out)].slice(0, 2) as MethodKey[];
}
