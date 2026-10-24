/** Découpe un texte en segments normaux et marqueurs « [À COMPLÉTER : …] » / « [TO COMPLETE: …] ». */
export function splitTodo(text: string): { text: string; todo: boolean }[] {
  return text
    .split(/(\[(?:À COMPLÉTER|TO COMPLETE)\s?:[^\]]*\])/)
    .filter(Boolean)
    .map((part) => ({ text: part, todo: /^\[(?:À COMPLÉTER|TO COMPLETE)/.test(part) }));
}
