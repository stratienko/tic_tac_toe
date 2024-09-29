export const pickRandomFrom = <T>(array: T[]) => {
  const index = Math.floor(Math.random() * array.length);

  return array.at(index) as T;
};
