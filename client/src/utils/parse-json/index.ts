export function parseJson(input: string) {
  try {
    return JSON.parse(input);
  } catch (error) {
    if (typeof input === 'string') return input;

    throw error;
  }
}
