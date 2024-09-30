import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * This function merges class names in the correct order.
 * @param {ClassValue[]} inputs - The class names to merge.
 * @returns {string} The merged class names.
 * @see https://dev.to/sheraz4194/mastering-tailwind-css-overcome-styling-conflicts-with-tailwind-merge-and-clsx-1dol#:~:text=The%20finest%20solution%20to%20this,which%20aligns%20with%20our%20expectations.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
